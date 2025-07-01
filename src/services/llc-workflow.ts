import { prisma } from '@/lib/prisma';

export interface LLCFormationData {
  companyName: string;
  businessType: string;
  state: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  businessDescription: string;
  estimatedRevenue: number;
  employees: number;
}

export interface LLCFormationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  estimatedTime: number; // en minutes
  actualTime?: number;
  error?: string;
  data?: any;
  completedAt?: Date;
}

export interface LLCFormationWorkflow {
  id: string;
  clientId: string;
  planId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  steps: LLCFormationStep[];
  totalEstimatedTime: number;
  actualTime?: number;
  startedAt: Date;
  completedAt?: Date;
  data: LLCFormationData;
  documents: string[];
  ein?: string;
  bankAccount?: string;
}

// Étapes du workflow de formation LLC
export const LLC_FORMATION_STEPS = [
  {
    id: 'data_validation',
    name: 'Validation des Données',
    description: 'Vérification et validation des informations fournies',
    estimatedTime: 5
  },
  {
    id: 'name_availability',
    name: 'Vérification Disponibilité Nom',
    description: 'Contrôle de la disponibilité du nom d\'entreprise',
    estimatedTime: 10
  },
  {
    id: 'document_generation',
    name: 'Génération Documents',
    description: 'Création des documents de formation LLC',
    estimatedTime: 15
  },
  {
    id: 'state_filing',
    name: 'Dépôt État',
    description: 'Soumission des documents auprès de l\'état',
    estimatedTime: 30
  },
  {
    id: 'ein_application',
    name: 'Demande EIN',
    description: 'Demande du numéro d\'identification employeur',
    estimatedTime: 20
  },
  {
    id: 'bank_account',
    name: 'Ouverture Compte Bancaire',
    description: 'Création du compte bancaire business',
    estimatedTime: 45
  },
  {
    id: 'compliance_setup',
    name: 'Configuration Conformité',
    description: 'Mise en place du système de conformité',
    estimatedTime: 25
  },
  {
    id: 'finalization',
    name: 'Finalisation',
    description: 'Finalisation et livraison des documents',
    estimatedTime: 10
  }
];

// Fonction pour créer un nouveau workflow de formation LLC
export async function createLLCWorkflow(
  clientId: string,
  planId: string,
  data: LLCFormationData
): Promise<LLCFormationWorkflow> {
  try {
    // Créer le workflow dans la base de données
    const workflow = await prisma.lLCFormationWorkflow.create({
      data: {
        clientId,
        planId,
        status: 'pending',
        totalEstimatedTime: LLC_FORMATION_STEPS.reduce((sum, step) => sum + step.estimatedTime, 0),
        startedAt: new Date(),
        data: JSON.stringify(data),
        documents: JSON.stringify([]),
        steps: JSON.stringify(LLC_FORMATION_STEPS.map(step => ({
          ...step,
          status: 'pending'
        })))
      }
    });

    // Démarrer le workflow automatiquement
    await startLLCWorkflow(workflow.id);

    return {
      ...workflow,
      data: JSON.parse(workflow.data),
      documents: JSON.parse(workflow.documents),
      steps: JSON.parse(workflow.steps)
    };
  } catch (error) {
    console.error('Erreur création workflow LLC:', error);
    throw error;
  }
}

// Fonction pour démarrer le workflow
export async function startLLCWorkflow(workflowId: string): Promise<void> {
  try {
    // Mettre à jour le statut
    await prisma.lLCFormationWorkflow.update({
      where: { id: workflowId },
      data: { status: 'in_progress' }
    });

    // Exécuter les étapes en parallèle quand possible
    await executeWorkflowSteps(workflowId);
  } catch (error) {
    console.error('Erreur démarrage workflow:', error);
    await updateWorkflowStatus(workflowId, 'failed');
    throw error;
  }
}

// Fonction pour exécuter les étapes du workflow
async function executeWorkflowSteps(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) {
    throw new Error('Workflow non trouvé');
  }

  // Étapes séquentielles (doivent être exécutées dans l'ordre)
  const sequentialSteps = ['data_validation', 'name_availability', 'document_generation', 'state_filing'];
  
  for (const stepId of sequentialSteps) {
    await executeStep(workflowId, stepId);
  }

  // Étapes parallèles (peuvent être exécutées simultanément)
  const parallelSteps = ['ein_application', 'bank_account', 'compliance_setup'];
  
  await Promise.all(
    parallelSteps.map(stepId => executeStep(workflowId, stepId))
  );

  // Finalisation
  await executeStep(workflowId, 'finalization');
  
  // Marquer le workflow comme terminé
  await updateWorkflowStatus(workflowId, 'completed');
}

// Fonction pour exécuter une étape spécifique
async function executeStep(workflowId: string, stepId: string): Promise<void> {
  const startTime = Date.now();
  
  try {
    // Mettre à jour le statut de l'étape
    await updateStepStatus(workflowId, stepId, 'in_progress');

    // Exécuter la logique de l'étape
    switch (stepId) {
      case 'data_validation':
        await validateData(workflowId);
        break;
      case 'name_availability':
        await checkNameAvailability(workflowId);
        break;
      case 'document_generation':
        await generateDocuments(workflowId);
        break;
      case 'state_filing':
        await fileWithState(workflowId);
        break;
      case 'ein_application':
        await applyForEIN(workflowId);
        break;
      case 'bank_account':
        await openBankAccount(workflowId);
        break;
      case 'compliance_setup':
        await setupCompliance(workflowId);
        break;
      case 'finalization':
        await finalizeFormation(workflowId);
        break;
      default:
        throw new Error(`Étape inconnue: ${stepId}`);
    }

    const actualTime = Math.round((Date.now() - startTime) / 1000 / 60); // en minutes
    
    // Marquer l'étape comme terminée
    await updateStepStatus(workflowId, stepId, 'completed', actualTime);
    
  } catch (error) {
    console.error(`Erreur étape ${stepId}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    await updateStepStatus(workflowId, stepId, 'failed', undefined, errorMessage);
    throw error;
  }
}

// Fonctions spécifiques pour chaque étape
async function validateData(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  const data = workflow.data as LLCFormationData;

  // Validation des données
  if (!data.companyName || data.companyName.length < 2) {
    throw new Error('Nom d\'entreprise invalide');
  }

  if (!data.ownerEmail || !data.ownerEmail.includes('@')) {
    throw new Error('Email invalide');
  }

  if (!data.businessAddress.street || !data.businessAddress.city) {
    throw new Error('Adresse incomplète');
  }

  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 3000));
}

async function checkNameAvailability(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  const data = workflow.data as LLCFormationData;

  // Simuler la vérification de disponibilité du nom
  const isAvailable = Math.random() > 0.1; // 90% de chance que le nom soit disponible

  if (!isAvailable) {
    throw new Error(`Le nom "${data.companyName}" n'est pas disponible`);
  }

  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 6000));
}

async function generateDocuments(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  const data = workflow.data as LLCFormationData;

  // Générer les documents LLC
  const documents = [
    `Articles of Organization - ${data.companyName}.pdf`,
    `Operating Agreement - ${data.companyName}.pdf`,
    `EIN Application - ${data.companyName}.pdf`,
    `Compliance Checklist - ${data.companyName}.pdf`
  ];

  // Mettre à jour les documents dans le workflow
  await prisma.lLCFormationWorkflow.update({
    where: { id: workflowId },
    data: { documents }
  });

  // Simuler un délai de génération
  await new Promise(resolve => setTimeout(resolve, 9000));
}

async function fileWithState(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  const data = workflow.data as LLCFormationData;

  // Simuler le dépôt auprès de l'état
  const filingNumber = `LLC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Mettre à jour le workflow avec le numéro de dépôt
  await prisma.lLCFormationWorkflow.update({
    where: { id: workflowId },
    data: {
      data: {
        ...data,
        filingNumber
      }
    }
  });

  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 18000));
}

async function applyForEIN(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  // Simuler la demande d'EIN
  const ein = `${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 9999999)}`;

  // Mettre à jour le workflow avec l'EIN
  await prisma.lLCFormationWorkflow.update({
    where: { id: workflowId },
    data: { ein }
  });

  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 12000));
}

async function openBankAccount(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  // Simuler l'ouverture de compte bancaire
  const bankAccount = `****${Math.floor(Math.random() * 9999)}`;

  // Mettre à jour le workflow avec le compte bancaire
  await prisma.lLCFormationWorkflow.update({
    where: { id: workflowId },
    data: { bankAccount }
  });

  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 27000));
}

async function setupCompliance(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  // Simuler la configuration de la conformité
  const complianceData = {
    annualReportReminder: true,
    taxFilingReminder: true,
    complianceAlerts: true,
    nextDeadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 an
  };

  // Mettre à jour le workflow avec les données de conformité
  await prisma.lLCFormationWorkflow.update({
    where: { id: workflowId },
    data: {
      data: {
        ...workflow.data,
        compliance: complianceData
      }
    }
  });

  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 15000));
}

async function finalizeFormation(workflowId: string): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  // Calculer le temps total réel
  const actualTime = Math.round((Date.now() - workflow.startedAt.getTime()) / 1000 / 60);

  // Mettre à jour le workflow avec le temps réel
  await prisma.lLCFormationWorkflow.update({
    where: { id: workflowId },
    data: {
      actualTime,
      completedAt: new Date()
    }
  });

  // Envoyer les emails de confirmation
  await sendCompletionEmails(workflow);

  // Simuler un délai de finalisation
  await new Promise(resolve => setTimeout(resolve, 6000));
}

// Fonctions utilitaires
async function updateWorkflowStatus(workflowId: string, status: string): Promise<void> {
  await prisma.lLCFormationWorkflow.update({
    where: { id: workflowId },
    data: { status }
  });
}

async function updateStepStatus(
  workflowId: string, 
  stepId: string, 
  status: string, 
  actualTime?: number,
  error?: string
): Promise<void> {
  const workflow = await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });

  if (!workflow) throw new Error('Workflow non trouvé');

  const steps = workflow.steps as any[];
  const stepIndex = steps.findIndex(step => step.id === stepId);

  if (stepIndex !== -1) {
    steps[stepIndex] = {
      ...steps[stepIndex],
      status,
      actualTime,
      error,
      completedAt: status === 'completed' ? new Date() : undefined
    };

    await prisma.lLCFormationWorkflow.update({
      where: { id: workflowId },
      data: { steps }
    });
  }
}

async function sendCompletionEmails(workflow: any): Promise<void> {
  const data = workflow.data as LLCFormationData;
  
  // Envoyer email au client
  console.log(`Email de confirmation envoyé à: ${data.ownerEmail}`);
  
  // Envoyer email à l'équipe
  console.log('Notification envoyée à l\'équipe de support');
}

// Fonction pour récupérer un workflow
export async function getLLCWorkflow(workflowId: string): Promise<LLCFormationWorkflow | null> {
  return await prisma.lLCFormationWorkflow.findUnique({
    where: { id: workflowId }
  });
}

// Fonction pour récupérer tous les workflows d'un client
export async function getClientWorkflows(clientId: string): Promise<LLCFormationWorkflow[]> {
  return await prisma.lLCFormationWorkflow.findMany({
    where: { clientId },
    orderBy: { startedAt: 'desc' }
  });
} 