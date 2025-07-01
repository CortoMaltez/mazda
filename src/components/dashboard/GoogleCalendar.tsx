'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface ComplianceTask {
  id: string;
  name: string;
  category: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  completedAt?: string;
  estimatedFee?: string;
}

interface CalendarStatus {
  hasGoogleAccess: boolean;
  complianceTasks: ComplianceTask[];
  totalTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}

export default function GoogleCalendar() {
  const { data: session } = useSession();
  const [calendarStatus, setCalendarStatus] = useState<CalendarStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCalendarStatus();
    }
  }, [session]);

  const fetchCalendarStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Récupérer l'entreprise de l'utilisateur
      const companyResponse = await fetch('/api/companies');
      const companyData = await companyResponse.json();

      if (!companyData.companies || companyData.companies.length === 0) {
        setCalendarStatus({
          hasGoogleAccess: false,
          complianceTasks: [],
          totalTasks: 0,
          pendingTasks: 0,
          overdueTasks: 0
        });
        return;
      }

      const companyId = companyData.companies[0].id;

      // Récupérer le statut du calendrier
      const response = await fetch(`/api/compliance/sync-calendar?companyId=${companyId}`);
      const data = await response.json();

      if (response.ok) {
        setCalendarStatus(data);
      } else {
        setError(data.error || 'Erreur lors de la récupération du statut');
      }
    } catch (err) {
      setError('Erreur de connexion');
      console.error('Erreur lors de la récupération du statut:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const syncCalendar = async () => {
    try {
      setIsSyncing(true);
      setError(null);

      // Récupérer l'entreprise de l'utilisateur
      const companyResponse = await fetch('/api/companies');
      const companyData = await companyResponse.json();

      if (!companyData.companies || companyData.companies.length === 0) {
        setError('Aucune entreprise trouvée');
        return;
      }

      const companyId = companyData.companies[0].id;

      // Synchroniser le calendrier
      const response = await fetch('/api/compliance/sync-calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Recharger le statut après synchronisation
        await fetchCalendarStatus();
      } else {
        if (data.requiresGoogleAuth) {
          setError('Connexion Google requise. Veuillez vous connecter avec Google.');
        } else {
          setError(data.error || 'Erreur lors de la synchronisation');
        }
      }
    } catch (err) {
      setError('Erreur de connexion');
      console.error('Erreur lors de la synchronisation:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string, dueDate: string) => {
    if (status === 'COMPLETED') {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    
    if (dueDate && new Date(dueDate) < new Date()) {
      return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
    
    return <Clock className="w-4 h-4 text-blue-600" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Calendrier de Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Calendrier de Compliance
          </CardTitle>
          <Button
            onClick={syncCalendar}
            disabled={isSyncing || !calendarStatus?.hasGoogleAccess}
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Synchronisation...' : 'Synchroniser'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {!calendarStatus?.hasGoogleAccess ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Connexion Google requise
            </h3>
            <p className="text-gray-600 mb-4">
              Connectez-vous avec Google pour synchroniser votre calendrier de compliance.
            </p>
            <Button onClick={() => window.location.href = '/auth/signin'}>
              Se connecter avec Google
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {calendarStatus?.totalTasks || 0}
                </div>
                <div className="text-sm text-blue-600">Total</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {calendarStatus?.pendingTasks || 0}
                </div>
                <div className="text-sm text-yellow-600">En attente</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {calendarStatus?.overdueTasks || 0}
                </div>
                <div className="text-sm text-red-600">En retard</div>
              </div>
            </div>

            {/* Liste des tâches */}
            {calendarStatus?.complianceTasks && calendarStatus.complianceTasks.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Tâches de Compliance</h4>
                {calendarStatus.complianceTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(task.status, task.dueDate)}
                          <h5 className="font-medium text-gray-900">{task.name}</h5>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Catégorie: {task.category}</span>
                          {task.dueDate && (
                            <span>Échéance: {formatDate(task.dueDate)}</span>
                          )}
                          {task.estimatedFee && (
                            <span>Frais estimés: {task.estimatedFee}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune tâche de compliance
                </h3>
                <p className="text-gray-600">
                  Aucune tâche de compliance n'a été trouvée pour votre entreprise.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 