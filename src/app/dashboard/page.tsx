'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { FacebookIntegration } from '@/components/FacebookIntegration';
import { MetaIntegrationTest } from '@/components/MetaIntegrationTest';
import GoogleCalendar from '@/components/dashboard/GoogleCalendar';
import GoogleHubInitializer from '@/components/dashboard/GoogleHubInitializer';
import ComplianceHealthScore from '@/components/dashboard/ComplianceHealthScore';
import AIInsights from '@/components/dashboard/AIInsights';
import NextStepsWidget from '@/components/dashboard/NextStepsWidget';
import PersonalizedTimeline from '@/components/dashboard/PersonalizedTimeline';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/context?page=dashboard');
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        
        const result = await response.json();
        setDashboardData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement du Command Center...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Erreur de chargement</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header du Command Center */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Command Center
              </h1>
              <p className="text-xl text-gray-600">
                Votre hub intelligent pour la gestion d'entreprise
              </p>
            </div>
            {dashboardData?.userContext?.userProfile && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Bienvenue,</p>
                <p className="font-semibold text-gray-900">
                  {dashboardData.userContext.userProfile.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Statistiques rapides */}
        {dashboardData?.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {dashboardData.stats.totalCompanies}
              </div>
              <div className="text-sm text-gray-600">Entreprises</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {dashboardData.stats.pendingTasks}
              </div>
              <div className="text-sm text-gray-600">Tâches en attente</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {dashboardData.stats.complianceScore}%
              </div>
              <div className="text-sm text-gray-600">Score conformité</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {dashboardData.stats.recentActivities}
              </div>
              <div className="text-sm text-gray-600">Activités récentes</div>
            </div>
          </div>
        )}

        {/* Grille principale du Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {/* Score de santé de conformité */}
          {dashboardData?.complianceHealth && (
            <div className="lg:col-span-1">
              <ComplianceHealthScore
                score={dashboardData.complianceHealth.score}
                issues={dashboardData.complianceHealth.issues}
                nextDeadlines={dashboardData.complianceHealth.nextDeadlines}
              />
            </div>
          )}

          {/* Insights IA */}
          {dashboardData?.personalizedMessages && (
            <div className="lg:col-span-1">
              <AIInsights messages={dashboardData.personalizedMessages} />
            </div>
          )}

          {/* Actions suggérées */}
          {dashboardData?.suggestedActions && (
            <div className="lg:col-span-1">
              <NextStepsWidget actions={dashboardData.suggestedActions} />
            </div>
          )}
        </div>

        {/* Timeline personnalisée */}
        {dashboardData?.timelineItems && (
          <div className="mb-8">
            <PersonalizedTimeline items={dashboardData.timelineItems} />
          </div>
        )}

        {/* Intégrations existantes (réduites) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Intégrations</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Meta API</h4>
                <FacebookIntegration />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Google Workspace</h4>
                <GoogleHubInitializer />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Calendrier</h3>
            <GoogleCalendar />
          </div>
        </div>

        {/* Tests d'intégration (optionnel) */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Tests d'intégration</h3>
          <MetaIntegrationTest />
        </div>
      </div>
    </div>
  );
} 