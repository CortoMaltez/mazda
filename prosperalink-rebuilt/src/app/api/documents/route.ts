import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Récupérer tous les documents de l'utilisateur
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const documents = await prisma.document.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau document
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { name, type, fileUrl, fileSize, companyId } = await request.json();

    if (!name || !type || !fileUrl || !fileSize) {
      return NextResponse.json(
        { error: "Nom, type, URL et taille du fichier sont requis" },
        { status: 400 }
      );
    }

    const document = await prisma.document.create({
      data: {
        name,
        type,
        fileUrl,
        fileSize: parseInt(fileSize),
        userId: session.user.id,
        companyId: companyId || null,
      },
      include: {
        company: true,
      }
    });

    return NextResponse.json(
      { 
        message: "Document créé avec succès",
        document 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du document:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 