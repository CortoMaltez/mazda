'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  overview: {
    totalCompanies: number;
    activeCompanies: number;
    monthlyRevenue: number;
    conversionRate: number;
  };
  trends: {
    formations: { date: string; count: number }[];
    revenue: { date: string; amount: number }[];
    compliance: { date: string; score: number }[];
  };
  topStates: { state: string; count: number; revenue: number }[];
  userBehavior: {
    pageViews: { page: string; views: number }[];
    timeOnSite: number;
    bounceRate: number;
  };
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement des données
    setTimeout(() => {
      setAnalyticsData({
        overview: {
          totalCompanies: 2847,
          activeCompanies: 2653,
          monthlyRevenue: 2847000,
          conversionRate: 23.4
        },
        trends: {
          formations: [
            { date: '2024-01-01', count: 45 },
            { date: '2024-01-02', count: 52 },
            { date: '2024-01-03', count: 38 },
            { date: '2024-01-04', count: 61 },
            { date: '2024-01-05', count: 47 }
          ],
          revenue: [
            { date: '2024-01-01', amount: 45000 },
            { date: '2024-01-02', amount: 52000 },
            { date: '2024-01-03', amount: 38000 },
            { date: '2024-01-04', amount: 61000 },
            { date: '2024-01-05', amount: 47000 }
          ],
          compliance: [
            { date: '2024-01-01', score: 87 },
            { date: '2024-01-02', score: 89 },
            { date: '2024-01-03', score: 91 },
            { date: '2024-01-04', score: 88 },
            { date: '2024-01-05', score: 92 }
          ]
        },
        topStates: [
          { state: 'Delaware', count: 1247, revenue: 1247000 },
          { state: 'Wyoming', count: 892, revenue: 892000 },
          { state: 'Nevada', count: 456, revenue: 456000 },
          { state: 'Florida', count: 234, revenue: 234000 },
          { state: 'Texas', count: 18, revenue: 18000 }
        ],
        userBehavior: {
          pageViews: [
            { page: 'Accueil', views: 15420 },
            { page: 'Services', views: 8920 },
            { page: 'Prix', views: 6540 },
            { page: 'Dashboard', views: 4320 },
            { page: 'Support', views: 2100 }
          ],
          timeOnSite: 4.2,
          bounceRate: 34.5
        }
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Métriques et insights de la plateforme</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">90 derniers jours</option>
              <option value="1y">1 an</option>
            </select>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Exporter
            </button>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Entreprises</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.totalCompanies.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🏢</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600">
              <span className="text-sm">+12.5%</span>
              <span className="text-xs ml-2">vs mois dernier</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Entreprises Actives</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.activeCompanies.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600">
              <span className="text-sm">+8.3%</span>
              <span className="text-xs ml-2">vs mois dernier</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenus Mensuels</p>
                <p className="text-3xl font-bold text-gray-900">${(analyticsData.overview.monthlyRevenue / 1000).toFixed(0)}k</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">💰</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600">
              <span className="text-sm">+15.2%</span>
              <span className="text-xs ml-2">vs mois dernier</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Taux de Conversion</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.conversionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">📈</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600">
              <span className="text-sm">+2.1%</span>
              <span className="text-xs ml-2">vs mois dernier</span>
            </div>
          </div>
        </div>

        {/* Graphiques et tendances */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Formations par jour */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Formations par jour</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analyticsData.trends.formations.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="bg-blue-500 rounded-t w-full"
                    style={{ height: `${(item.count / 70) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{item.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Moyenne: {Math.round(analyticsData.trends.formations.reduce((sum, item) => sum + item.count, 0) / analyticsData.trends.formations.length)} formations/jour
            </div>
          </div>

          {/* Revenus par jour */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus par jour</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analyticsData.trends.revenue.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="bg-green-500 rounded-t w-full"
                    style={{ height: `${(item.amount / 70000) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">${(item.amount / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Total: ${(analyticsData.trends.revenue.reduce((sum, item) => sum + item.amount, 0) / 1000).toFixed(0)}k
            </div>
          </div>
        </div>

        {/* États les plus populaires */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">États les plus populaires</h3>
          <div className="space-y-4">
            {analyticsData.topStates.map((state, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{state.state}</p>
                    <p className="text-sm text-gray-600">{state.count} entreprises</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${(state.revenue / 1000).toFixed(0)}k</p>
                  <p className="text-sm text-gray-600">revenus</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comportement utilisateur */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pages les plus visitées</h3>
            <div className="space-y-3">
              {analyticsData.userBehavior.pageViews.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{page.page}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(page.views / analyticsData.userBehavior.pageViews[0].views) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">{page.views.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Métriques d'engagement</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Temps sur le site</span>
                  <span className="font-semibold text-gray-900">{analyticsData.userBehavior.timeOnSite} min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(analyticsData.userBehavior.timeOnSite / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Taux de rebond</span>
                  <span className="font-semibold text-gray-900">{analyticsData.userBehavior.bounceRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${analyticsData.userBehavior.bounceRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 