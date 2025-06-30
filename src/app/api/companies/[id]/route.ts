import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Récupérer une entreprise spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const company = await prisma.company.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        documents: true,
        payments: true,
      }
    });

    if (!company) {
      return NextResponse.json(
        { error: "Entreprise non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'entreprise:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une entreprise
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { name, state, businessType, formationDate, status } = await request.json();

    const company = await prisma.company.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!company) {
      return NextResponse.json(
        { error: "Entreprise non trouvée" },
        { status: 404 }
      );
    }

    const updatedCompany = await prisma.company.update({
      where: {
        id: params.id
      },
      data: {
        name,
        state,
        businessType,
        formationDate: formationDate ? new Date(formationDate) : null,
        status,
      },
      include: {
        documents: true,
        payments: true,
      }
    });

    return NextResponse.json(
      { 
        message: "Entreprise mise à jour avec succès",
        company: updatedCompany 
      }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'entreprise:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une entreprise
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const company = await prisma.company.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!company) {
      return NextResponse.json(
        { error: "Entreprise non trouvée" },
        { status: 404 }
      );
    }

    await prisma.company.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json(
      { message: "Entreprise supprimée avec succès" }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'entreprise:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 