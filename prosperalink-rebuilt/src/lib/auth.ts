import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Fonctions de vérification des permissions
export const hasPermission = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    VISITOR: 0,
    CLIENT: 1,
    CONSULTANT: 2,
    ADMIN: 3
  };

  return roleHierarchy[userRole as keyof typeof roleHierarchy] >= roleHierarchy[requiredRole as keyof typeof roleHierarchy];
};

export const requireAuth = (role: string = "CLIENT") => {
  return (session: any) => {
    if (!session) return false;
    return hasPermission(session.user.role, role);
  };
};

// Vérification des permissions granulaires pour les consultants
export const hasConsultantPermission = async (userId: string, permission: string, action: 'read' | 'write' | 'delete' = 'read'): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { consultantPermissions: true } as any,
  });

  if (!user || user.role !== UserRole.CONSULTANT) {
    return false;
  }

  const permissions = (user as any).consultantPermissions || [];
  const permissionRecord = permissions.find((p: any) => p.permission === permission);
  if (!permissionRecord) {
    return false;
  }

  switch (action) {
    case 'read':
      return permissionRecord.canRead;
    case 'write':
      return permissionRecord.canWrite;
    case 'delete':
      return permissionRecord.canDelete;
    default:
      return false;
  }
};

// Fonctions de vérification des rôles
export const isVisitor = (session: any) => !session;
export const isClient = (session: any) => session && hasPermission(session.user.role, "CLIENT");
export const isConsultant = (session: any) => session && hasPermission(session.user.role, "CONSULTANT");
export const isAdmin = (session: any) => session && hasPermission(session.user.role, "ADMIN");
export const isAI = (session: any) => session && (hasPermission(session.user.role, "ADMIN") || hasPermission(session.user.role, "CONSULTANT"));

// Fonction pour vérifier l'accès avec permissions granulaires
export const canAccess = async (session: any, permission: string, action: 'read' | 'write' | 'delete' = 'read'): Promise<boolean> => {
  if (!session) return false;
  
  // Les admins ont accès à tout
  if (session.user.role === 'ADMIN') return true;
  
  // Les consultants ont des permissions granulaires
  if (session.user.role === 'CONSULTANT') {
    return await hasConsultantPermission(session.user.id, permission, action);
  }
  
  // Les clients ont accès basique
  if (session.user.role === 'CLIENT') {
    return ['dashboard', 'calculator'].includes(permission);
  }
  
  return false;
}; 