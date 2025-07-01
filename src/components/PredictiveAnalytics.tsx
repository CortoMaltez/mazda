'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Calculator,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
// Gestionnaire de coûts IA supprimé - remplacé par AIUsageService

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
    previous: number;
    trend: number;
    forecast: number;
  };
  conversions: {
    current: number;
    previous: number;
    trend: number;
    rate: number;
  };
  customers: {
    current: number;
    previous: number;
    trend: number;
    churn: number;
  };
  engagement: {
    current: number;
    previous: number;
    trend: number;
    satisfaction: number;
  };
}

interface Prediction {
  id: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  timeframe: string;
  factors: string[];
  impact: 'positive' | 'negative' | 'neutral';
  recommendation: string;
}

interface TrendData {
  date: string;
  value: number;
  predicted: number;
}

export default function PredictiveAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    revenue: {
      current: 1250000,
      previous: 1100000,
      trend: 13.6,
      forecast: 1400000
    },
    conversions: {
      current: 3.2,
      previous: 2.8,
      trend: 14.3,
      rate: 3.2
    },
    customers: {
      current: 2547,
      previous: 2189,
      trend: 16.4,
      churn: 2.1
    },
    engagement: {
      current: 4.9,
      previous: 4.7,
      trend: 4.3,
      satisfaction: 4.9
    }
  });

  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: '1',
      metric: 'Revenus mensuels',
      currentValue: 1250000,
      predictedValue: 1400000,
      confidence: 85,
      timeframe: '30 jours',
      factors: ['Croissance des formations Delaware', 'Nouveaux clients internationaux', 'Optimisation des prix'],
      impact: 'positive',
      recommendation: 'Augmenter la capacité de support pour gérer la croissance'
    },
    {
      id: '2',
      metric: 'Taux de conversion',
      currentValue: 3.2,
      predictedValue: 3.8,
      confidence: 78,
      timeframe: '30 jours',
      factors: ['Amélioration du site web', 'Nouveaux témoignages', 'Optimisation des CTA'],
      impact: 'positive',
      recommendation: 'Investir dans l\'optimisation des pages de conversion'
    },
    {
      id: '3',
      metric: 'Taux de churn',
      currentValue: 2.1,
      predictedValue: 1.8,
      confidence: 72,
      timeframe: '30 jours',
      factors: ['Amélioration du support client', 'Nouveaux services', 'Programme de fidélisation'],
      impact: 'positive',
      recommendation: 'Maintenir le niveau de service client actuel'
    },
    {
      id: '4',
      metric: 'Coûts d\'acquisition client',
      currentValue: 150,
      predictedValue: 165,
      confidence: 65,
      timeframe: '30 jours',
      factors: ['Augmentation des coûts publicitaires', 'Concurrence accrue', 'Saisonnalité'],
      impact: 'negative',
      recommendation: 'Optimiser les campagnes publicitaires et diversifier les sources de trafic'
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(false);

      // Gestionnaire de coûts IA supprimé - remplacé par AIUsageService

  useEffect(() => {
    // Simuler le rafraîchissement des données
    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Simuler le rafraîchissement des données
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mettre à jour les données avec de nouvelles prédictions
      setAnalyticsData(prev => ({
        ...prev,
        revenue: {
          ...prev.revenue,
          current: prev.revenue.current + Math.random() * 50000,
          trend: prev.revenue.trend + (Math.random() - 0.5) * 5
        }
      }));
      
      alert('Données mises à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
      alert('Erreur lors du rafraîchissement des données');
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (trend < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Prédictifs</h1>
              <p className="text-gray-600">Insights avancés alimentés par l'IA Gemini</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Brain className="w-4 h-4 mr-2" />
                IA Prédictive Active
              </Badge>
              <Button variant="outline" onClick={refreshData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </div>
          </div>
        </div>

        {/* Timeframe Filter */}
        <div className="flex space-x-2 mb-6">
          {(['7d', '30d', '90d', '1y'] as const).map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
              onClick={() => setSelectedTimeframe(timeframe)}
              size="sm"
            >
              {timeframe === '7d' && '7 jours'}
              {timeframe === '30d' && '30 jours'}
              {timeframe === '90d' && '90 jours'}
              {timeframe === '1y' && '1 an'}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(analyticsData.revenue.current)}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(analyticsData.revenue.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(analyticsData.revenue.trend)}`}>
                      {formatPercentage(analyticsData.revenue.trend)}
                    </span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.conversions.current}%
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(analyticsData.conversions.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(analyticsData.conversions.trend)}`}>
                      {formatPercentage(analyticsData.conversions.trend)}
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.customers.current.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(analyticsData.customers.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(analyticsData.customers.trend)}`}>
                      {formatPercentage(analyticsData.customers.trend)}
                    </span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.engagement.current}/5
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(analyticsData.engagement.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(analyticsData.engagement.trend)}`}>
                      {formatPercentage(analyticsData.engagement.trend)}
                    </span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Prédictions IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{prediction.metric}</h4>
                      <Badge className={getImpactColor(prediction.impact)}>
                        {prediction.impact === 'positive' ? 'Positif' : 
                         prediction.impact === 'negative' ? 'Négatif' : 'Neutre'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-gray-600">Valeur actuelle:</span>
                        <div className="font-semibold">
                          {prediction.metric.includes('Revenus') ? formatCurrency(prediction.currentValue) :
                           prediction.metric.includes('Taux') ? `${prediction.currentValue}%` :
                           prediction.currentValue.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Prédiction:</span>
                        <div className="font-semibold">
                          {prediction.metric.includes('Revenus') ? formatCurrency(prediction.predictedValue) :
                           prediction.metric.includes('Taux') ? `${prediction.predictedValue}%` :
                           prediction.predictedValue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Confiance: {prediction.confidence}%</span>
                      <span className="text-sm text-gray-600">Délai: {prediction.timeframe}</span>
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Facteurs:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {prediction.factors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-blue-900">Recommandation:</span>
                      <p className="text-sm text-blue-700 mt-1">{prediction.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Tendances & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Revenue Forecast */}
                <div>
                  <h4 className="font-semibold mb-3">Prévision des Revenus</h4>
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Prévision 30 jours</span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(analyticsData.revenue.forecast)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(analyticsData.revenue.current / analyticsData.revenue.forecast) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Croissance prévue de {formatPercentage(((analyticsData.revenue.forecast - analyticsData.revenue.current) / analyticsData.revenue.current) * 100)}
                    </p>
                  </div>
                </div>

                {/* Key Insights */}
                <div>
                  <h4 className="font-semibold mb-3">Insights Clés</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">Formations Delaware en forte croissance</p>
                        <p className="text-sm text-green-700">+23% ce mois, recommander aux nouveaux clients</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Taux de conversion optimisé</p>
                        <p className="text-sm text-blue-700">Nouvelle page de prix améliore les conversions de 15%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-900">Attention aux coûts d'acquisition</p>
                        <p className="text-sm text-yellow-700">Augmentation de 10% prévue, optimiser les campagnes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div>
                  <h4 className="font-semibold mb-3">Indicateurs de Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">98%</div>
                      <div className="text-sm text-gray-600">Taux de satisfaction</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12h</div>
                      <div className="text-sm text-gray-600">Temps moyen de formation</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">2.1%</div>
                      <div className="text-sm text-gray-600">Taux de churn</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">$850</div>
                      <div className="text-sm text-gray-600">Panier moyen</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions Recommandées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Target className="w-6 h-6 mb-2" />
                Optimiser les Campagnes
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="w-6 h-6 mb-2" />
                Améliorer le Support
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Download className="w-6 h-6 mb-2" />
                Exporter le Rapport
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 