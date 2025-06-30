'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Play, 
  FileText, 
  Building, 
  CreditCard, 
  Shield,
  TrendingUp,
  Crown
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  estimatedTime: number;
  actualTime?: number;
  error?: string;
  completedAt?: Date;
}

interface WorkflowData {
  id: string;
  status: string;
  steps: WorkflowStep[];
  totalEstimatedTime: number;
  actualTime?: number;
  startedAt: string;
  completedAt?: string;
  data: any;
  documents: string[];
  ein?: string;
  bankAccount?: string;
}

interface WorkflowTrackerProps {
  workflowId?: string;
  onComplete?: () => void;
}

export default function WorkflowTracker({ workflowId, onComplete }: WorkflowTrackerProps) {
  const [workflow, setWorkflow] = useState<WorkflowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (workflowId) {
      fetchWorkflow();
    }
  }, [workflowId]);

  const fetchWorkflow = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/llc/formation?workflowId=${workflowId}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du workflow');
      }

      const data = await response.json();
      setWorkflow(data);
      
      // Si le workflow est terminé, appeler le callback
      if (data.status === 'completed' && onComplete) {
        onComplete();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'data_validation':
        return <Shield className="w-5 h-5" />;
      case 'name_availability':
        return <Building className="w-5 h-5" />;
      case 'document_generation':
        return <FileText className="w-5 h-5" />;
      case 'state_filing':
        return <CheckCircle className="w-5 h-5" />;
      case 'ein_application':
        return <TrendingUp className="w-5 h-5" />;
      case 'bank_account':
        return <CreditCard className="w-5 h-5" />;
      case 'compliance_setup':
        return <Shield className="w-5 h-5" />;
      case 'finalization':
        return <Crown className="w-5 h-5" />;
      default:
        return <Play className="w-5 h-5" />;
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const calculateProgress = () => {
    if (!workflow?.steps) return 0;
    
    const completedSteps = workflow.steps.filter(step => step.status === 'completed').length;
    return (completedSteps / workflow.steps.length) * 100;
  };

  const getEstimatedTimeRemaining = () => {
    if (!workflow?.steps) return 0;
    
    const remainingSteps = workflow.steps.filter(step => step.status !== 'completed');
    return remainingSteps.reduce((sum, step) => sum + step.estimatedTime, 0);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Chargement du workflow...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Erreur: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!workflow) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-600">
            Aucun workflow trouvé
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header du workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Formation LLC - {workflow.data?.companyName}</span>
            <Badge 
              variant="outline" 
              className={getStepStatusColor(workflow.status)}
            >
              {workflow.status === 'completed' && 'Terminé'}
              {workflow.status === 'in_progress' && 'En cours'}
              {workflow.status === 'failed' && 'Échoué'}
              {workflow.status === 'pending' && 'En attente'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Barre de progression */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progression: {Math.round(calculateProgress())}%</span>
              <span>
                {workflow.status === 'in_progress' && (
                  `Temps restant estimé: ${getEstimatedTimeRemaining()} min`
                )}
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>

          {/* Informations du workflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold">Démarré:</span>
              <br />
              {new Date(workflow.startedAt).toLocaleString()}
            </div>
            {workflow.completedAt && (
              <div>
                <span className="font-semibold">Terminé:</span>
                <br />
                {new Date(workflow.completedAt).toLocaleString()}
              </div>
            )}
            <div>
              <span className="font-semibold">Temps total:</span>
              <br />
              {workflow.actualTime || workflow.totalEstimatedTime} min
            </div>
          </div>

          {/* Informations de l'entreprise */}
          {workflow.ein && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-800">EIN attribué:</div>
              <div className="text-green-700">{workflow.ein}</div>
            </div>
          )}

          {workflow.bankAccount && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-800">Compte bancaire:</div>
              <div className="text-blue-700">{workflow.bankAccount}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Étapes du workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Étapes du processus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflow.steps?.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${getStepStatusColor(step.status)}`}>
                  {getStepIcon(step.id)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{step.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={getStepStatusColor(step.status)}
                      >
                        {getStepStatusIcon(step.status)}
                        <span className="ml-1">
                          {step.status === 'completed' && 'Terminé'}
                          {step.status === 'in_progress' && 'En cours'}
                          {step.status === 'failed' && 'Échoué'}
                          {step.status === 'pending' && 'En attente'}
                        </span>
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {step.actualTime || step.estimatedTime} min
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  
                  {step.error && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      {step.error}
                    </div>
                  )}
                  
                  {step.completedAt && (
                    <div className="text-xs text-gray-500">
                      Terminé le {new Date(step.completedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents générés */}
      {workflow.documents && workflow.documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Documents générés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {workflow.documents.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{doc}</span>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          onClick={fetchWorkflow}
          disabled={workflow.status === 'completed'}
        >
          Actualiser
        </Button>
        
        {workflow.status === 'failed' && (
          <Button variant="destructive">
            Relancer le workflow
          </Button>
        )}
      </div>
    </div>
  );
} 