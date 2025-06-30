'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  Brain,
  Calculator
} from 'lucide-react';
import { getGeminiCostManager } from '../lib/gemini-cost-manager';

interface PredictionData {
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
  factors: string[];
  recommendations: string[];
}

interface AnalyticsData {
  revenue: {
    current: number;
    predicted: number;
    growth: number;
  };
  customers: {
    current: number;
    predicted: number;
    churn: number;
  };
  conversion: {
    current: number;
    predicted: number;
    improvement: number;
  };
  costs: {
    current: number;
    predicted: number;
    optimization: number;
  };
}

export default function PredictiveAnalytics() {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [insights, setInsights] = useState<string[]>([]);

  const costManager = getGeminiCostManager();

  // Données simulées pour la démonstration
  const mockData = {
    revenue: { current: 8500, predicted: 10200, growth: 20 },
    customers: { current: 45, predicted: 58, churn: 0.05 },
    conversion: { current: 3.2, predicted: 4.1, improvement: 28 },
    costs: { current: 3200, predicted: 2800, optimization: 12.5 }
  };

  useEffect(() => {
    setAnalytics(mockData);
    generatePredictions();
  }, []);

  const generatePredictions = async () => {
    setIsAnalyzing(true);
    
    try {
      const predictionPrompt = `
        Analyse les données de ProsperaLink et génère des prédictions pour les 30 prochains jours:
        
        Revenus actuels: $${mockData.revenue.current}/mois
        Clients actuels: ${mockData.customers.current}
        Taux de conversion: ${mockData.conversion.current}%
        Coûts actuels: $${mockData.costs.current}/mois
        
        Génère des prédictions réalistes avec:
        - Valeurs prédites
        - Niveau de confiance
        - Tendances
        - Facteurs influençant
        - Recommandations d'action
      `;

      const analysis = await costManager.generateText(predictionPrompt);
      
      // Simuler des prédictions basées sur l'analyse IA
      const newPredictions: PredictionData[] = [
        {
          metric: 'Revenus Mensuels',
          currentValue: mockData.revenue.current,
          predictedValue: mockData.revenue.predicted,
          confidence: 85,
          trend: 'up',
          timeframe: '30 jours',
          factors: ['Saisonnalité Q4', 'Nouveaux services IA', 'Marketing automatisé'],
          recommendations: ['Augmenter budget marketing', 'Lancer campagne Q4', 'Optimiser conversion']
        },
        {
          metric: 'Nouveaux Clients',
          currentValue: mockData.customers.current,
          predictedValue: mockData.customers.predicted,
          confidence: 78,
          trend: 'up',
          timeframe: '30 jours',
          factors: ['Chatbot IA', 'Content marketing', 'Références clients'],
          recommendations: ['Améliorer onboarding', 'Programme de fidélité', 'Support IA 24/7']
        },
        {
          metric: 'Taux de Conversion',
          currentValue: mockData.conversion.current,
          predictedValue: mockData.conversion.predicted,
          confidence: 82,
          trend: 'up',
          timeframe: '30 jours',
          factors: ['Optimisation IA', 'A/B testing', 'UX améliorée'],
          recommendations: ['Tests continus', 'Personnalisation IA', 'Simplifier processus']
        },
        {
          metric: 'Coûts Opérationnels',
          currentValue: mockData.costs.current,
          predictedValue: mockData.costs.predicted,
          confidence: 75,
          trend: 'down',
          timeframe: '30 jours',
          factors: ['Automatisation IA', 'Optimisation processus', 'Économies d\'échelle'],
          recommendations: ['Automatiser plus de tâches', 'Négocier fournisseurs', 'Optimiser IA']
        }
      ];

      setPredictions(newPredictions);
      generateInsights(newPredictions);
    } catch (error) {
      console.error('Erreur analyse prédictive:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateInsights = async (predictionData: PredictionData[]) => {
    try {
      const insightsPrompt = `
        Basé sur ces prédictions, génère 5 insights actionnables pour ProsperaLink:
        
        ${predictionData.map(p => `${p.metric}: ${p.currentValue} → ${p.predictedValue} (${p.trend})`).join('\n')}
        
        Génère des insights concrets et actionnables.
      `;

      const insightsResponse = await costManager.generateText(insightsPrompt);
      
      // Simuler des insights basés sur la réponse IA
      const newInsights = [
        'Lancement d\'une campagne Q4 ciblée pourrait augmenter les revenus de 20%',
        'L\'optimisation du chatbot IA réduit les coûts de support de 15%',
        'L\'automatisation des processus marketing améliore la conversion de 28%',
        'L\'expansion des services IA premium génère 30% de revenus supplémentaires',
        'L\'amélioration de l\'expérience client réduit le churn de 40%'
      ];

      setInsights(newInsights);
    } catch (error) {
      console.error('Erreur génération insights:', error);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 80) return <Badge variant="default" className="bg-green-100 text-green-800">Élevé</Badge>;
    if (confidence >= 60) return <Badge variant="secondary">Moyen</Badge>;
    return <Badge variant="destructive">Faible</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-blue-600" />
          Analyse Prédictive IA
        </h1>
        <p className="text-gray-600">Prédictions et insights basés sur l'IA Gemini pour optimiser les performances</p>
      </div>

      {/* Contrôles */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant={selectedTimeframe === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeframe('7d')}
          >
            7 jours
          </Button>
          <Button
            variant={selectedTimeframe === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeframe('30d')}
          >
            30 jours
          </Button>
          <Button
            variant={selectedTimeframe === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeframe('90d')}
          >
            90 jours
          </Button>
        </div>

        <Button
          onClick={generatePredictions}
          disabled={isAnalyzing}
          className="flex items-center"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyse...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Actualiser Prédictions
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Métriques principales */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Métriques Clés
            </h3>
            
            {analytics && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Revenus</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${analytics.revenue.current.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    +{analytics.revenue.growth}% vs prédiction
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Clients</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {analytics.customers.current}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Churn: {analytics.customers.churn * 100}%
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Conversion</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {analytics.conversion.current}%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-purple-600 mt-1">
                    +{analytics.conversion.improvement}% amélioration
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Coûts</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${analytics.costs.current.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-orange-600 mt-1">
                    -{analytics.costs.optimization}% optimisation
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Prédictions détaillées */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Prédictions IA ({selectedTimeframe})
            </h3>

            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(prediction.trend)}
                      <h4 className="font-semibold">{prediction.metric}</h4>
                      {getConfidenceBadge(prediction.confidence)}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Confiance</p>
                      <p className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Valeur actuelle</p>
                      <p className="text-lg font-semibold">
                        {prediction.metric.includes('Revenus') || prediction.metric.includes('Coûts') 
                          ? `$${prediction.currentValue.toLocaleString()}`
                          : prediction.currentValue
                        }
                        {prediction.metric.includes('Conversion') ? '%' : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Prédiction</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {prediction.metric.includes('Revenus') || prediction.metric.includes('Coûts') 
                          ? `$${prediction.predictedValue.toLocaleString()}`
                          : prediction.predictedValue
                        }
                        {prediction.metric.includes('Conversion') ? '%' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Facteurs influençant:</p>
                    <div className="flex flex-wrap gap-1">
                      {prediction.factors.map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Recommandations:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {prediction.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Insights actionnables */}
      <div className="mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Insights Actionnables
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{insight}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium text-yellow-800">Prochaine analyse automatique</p>
                <p className="text-sm text-yellow-700">L'IA actualisera les prédictions dans 24h</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 