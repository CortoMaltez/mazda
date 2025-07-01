import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GoogleWorkspaceService } from '@/services/googleWorkspaceService';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { companyName, memberName, memberAddress, formationDate, state } = await request.json();

    // Validation des données requises
    if (!companyName || !memberName || !memberAddress || !formationDate || !state) {
      return NextResponse.json(
        { error: 'Toutes les informations sont requises' },
        { status: 400 }
      );
    }

    // Récupérer la société de l'utilisateur
    const company = await prisma.company.findFirst({
      where: { userId: session.user.id }
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Aucune société trouvée' },
        { status: 404 }
      );
    }

    // Vérifier que l'utilisateur a connecté son compte Google
    const googleAccount = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: 'google'
      }
    });

    if (!googleAccount) {
      return NextResponse.json(
        { error: 'Compte Google non connecté' },
        { status: 400 }
      );
    }

    // Contenu du modèle Operating Agreement
    const templateContent = `
OPERATING AGREEMENT

This Operating Agreement (the "Agreement") is made and entered into as of ${formationDate}, by and among the undersigned members of ${companyName}, a limited liability company organized under the laws of the State of ${state} (the "Company").

ARTICLE I
ORGANIZATION

1.1 Formation. The Company was formed on ${formationDate} pursuant to the laws of the State of ${state}.

1.2 Name. The name of the Company is ${companyName}.

1.3 Principal Place of Business. The principal place of business of the Company shall be located at ${memberAddress}.

ARTICLE II
MEMBERS

2.1 Initial Member. The initial member of the Company is:
   Name: ${memberName}
   Address: ${memberAddress}

2.2 Management. The Company shall be managed by its member(s).

ARTICLE III
CAPITAL CONTRIBUTIONS

3.1 Initial Capital Contribution. The initial capital contribution of the member shall be as set forth in the Company's books and records.

ARTICLE IV
DISTRIBUTIONS

4.1 Distributions. Distributions shall be made to the member(s) at such times and in such amounts as determined by the member(s).

ARTICLE V
DISSOLUTION

5.1 Events of Dissolution. The Company shall dissolve upon the occurrence of any event specified in the applicable state law.

IN WITNESS WHEREOF, the undersigned has executed this Operating Agreement as of the date first above written.

${memberName}
Member

Date: ${formationDate}
    `;

    // Créer le document dans le dossier Juridique du Corporate Hub
    const document = await GoogleWorkspaceService.createDocument(
      session.user.id,
      `Operating Agreement - ${companyName}`,
      templateContent,
      company.googleDriveHubId // ID du dossier principal
    );

    // Sauvegarder la référence dans la base de données
    await prisma.clientDocument.create({
      data: {
        userId: session.user.id,
        fileName: `Operating Agreement - ${companyName}`,
        storageUrl: document.webViewLink
      }
    });

    // Mettre à jour le statut de la société
    await prisma.company.update({
      where: { id: company.id },
      data: { operatingAgreement: true }
    });

    return NextResponse.json({
      success: true,
      message: 'Operating Agreement généré avec succès',
      document: {
        id: document.id,
        name: document.name,
        webViewLink: document.webViewLink
      }
    });

  } catch (error) {
    console.error('Erreur lors de la génération du document:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 