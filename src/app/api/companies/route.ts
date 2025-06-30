import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Récupérer toutes les entreprises de l'utilisateur
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const companies = await prisma.company.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        documents: true,
        payments: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle entreprise
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { name, state, businessType, formationDate } = await request.json();

    if (!name || !state || !businessType) {
      return NextResponse.json(
        { error: "Nom, état et type d'entreprise sont requis" },
        { status: 400 }
      );
    }

    const company = await prisma.company.create({
      data: {
        name,
        state,
        businessType,
        formationDate: formationDate ? new Date(formationDate) : null,
        userId: session.user.id,
      },
      include: {
        documents: true,
        payments: true,
      }
    });

    return NextResponse.json(
      { 
        message: "Entreprise créée avec succès",
        company 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'entreprise:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 