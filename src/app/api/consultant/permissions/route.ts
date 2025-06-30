import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "CONSULTANT") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const permissions = await prisma.consultantPermission.findMany({
      where: {
        consultantId: session.user.id,
      },
      select: {
        permission: true,
        canRead: true,
        canWrite: true,
        canDelete: true,
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