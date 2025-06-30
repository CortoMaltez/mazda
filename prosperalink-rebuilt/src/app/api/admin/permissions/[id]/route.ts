import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { id } = params;

    // Vérifier si la permission existe
    const permission = await prisma.consultantPermission.findUnique({
      where: { id },
    });

    if (!permission) {
      return NextResponse.json(
        { error: "Permission non trouvée" },
        { status: 404 }
      );
    }

    // Supprimer la permission
    await prisma.consultantPermission.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Permission supprimée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de la permission:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 