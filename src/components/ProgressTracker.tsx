'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Clock,
  Target,
  Zap,
  Shield,
  Code,
  FileText,
  AlertTriangle,
  Building2,
  DollarSign,
  Users,
  Globe,
  Calendar,
  ArrowRight,
  Download,
  Edit,
  Plus,
  Award,
  Star
} from 'lucide-react';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  estimatedTime: string;
  actualTime?: string;
  documents: string[];
  requirements: string[];
  completedAt?: Date;
  startedAt?: Date;
  priority: 'low' | 'medium' | 'high';
}

interface ProgressData {
  id: string;
  clientName: string;
  companyName: string;
  state: string;
  type: 'delaware' | 'wyoming' | 'other';
  status: 'draft' | 'submitted' | 'processing' | 'completed' | 'cancelled';
  progress: number;
  steps: ProgressStep[];
  createdAt: Date;
  estimatedCompletion: Date;
  actualCompletion?: Date;
  totalCost: number;
  paidAmount: number;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  notes?: string;
}

interface ProgressTrackerProps {
  className?: string;
  showDetails?: boolean;
}

const categoryIcons = {
  architecture: <Code className="w-4 h-4" />,
  features: <Zap className="w-4 h-4" />,
  ai_integration: <Target className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  api_routes: <Code className="w-4 h-4" />,
  quality: <FileText className="w-4 h-4" />,
  config: <Code className="w-4 h-4" />
};

const categoryNames = {
  architecture: 'Architecture Technique',
  features: 'Fonctionnalités Principales',
  ai_integration: 'Intégration IA',
  security: 'Sécurité & Permissions',
  api_routes: 'API Routes',
  quality: 'Tests & Documentation',
  config: 'Configuration'
};

const categoryWeights = {
  architecture: 15,
  features: 25,
  ai_integration: 20,
  security: 15,
  api_routes: 10,
  quality: 10,
  config: 5
};

export default function ProgressTracker({ className = '', showDetails = false }: ProgressTrackerProps) {
  const [progressData, setProgressData] = useState<ProgressData[]>([
    {
      id: '1',
      clientName: 'Marie Dubois',
      companyName: 'TechStart France LLC',
      state: 'Delaware',
      type: 'delaware',
      status: 'processing',
      progress: 65,
      priority: 'high',
      assignedTo: 'Jean Dupont',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      estimatedCompletion: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
      totalCost: 850,
      paidAmount: 850,
      notes: 'Client prioritaire - Formation urgente pour lancement produit',
      steps: [
        {
          id: '1-1',
          title: 'Collecte des informations',
          description: 'Récupération des documents d\'identité et informations de l\'entreprise',
          status: 'completed',
          estimatedTime: '30 min',
          actualTime: '25 min',
          priority: 'high',
          documents: ['Passeport', 'Justificatif de domicile'],
          requirements: ['Informations personnelles', 'Adresse de l\'entreprise'],
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
        },
        {
          id: '1-2',
          title: 'Vérification des disponibilités',
          description: 'Contrôle de la disponibilité du nom d\'entreprise',
          status: 'completed',
          estimatedTime: '15 min',
          actualTime: '12 min',
          priority: 'medium',
          documents: ['Certificat de disponibilité'],
          requirements: ['Nom d\'entreprise'],
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5)
        },
        {
          id: '1-3',
          title: 'Préparation des documents',
          description: 'Création des formulaires de formation LLC',
          status: 'in_progress',
          estimatedTime: '45 min',
          priority: 'high',
          startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
          documents: ['Articles of Organization', 'Operating Agreement'],
          requirements: ['Structure de l\'entreprise', 'Membres de l\'LLC']
        },
        {
          id: '1-4',
          title: 'Soumission au secrétariat d\'état',
          description: 'Envoi des documents pour formation officielle',
          status: 'pending',
          estimatedTime: '1h',
          priority: 'high',
          documents: ['Reçu de soumission', 'Numéro de dossier'],
          requirements: ['Documents signés', 'Frais de formation']
        },
        {
          id: '1-5',
          title: 'Acquisition EIN',
          description: 'Demande du numéro d\'identification fiscale',
          status: 'pending',
          estimatedTime: '30 min',
          priority: 'medium',
          documents: ['EIN Letter', 'SS-4 Form'],
          requirements: ['LLC formée', 'Informations fiscales']
        },
        {
          id: '1-6',
          title: 'Finalisation',
          description: 'Livraison des documents finaux et activation du portail',
          status: 'pending',
          estimatedTime: '15 min',
          priority: 'low',
          documents: ['Certificat de formation', 'Accès portail'],
          requirements: ['Tous les documents précédents']
        }
      ]
    },
    {
      id: '2',
      clientName: 'Carlos Rodriguez',
      companyName: 'InnovateLab LLC',
      state: 'Wyoming',
      type: 'wyoming',
      status: 'completed',
      progress: 100,
      priority: 'medium',
      assignedTo: 'Sophie Martin',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      estimatedCompletion: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      actualCompletion: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      totalCost: 650,
      paidAmount: 650,
      notes: 'Formation réussie - Client très satisfait',
      steps: [
        {
          id: '2-1',
          title: 'Collecte des informations',
          description: 'Récupération des documents d\'identité et informations de l\'entreprise',
          status: 'completed',
          estimatedTime: '30 min',
          actualTime: '28 min',
          priority: 'high',
          documents: ['Passeport', 'Justificatif de domicile'],
          requirements: ['Informations personnelles', 'Adresse de l\'entreprise'],
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
        },
        {
          id: '2-2',
          title: 'Vérification des disponibilités',
          description: 'Contrôle de la disponibilité du nom d\'entreprise',
          status: 'completed',
          estimatedTime: '15 min',
          actualTime: '10 min',
          priority: 'medium',
          documents: ['Certificat de disponibilité'],
          requirements: ['Nom d\'entreprise'],
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6.5)
        },
        {
          id: '2-3',
          title: 'Préparation des documents',
          description: 'Création des formulaires de formation LLC',
          status: 'completed',
          estimatedTime: '45 min',
          actualTime: '42 min',
          priority: 'high',
          documents: ['Articles of Organization', 'Operating Agreement'],
          requirements: ['Structure de l\'entreprise', 'Membres de l\'LLC'],
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6)
        },
        {
          id: '2-4',
          title: 'Soumission au secrétariat d\'état',
          description: 'Envoi des documents pour formation officielle',
          status: 'completed',
          estimatedTime: '1h',
          actualTime: '55 min',
          priority: 'high',
          documents: ['Reçu de soumission', 'Numéro de dossier'],
          requirements: ['Documents signés', 'Frais de formation'],
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
        },
        {
          id: '2-5',
          title: 'Acquisition EIN',
          description: 'Demande du numéro d\'identification fiscale',
          status: 'completed',
          estimatedTime: '30 min',
          actualTime: '25 min',
          priority: 'medium',
          documents: ['EIN Letter', 'SS-4 Form'],
          requirements: ['LLC formée', 'Informations fiscales'],
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4)
        },
        {
          id: '2-6',
          title: 'Finalisation',
          description: 'Livraison des documents finaux et activation du portail',
          status: 'completed',
          estimatedTime: '15 min',
          actualTime: '12 min',
          priority: 'low',
          documents: ['Certificat de formation', 'Accès portail'],
          requirements: ['Tous les documents précédents'],
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
        }
      ]
    }
  ]);

  const [selectedProgress, setSelectedProgress] = useState<ProgressData | null>(null);
  const [filter, setFilter] = useState<'all' | 'processing' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'submitted': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredProgress = progressData.filter(progress => {
    const statusMatch = filter === 'all' || progress.status === filter;
    const priorityMatch = priorityFilter === 'all' || progress.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const getNextDeadline = () => {
    const processingItems = progressData.filter(p => p.status === 'processing');
    if (processingItems.length === 0) return null;
    
    return processingItems.reduce((earliest, current) => {
      return current.estimatedCompletion < earliest.estimatedCompletion ? current : earliest;
    });
  };

  const getPerformanceStats = () => {
    const completed = progressData.filter(p => p.status === 'completed').length;
    const total = progressData.length;
    const onTime = progressData.filter(p => 
      p.status === 'completed' && p.actualCompletion && p.actualCompletion <= p.estimatedCompletion
    ).length;
    
    return {
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      onTimeRate: completed > 0 ? Math.round((onTime / completed) * 100) : 0,
      averageProgress: Math.round(progressData.reduce((sum, p) => sum + p.progress, 0) / total)
    };
  };

  const stats = getPerformanceStats();
  const nextDeadline = getNextDeadline();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Suivi de Progression</h1>
              <p className="text-gray-600">Gestion avancée des formations LLC avec priorités</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <TrendingUp className="w-4 h-4 mr-2" />
                {stats.completionRate}% de réussite
              </Badge>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Projet
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux de Réussite</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completionRate}%</p>
                </div>
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Respect des Délais</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.onTimeRate}%</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Progression Moyenne</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.averageProgress}%</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Projets Actifs</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {progressData.filter(p => p.status === 'processing').length}
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Deadline Alert */}
        {nextDeadline && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-900">Prochaine échéance</h3>
                    <p className="text-orange-700">
                      {nextDeadline.companyName} - {nextDeadline.estimatedCompletion.toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Voir détails
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex space-x-2">
            {(['all', 'processing', 'completed', 'pending'] as const).map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? 'default' : 'outline'}
                onClick={() => setFilter(filterOption)}
                className="capitalize"
              >
                {filterOption === 'all' && 'Tous'}
                {filterOption === 'processing' && 'En cours'}
                {filterOption === 'completed' && 'Terminés'}
                {filterOption === 'pending' && 'En attente'}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            {(['all', 'high', 'medium', 'low'] as const).map((priorityOption) => (
              <Button
                key={priorityOption}
                variant={priorityFilter === priorityOption ? 'default' : 'outline'}
                onClick={() => setPriorityFilter(priorityOption)}
                className="capitalize"
              >
                {priorityOption === 'all' && 'Toutes priorités'}
                {priorityOption === 'high' && 'Haute'}
                {priorityOption === 'medium' && 'Moyenne'}
                {priorityOption === 'low' && 'Basse'}
              </Button>
            ))}
          </div>
        </div>

        {/* Progress List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProgress.map((progress) => (
            <Card 
              key={progress.id} 
              className={`cursor-pointer hover:shadow-lg transition-shadow ${
                selectedProgress?.id === progress.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedProgress(progress)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{progress.companyName}</CardTitle>
                    <p className="text-sm text-gray-600">{progress.clientName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getProgressStatusColor(progress.status)}>
                      {progress.status}
                    </Badge>
                    <Badge className={getPriorityColor(progress.priority)}>
                      {progress.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression</span>
                      <span>{progress.progress}%</span>
                    </div>
                    <Progress value={progress.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Coût total:</span>
                      <div className="font-semibold">{formatCurrency(progress.totalCost)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Payé:</span>
                      <div className="font-semibold">{formatCurrency(progress.paidAmount)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Assigné à:</span>
                      <div className="font-semibold">{progress.assignedTo || 'Non assigné'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Échéance:</span>
                      <div className="font-semibold">
                        {progress.estimatedCompletion.toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {progress.notes && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <strong>Notes:</strong> {progress.notes}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir détails
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Details */}
        {selectedProgress && (
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedProgress.companyName}</CardTitle>
                  <p className="text-gray-600">Progression détaillée - {selectedProgress.clientName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getProgressStatusColor(selectedProgress.status)}>
                    {selectedProgress.status}
                  </Badge>
                  <Badge className={getPriorityColor(selectedProgress.priority)}>
                    {selectedProgress.priority}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {/* Steps with Priority */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Étapes du processus</h3>
                  <div className="space-y-4">
                    {selectedProgress.steps.map((step, index) => (
                      <div key={step.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === 'completed' ? 'bg-green-500 text-white' :
                            step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                            'bg-gray-300 text-gray-600'
                          }`}>
                            {step.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="text-sm font-semibold">{index + 1}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{step.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(step.status)}>
                                {step.status === 'completed' ? 'Terminé' :
                                 step.status === 'in_progress' ? 'En cours' :
                                 step.status === 'pending' ? 'En attente' : 'Échec'}
                              </Badge>
                              <Badge className={getPriorityColor(step.priority)}>
                                {step.priority}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Temps estimé:</span>
                              <div className="font-semibold">{step.estimatedTime}</div>
                            </div>
                            {step.actualTime && (
                              <div>
                                <span className="text-gray-600">Temps réel:</span>
                                <div className="font-semibold">{step.actualTime}</div>
                              </div>
                            )}
                          </div>

                          {step.documents.length > 0 && (
                            <div className="mt-3">
                              <span className="text-sm text-gray-600">Documents:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {step.documents.map((doc, docIndex) => (
                                  <Badge key={docIndex} variant="outline" className="text-xs">
                                    <FileText className="w-3 h-3 mr-1" />
                                    {doc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {step.requirements.length > 0 && (
                            <div className="mt-3">
                              <span className="text-sm text-gray-600">Prérequis:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {step.requirements.map((req, reqIndex) => (
                                  <Badge key={reqIndex} variant="outline" className="text-xs">
                                    {req}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Chronologie</h3>
                  <div className="space-y-3">
                    {selectedProgress.steps
                      .filter(step => step.completedAt)
                      .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0))
                      .map((step) => (
                        <div key={step.id} className="flex items-center space-x-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{step.title}</span>
                          <Badge className={getPriorityColor(step.priority)}>
                            {step.priority}
                          </Badge>
                          <span className="text-gray-600">
                            terminé le {step.completedAt?.toLocaleDateString('fr-FR')} à {step.completedAt?.toLocaleTimeString('fr-FR')}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 