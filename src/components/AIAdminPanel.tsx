'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Settings, 
  Bot, 
  DollarSign, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Facebook,
  Instagram,
  Linkedin,
  Zap,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  FileText,
  CreditCard,
  Globe,
  Target,
  PieChart,
  Package,
  Building2,
  Clock,
  Brain
} from 'lucide-react';
// Gestionnaire de coûts IA supprimé - remplacé par AIUsageService
import AIPricingAdvisor from './AIPricingAdvisor';
import ProductManagement from './ProductManagement';
import ContentGenerator from './ContentGenerator';

interface AIStats {
  totalRequests: number;
  totalCost: number;
  dailyUsage: number;
  monthlyUsage: number;
  annualUsage: number;
  budgetRemaining: {
    daily: number;
    monthly: number;
    annual: number;
  };
  budgetPercentage: {
    daily: number;
    monthly: number;
    annual: number;
  };
  isBudgetExceeded: boolean;
  lastReset: Date;
  usageHistory: Array<{
    date: string;
    cost: number;
    tokens: number;
    images: number;
    videos: number;
    service: string;
  }>;
}

interface SocialMediaStats {
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  reach: number;
  revenue: number;
}

interface FinancialStats {
  totalRevenue: number;
  monthlyRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  profitMargin: number;
}

interface DashboardStats {
  totalUsers: number;
  activeLLCs: number;
  monthlyRevenue: number;
  pendingRequests: number;
  complianceAlerts: number;
  aiInteractions: number;
}

interface RecentActivity {
  id: string;
  type: 'llc_formation' | 'payment' | 'compliance' | 'support';
  user: string;
  description: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export default function AIAdminPanel() {
  const [activeTab, setActiveTab] = useState('ai');
  const [aiStats, setAiStats] = useState<AIStats | null>(null);
  const [socialStats, setSocialStats] = useState<SocialMediaStats[]>([]);
  const [financialStats, setFinancialStats] = useState<FinancialStats | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 2547,
    activeLLCs: 1893,
    monthlyRevenue: 1250000,
    pendingRequests: 23,
    complianceAlerts: 7,
    aiInteractions: 15420
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'llc_formation',
      user: 'Marie Dubois',
      description: 'Formation LLC Delaware demandée',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'pending'
    },
    {
      id: '2',
      type: 'payment',
      user: 'Carlos Rodriguez',
      description: 'Paiement reçu - $850',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'completed'
    },
    {
      id: '3',
      type: 'compliance',
      user: 'Sarah Johnson',
      description: 'Form 5472 soumis avec succès',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      status: 'completed'
    },
    {
      id: '4',
      type: 'support',
      user: 'Ahmed Hassan',
      description: 'Question sur ITIN',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      status: 'pending'
    }
  ]);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Gestionnaire de coûts IA supprimé - remplacé par AIUsageService

  useEffect(() => {
    // Charger les statistiques
    loadStats();
    
    // Actualiser toutes les 30 secondes
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    if (!costManager) {
      console.warn('Gestionnaire de coûts non disponible');
      return;
    }
    
    try {
      const stats = costManager.getCostStats();
      setAiStats({
        ...stats,
        totalRequests: stats.usageHistory.length,
        totalCost: stats.annualUsage
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const updateApiKey = async () => {
    if (!costManager) {
      alert('Gestionnaire de coûts non disponible');
      return;
    }
    
    setIsConfiguring(true);
    try {
      // Mettre à jour la clé API dans le localStorage
      localStorage.setItem('gemini-api-key', apiKey);
      alert('Clé API mise à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la clé API:', error);
      alert('Erreur lors de la mise à jour de la clé API');
    } finally {
      setIsConfiguring(false);
    }
  };

  const resetBudget = async () => {
    if (!costManager) {
      alert('Gestionnaire de coûts non disponible');
      return;
    }
    
    try {
      costManager.resetBudget();
      alert('Budget réinitialisé avec succès !');
      // Recharger les statistiques
      const newStats = costManager.getCostStats();
      setAiStats({
        ...newStats,
        totalRequests: newStats.usageHistory.length,
        totalCost: newStats.annualUsage
      });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du budget:', error);
      alert('Erreur lors de la réinitialisation du budget');
    }
  };

  const getBudgetColor = (percentage: number) => {
    if (percentage > 90) return 'text-red-600';
    if (percentage > 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getBudgetBgColor = (percentage: number) => {
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'llc_formation': return <Building2 className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'compliance': return <FileText className="w-4 h-4" />;
      case 'support': return <MessageSquare className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panneau d'Administration</h1>
              <p className="text-gray-600">Gestion complète de ProsperaLink avec IA</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Brain className="w-4 h-4 mr-2" />
                IA Active
              </Badge>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
          {['overview', 'users', 'llcs', 'payments', 'compliance', 'ai'].map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? 'default' : 'ghost'}
              onClick={() => setSelectedTab(tab)}
              className="capitalize"
            >
              {tab === 'overview' && <BarChart3 className="w-4 h-4 mr-2" />}
              {tab === 'users' && <Users className="w-4 h-4 mr-2" />}
              {tab === 'llcs' && <Building2 className="w-4 h-4 mr-2" />}
              {tab === 'payments' && <DollarSign className="w-4 h-4 mr-2" />}
              {tab === 'compliance' && <FileText className="w-4 h-4 mr-2" />}
              {tab === 'ai' && <Brain className="w-4 h-4 mr-2" />}
              {tab}
            </Button>
          ))}
        </div>

        {/* Overview Dashboard */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% ce mois
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">LLCs Actives</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeLLCs.toLocaleString()}</p>
                    </div>
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8% ce mois
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenus Mensuels</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15% ce mois
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Demandes en Attente</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Nécessite attention
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Alertes Conformité</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.complianceAlerts}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Action requise
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Interactions IA</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.aiInteractions.toLocaleString()}</p>
                    </div>
                    <Brain className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <Zap className="w-4 h-4 mr-1" />
                    +25% ce mois
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Activité Récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Insights IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Tendance de Croissance</h4>
                      <p className="text-sm text-blue-700">
                        Les formations LLC Delaware ont augmenté de 23% ce mois. 
                        Recommandation : Optimiser le marketing pour Wyoming.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Satisfaction Client</h4>
                      <p className="text-sm text-green-700">
                        Score de satisfaction : 4.9/5. Les clients apprécient 
                        particulièrement le support IA 24/7.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Optimisation</h4>
                      <p className="text-sm text-yellow-700">
                        7 demandes en attente nécessitent une intervention humaine. 
                        Temps de réponse moyen : 2h.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    Gérer Utilisateurs
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Building2 className="w-6 h-6 mb-2" />
                    Formations LLC
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    Conformité
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Brain className="w-6 h-6 mb-2" />
                    IA Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs can be implemented similarly */}
        {selectedTab !== 'overview' && (
          <Card>
            <CardHeader>
              <CardTitle>Section {selectedTab} - En développement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Cette section sera bientôt disponible avec des fonctionnalités avancées.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 