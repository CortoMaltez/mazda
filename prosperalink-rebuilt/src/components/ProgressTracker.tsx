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
  FileText
} from 'lucide-react';

interface ProgressData {
  date: string;
  globalProgress: number;
  status: string;
  categories: {
    [key: string]: {
      progress: number;
      completed: number;
      total: number;
      results: Array<{
        name: string;
        completed: boolean;
        exists: boolean;
        error?: string;
      }>;
    };
  };
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
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/progress');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du progrès');
      }
      const data = await response.json();
      setProgressData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const getStatusColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 75) return 'bg-yellow-500';
    if (progress >= 50) return 'bg-orange-500';
    if (progress >= 25) return 'bg-red-500';
    return 'bg-gray-500';
  };

  const getStatusIcon = (progress: number) => {
    if (progress >= 90) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (progress >= 75) return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    if (progress >= 50) return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusText = (progress: number) => {
    if (progress >= 90) return 'Excellent';
    if (progress >= 75) return 'Bon';
    if (progress >= 50) return 'Moyen';
    if (progress >= 25) return 'Faible';
    return 'Critique';
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span>Chargement du progrès...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-red-500">
            <XCircle className="w-5 h-5" />
            <span>Erreur: {error}</span>
          </div>
          <Button onClick={fetchProgress} className="mt-2" variant="outline">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!progressData) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            Aucune donnée de progrès disponible
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>📊 Progrès du Projet</span>
          <div className="flex items-center space-x-2">
            {getStatusIcon(progressData.globalProgress)}
            <Badge variant="outline">
              {getStatusText(progressData.globalProgress)}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progrès global */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progrès Global</span>
            <span className="text-sm text-gray-500">
              {progressData.globalProgress.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={progressData.globalProgress} 
            className="h-2"
          />
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>
              Mis à jour le {new Date(progressData.date).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>

        {/* Détails par catégorie */}
        {showDetails && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Détails par Catégorie</h4>
            {Object.entries(progressData.categories).map(([key, category]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {categoryIcons[key as keyof typeof categoryIcons]}
                    <span className="text-sm font-medium">
                      {categoryNames[key as keyof typeof categoryNames]}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {category.completed}/{category.total}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {category.progress.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={category.progress} 
                  className="h-1"
                />
                
                {/* Items de la catégorie */}
                <div className="ml-4 space-y-1">
                  {category.results.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      {item.completed ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : item.exists ? (
                        <AlertCircle className="w-3 h-3 text-yellow-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500" />
                      )}
                      <span className={item.completed ? 'text-green-700' : 'text-gray-600'}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            onClick={fetchProgress} 
            variant="outline" 
            size="sm"
            className="flex-1"
          >
            Actualiser
          </Button>
          {!showDetails && (
            <Button 
              onClick={() => window.open('/api/progress', '_blank')} 
              variant="outline" 
              size="sm"
              className="flex-1"
            >
              Rapport Complet
            </Button>
          )}
        </div>

        {/* Recommandations */}
        {progressData.globalProgress < 75 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <strong>Recommandation :</strong> Compléter les fonctionnalités de base pour améliorer le progrès global.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 