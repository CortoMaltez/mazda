import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GoogleWorkspaceService } from '@/services/googleWorkspaceService';
import { prisma } from '@/lib/prisma';

// Mapping des échéances par état
const COMPLIANCE_DEADLINES = {
  'Delaware': {
    annualReport: { months: 3, day: 1 }, // 1er mars
    franchiseTax: { months: 3, day: 1 }, // 1er mars
    boiReport: { months: 12, day: 31 } // 31 décembre
  },
  'Wyoming': {
    annualReport: { months: 12, day: 1 }, // 1er décembre
    franchiseTax: { months: 12, day: 1 }, // 1er décembre
    boiReport: { months: 12, day: 31 } // 31 décembre
  },
  'Nevada': {
    annualReport: { months: 8, day: 31 }, // 31 août
    franchiseTax: { months: 8, day: 31 }, // 31 août
    boiReport: { months: 12, day: 31 } // 31 décembre
  },
  'Florida': {
    annualReport: { months: 5, day: 1 }, // 1er mai
    franchiseTax: { months: 5, day: 1 }, // 1er mai
    boiReport: { months: 12, day: 31 } // 31 décembre
  },
  'Texas': {
    annualReport: { months: 5, day: 15 }, // 15 mai
    franchiseTax: { months: 5, day: 15 }, // 15 mai
    boiReport: { months: 12, day: 31 } // 31 décembre
  }
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { companyId } = await request.json();

    if (!companyId) {
      return NextResponse.json({ error: 'ID de l\'entreprise requis' }, { status: 400 });
    }

    // Vérifier que l'utilisateur a accès à cette entreprise
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId: session.user.id
      }
    });

    if (!company) {
      return NextResponse.json({ error: 'Entreprise non trouvée' }, { status: 404 });
    }

    // Vérifier si l'utilisateur a une connexion Google
    const hasGoogleAccess = await GoogleWorkspaceService.checkPermissions(session.user.id);
    
    if (!hasGoogleAccess) {
      return NextResponse.json({ 
        error: 'Connexion Google requise',
        requiresGoogleAuth: true 
      }, { status: 403 });
    }

    // Synchroniser le calendrier de compliance
    await GoogleWorkspaceService.syncComplianceCalendar(session.user.id, companyId);

    // Créer un log d'audit
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        userEmail: session.user.email || '',
        action: 'COMPLIANCE_CALENDAR_SYNCED',
        details: { 
          companyId,
          companyName: company.name,
          message: 'Calendrier de compliance synchronisé avec Google Calendar'
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Calendrier de compliance synchronisé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la synchronisation du calendrier:', error);
    
    return NextResponse.json({ 
      error: 'Erreur lors de la synchronisation du calendrier',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return NextResponse.json({ error: 'ID de l\'entreprise requis' }, { status: 400 });
    }

    // Récupérer les tâches de compliance
    const complianceTasks = await prisma.complianceTask.findMany({
      where: {
        companyId,
        userId: session.user.id
      },
      orderBy: {
        dueDate: 'asc'
      }
    });

    // Vérifier le statut de la connexion Google
    const hasGoogleAccess = await GoogleWorkspaceService.checkPermissions(session.user.id);

    return NextResponse.json({
      hasGoogleAccess,
      complianceTasks,
      totalTasks: complianceTasks.length,
      pendingTasks: complianceTasks.filter(task => task.status === 'PENDING').length,
      overdueTasks: complianceTasks.filter(task => 
        task.status !== 'COMPLETED' && 
        task.dueDate && 
        task.dueDate < new Date()
      ).length
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des tâches de compliance:', error);
    
    return NextResponse.json({ 
      error: 'Erreur lors de la récupération des tâches de compliance',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 