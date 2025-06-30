'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  BarChart3, 
  Scale,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  Star
} from 'lucide-react';

interface AIService {
  id: string;
  name: string;
  description: string;
  price: number;
  profit: number;
  margin: number;
  prompt: string;
  maxTokens: number;
  responseFormat: 'text' | 'json' | 'html';
}

interface AIAnalysis {
  id: string;
  serviceId: string;
  userId: string;
  input: any;
  output: any;
  cost: number;
  tokensUsed: number;
  createdAt: Date;
  status: 'pending' | 'completed' | 'failed';
}

export default function AIPremiumServices() {
  const [services, setServices] = useState<AIService[]>([]);
  const [analyses, setAnalyses] = useState<AIAnalysis[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<AIService | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchAnalyses();
    fetchStats();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/ai-services?action=services');
      const data = await response.json();
      setServices(data.services);
    } catch (error) {
      console.error('Erreur récupération services:', error);
    }
  };

  const fetchAnalyses = async () => {
    try {
      const response = await fetch('/api/ai-services?action=analyses');
      const data = await response.json();
      setAnalyses(data.analyses);
    } catch (error) {
      console.error('Erreur récupération analyses:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/ai-services?action=stats');
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Erreur récupération stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeService = async (serviceId: string, inputData: any) => {
    setExecuting(serviceId);
    try {
      const response = await fetch('/api/ai-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          inputData
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Rafraîchir les analyses
        await fetchAnalyses();
        await fetchStats();
        setShowForm(false);
        setSelectedService(null);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Erreur exécution service:', error);
      alert('Erreur lors de l\'exécution du service IA');
    } finally {
      setExecuting(null);
    }
  };

  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'tax_optimization':
        return <DollarSign className="w-6 h-6" />;
      case 'growth_strategy':
        return <TrendingUp className="w-6 h-6" />;
      case 'compliance_audit':
        return <Shield className="w-6 h-6" />;
      case 'financial_planning':
        return <BarChart3 className="w-6 h-6" />;
      case 'market_analysis':
        return <BarChart3 className="w-6 h-6" />;
      case 'legal_consultation':
        return <Scale className="w-6 h-6" />;
      default:
        return <Brain className="w-6 h-6" />;
    }
  };

  const getServiceColor = (serviceId: string) => {
    switch (serviceId) {
      case 'tax_optimization':
        return 'bg-green-100 text-green-800';
      case 'growth_strategy':
        return 'bg-blue-100 text-blue-800';
      case 'compliance_audit':
        return 'bg-purple-100 text-purple-800';
      case 'financial_planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'market_analysis':
        return 'bg-indigo-100 text-indigo-800';
      case 'legal_consultation':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnalysisStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleServiceSelect = (service: AIService) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const inputData: any = {};

    // Récupérer les données du formulaire
    formData.forEach((value, key) => {
      inputData[key] = value;
    });

    executeService(selectedService.id, inputData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Chargement des services IA...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Services IA Premium
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Analysez votre entreprise avec notre IA spécialisée et obtenez des recommandations 
          personnalisées pour optimiser vos performances et maximiser vos profits.
        </p>
      </div>

      {/* Statistiques */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Statistiques IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalAnalyses}</div>
                <div className="text-sm text-gray-600">Analyses totales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completedAnalyses}</div>
                <div className="text-sm text-gray-600">Analyses terminées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">${stats.totalCost.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Coût total IA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.totalTokens.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Tokens utilisés</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services disponibles */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-full ${getServiceColor(service.id)}`}>
                    {getServiceIcon(service.id)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    ${service.price}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <p className="text-sm text-gray-600">{service.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Profit estimé:</span>
                    <span className="font-semibold text-green-600">${service.profit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Marge:</span>
                    <span className="font-semibold">{service.margin}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tokens max:</span>
                    <span>{service.maxTokens.toLocaleString()}</span>
                  </div>
                  
                  <Button
                    onClick={() => handleServiceSelect(service)}
                    disabled={executing === service.id}
                    className="w-full"
                  >
                    {executing === service.id ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyse en cours...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-2" />
                        Lancer l'analyse
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Formulaire d'analyse */}
      {showForm && selectedService && (
        <Card>
          <CardHeader>
            <CardTitle>Configuration - {selectedService.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom de votre LLC"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'entreprise
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ex: Technology, Consulting, Retail"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    État
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ex: California, Texas, New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Revenus estimés ($)
                  </label>
                  <input
                    type="number"
                    name="estimatedRevenue"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre d'employés
                  </label>
                  <input
                    type="number"
                    name="employees"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description de l'activité
                  </label>
                  <textarea
                    name="businessDescription"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Décrivez votre activité principale..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedService(null);
                  }}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={executing === selectedService.id}
                >
                  {executing === selectedService.id ? 'Analyse en cours...' : 'Lancer l\'analyse'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Analyses récentes */}
      {analyses.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Analyses Récentes</h3>
          <div className="space-y-4">
            {analyses.slice(0, 5).map((analysis) => {
              const service = services.find(s => s.id === analysis.serviceId);
              return (
                <Card key={analysis.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getAnalysisStatusIcon(analysis.status)}
                        <div>
                          <h4 className="font-semibold">{service?.name || 'Service inconnu'}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(analysis.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          Coût: ${analysis.cost.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Tokens: {analysis.tokensUsed.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    {analysis.status === 'completed' && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <div className="text-sm text-gray-700 line-clamp-3">
                          {analysis.output}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Voir le rapport complet
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 