import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Récupérer toutes les permissions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const permissions = await prisma.consultantPermission.findMany({
      include: {
        consultant: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(permissions);
  } catch (error) {
    console.error("Erreur lors de la récupération des permissions:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// Créer une nouvelle permission
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { consultantId, permission, canRead, canWrite, canDelete } = await request.json();

    // Validation des données
    if (!consultantId || !permission) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur est bien un consultant
    const consultant = await prisma.user.findUnique({
      where: { id: consultantId },
    });

    if (!consultant || consultant.role !== "CONSULTANT") {
      return NextResponse.json(
        { error: "L'utilisateur doit être un consultant" },
        { status: 400 }
      );
    }

    // Vérifier si la permission existe déjà
    const existingPermission = await prisma.consultantPermission.findFirst({
      where: {
        consultantId,
        permission,
      },
    });

    if (existingPermission) {
      // Mettre à jour la permission existante
      const updatedPermission = await prisma.consultantPermission.update({
        where: { id: existingPermission.id },
        data: {
          canRead,
          canWrite,
          canDelete,
        },
        include: {
          consultant: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return NextResponse.json(updatedPermission);
    } else {
      // Créer une nouvelle permission
      const newPermission = await prisma.consultantPermission.create({
        data: {
          consultantId,
          grantedBy: session.user.id,
          permission,
          canRead,
          canWrite,
          canDelete,
        },
        include: {
          consultant: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return NextResponse.json(newPermission);
    }
  } catch (error) {
    console.error("Erreur lors de la création de la permission:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 