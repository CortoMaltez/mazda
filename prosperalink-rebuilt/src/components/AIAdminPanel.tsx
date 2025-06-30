'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
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
  Package
} from 'lucide-react';
import { getGeminiCostManager, AI_BUDGET_CONFIG } from '../lib/gemini-cost-manager';
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

export default function AIAdminPanel() {
  const [activeTab, setActiveTab] = useState('ai');
  const [aiStats, setAiStats] = useState<AIStats | null>(null);
  const [socialStats, setSocialStats] = useState<SocialMediaStats[]>([]);
  const [financialStats, setFinancialStats] = useState<FinancialStats | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);

  const costManager = getGeminiCostManager();

  useEffect(() => {
    // Charger les statistiques
    loadStats();
    
    // Actualiser toutes les 30 secondes
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = () => {
    // Statistiques IA
    const stats = costManager.getCostStats();
    setAiStats({
      ...stats,
      totalRequests: stats.usageHistory?.length || 0,
      totalCost: stats.annualUsage || 0
    });

    // Statistiques réseaux sociaux (simulées)
    setSocialStats([
      {
        platform: 'Facebook',
        followers: 15420,
        engagement: 8.5,
        posts: 156,
        reach: 45000,
        revenue: 12500
      },
      {
        platform: 'Instagram',
        followers: 8920,
        engagement: 12.3,
        posts: 203,
        reach: 28000,
        revenue: 8900
      },
      {
        platform: 'LinkedIn',
        followers: 3240,
        engagement: 6.8,
        posts: 89,
        reach: 12000,
        revenue: 5600
      }
    ]);

    // Statistiques financières (simulées)
    setFinancialStats({
      totalRevenue: 112000,
      monthlyRevenue: 8500,
      conversionRate: 3.2,
      averageOrderValue: 597,
      customerLifetimeValue: 1200,
      profitMargin: 68
    });
  };

  const updateApiKey = async () => {
    setIsConfiguring(true);
    try {
      // Ici, vous mettriez à jour la clé API dans votre backend
      localStorage.setItem('gemini-api-key', apiKey);
      alert('Clé API mise à jour avec succès !');
    } catch (error) {
      alert('Erreur lors de la mise à jour de la clé API');
    } finally {
      setIsConfiguring(false);
    }
  };

  const resetBudget = () => {
    costManager.resetBudget();
    loadStats();
    alert('Budget réinitialisé !');
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Panneau d'Administration IA</h1>
        <p className="text-gray-600">Gestion complète de l'IA Gemini, réseaux sociaux et finances</p>
      </div>

      {/* Navigation des onglets */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        <Button
          variant={activeTab === 'ai' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('ai')}
          className="flex items-center whitespace-nowrap"
        >
          <Bot className="w-4 h-4 mr-2" />
          IA Gemini
        </Button>
        <Button
          variant={activeTab === 'social' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('social')}
          className="flex items-center whitespace-nowrap"
        >
          <Globe className="w-4 h-4 mr-2" />
          Réseaux Sociaux
        </Button>
        <Button
          variant={activeTab === 'finance' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('finance')}
          className="flex items-center whitespace-nowrap"
        >
          <DollarSign className="w-4 h-4 mr-2" />
          Finances
        </Button>
        <Button
          variant={activeTab === 'products' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('products')}
          className="flex items-center whitespace-nowrap"
        >
          <Package className="w-4 h-4 mr-2" />
          Produits
        </Button>
        <Button
          variant={activeTab === 'pricing' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('pricing')}
          className="flex items-center whitespace-nowrap"
        >
          <Target className="w-4 h-4 mr-2" />
          Prix IA
        </Button>
        <Button
          variant={activeTab === 'content' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('content')}
          className="flex items-center whitespace-nowrap"
        >
          <FileText className="w-4 h-4 mr-2" />
          Contenu
        </Button>
        <Button
          variant={activeTab === 'settings' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('settings')}
          className="flex items-center whitespace-nowrap"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configuration
        </Button>
      </div>

      {/* Onglet IA Gemini */}
      {activeTab === 'ai' && aiStats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget et coûts */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Budget IA
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Quotidien</span>
                  <span className={getBudgetColor(aiStats.budgetPercentage.daily)}>
                    ${aiStats.dailyUsage.toFixed(2)} / ${AI_BUDGET_CONFIG.DAILY_BUDGET.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getBudgetBgColor(aiStats.budgetPercentage.daily)}`}
                    style={{ width: `${Math.min(aiStats.budgetPercentage.daily, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mensuel</span>
                  <span className={getBudgetColor(aiStats.budgetPercentage.monthly)}>
                    ${aiStats.monthlyUsage.toFixed(2)} / ${AI_BUDGET_CONFIG.MONTHLY_BUDGET.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getBudgetBgColor(aiStats.budgetPercentage.monthly)}`}
                    style={{ width: `${Math.min(aiStats.budgetPercentage.monthly, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Annuel</span>
                  <span className={getBudgetColor(aiStats.budgetPercentage.annual)}>
                    ${aiStats.annualUsage.toFixed(2)} / ${AI_BUDGET_CONFIG.ANNUAL_BUDGET.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getBudgetBgColor(aiStats.budgetPercentage.annual)}`}
                    style={{ width: `${Math.min(aiStats.budgetPercentage.annual, 100)}%` }}
                  ></div>
                </div>
              </div>

              <Button onClick={resetBudget} variant="outline" className="w-full">
                Réinitialiser Budget
              </Button>
            </div>
          </Card>

          {/* Statistiques d'utilisation */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Utilisation IA
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Requêtes totales:</span>
                <span className="font-medium">{aiStats.totalRequests || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Coût total:</span>
                <span className="font-medium text-red-600">${aiStats.totalCost?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Budget restant:</span>
                <span className="font-medium text-green-600">${aiStats.budgetRemaining.annual.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Statut:</span>
                <Badge variant={aiStats.isBudgetExceeded ? 'destructive' : 'default'}>
                  {aiStats.isBudgetExceeded ? 'Budget dépassé' : 'Normal'}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Actions rapides */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Tester Chatbot
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Générer Contenu
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Optimiser Campagnes
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Onglet Gestion des Produits */}
      {activeTab === 'products' && (
        <ProductManagement />
      )}

      {/* Onglet Recommandations de Prix IA */}
      {activeTab === 'pricing' && (
        <AIPricingAdvisor />
      )}

      {/* Onglet Générateur de Contenu */}
      {activeTab === 'content' && (
        <ContentGenerator />
      )}

      {/* Onglet Réseaux Sociaux */}
      {activeTab === 'social' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {socialStats.map((platform) => (
            <Card key={platform.platform} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {platform.platform === 'Facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                  {platform.platform === 'Instagram' && <Instagram className="w-5 h-5 text-pink-600" />}
                  {platform.platform === 'LinkedIn' && <Linkedin className="w-5 h-5 text-blue-700" />}
                  <h3 className="text-lg font-semibold">{platform.platform}</h3>
                </div>
                <Badge variant="outline">{platform.platform}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{platform.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Abonnés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{platform.engagement}%</div>
                  <div className="text-sm text-gray-600">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{platform.posts}</div>
                  <div className="text-sm text-gray-600">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">${platform.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Revenus</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Publier Contenu IA
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analyser Performance
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Onglet Finances */}
      {activeTab === 'finance' && financialStats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Revenus
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  ${financialStats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Revenus totaux</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${financialStats.monthlyRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Revenus mensuels</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Taux de conversion:</span>
                <span className="font-medium">{financialStats.conversionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Panier moyen:</span>
                <span className="font-medium">${financialStats.averageOrderValue}</span>
              </div>
              <div className="flex justify-between">
                <span>Valeur client:</span>
                <span className="font-medium">${financialStats.customerLifetimeValue}</span>
              </div>
              <div className="flex justify-between">
                <span>Marge bénéficiaire:</span>
                <span className="font-medium">{financialStats.profitMargin}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Projections
            </h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${(financialStats.monthlyRevenue * 12).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Projection annuelle</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">
                  ${(financialStats.totalRevenue * 0.68).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Bénéfices estimés</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Onglet Configuration */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              Configuration IA
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Clé API Gemini</label>
                <Input
                  type="password"
                  placeholder="Entrez votre clé API Gemini"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <Button 
                onClick={updateApiKey} 
                disabled={isConfiguring || !apiKey}
                className="w-full"
              >
                {isConfiguring ? 'Mise à jour...' : 'Mettre à jour la clé API'}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Paramètres Avancés
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Mode économique</span>
                <Badge variant="outline">Activé</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Limite quotidienne</span>
                <span className="font-medium">${AI_BUDGET_CONFIG.DAILY_BUDGET}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="outline">Activées</Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 