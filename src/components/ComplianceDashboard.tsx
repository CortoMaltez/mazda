'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  FileText,
  TrendingUp,
  Shield
} from 'lucide-react';

interface ComplianceTask {
  id: string;
  name: string;
  category: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
  completedAt: string | null;
  estimatedFee: string | null;
  feeNotes: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  company?: {
    id: string;
    name: string;
    state: string;
  };
}

interface ComplianceDashboardProps {
  userId?: string;
  isAdmin?: boolean;
}

export default function ComplianceDashboard({ userId, isAdmin = false }: ComplianceDashboardProps) {
  const [tasks, setTasks] = useState<ComplianceTask[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/compliance/tasks${userId ? `?userId=${userId}` : ''}`);
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.tasks);
        setTotalCost(data.totalEstimatedCost);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTasks = async () => {
    try {
      setGenerating(true);
      const response = await fetch('/api/admin/compliance/generate-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId || 'current' }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchTasks(); // Recharger les tâches
        alert(`${data.message} - Coût total estimé: $${data.totalEstimatedCost.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Erreur lors de la génération des tâches:', error);
      alert('Erreur lors de la génération des tâches');
    } finally {
      setGenerating(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const response = await fetch('/api/admin/compliance/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, status }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchTasks(); // Recharger les tâches
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'MEDIUM': return 'bg-yellow-500 text-black';
      case 'LOW': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'OVERDUE': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'STATE_REPORT': return <FileText className="w-4 h-4" />;
      case 'STATE_TAX': return <DollarSign className="w-4 h-4" />;
      case 'LOCAL_COMPLIANCE': return <Shield className="w-4 h-4" />;
      case 'INDUSTRY_SPECIFIC': return <TrendingUp className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return task.status === 'PENDING';
    if (activeTab === 'overdue') return task.status === 'OVERDUE';
    if (activeTab === 'completed') return task.status === 'COMPLETED';
    return true;
  });

  const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const overdueTasks = tasks.filter(task => {
    if (task.status === 'COMPLETED' || !task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  const upcomingTasks = tasks.filter(task => {
    if (task.status === 'COMPLETED' || !task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return dueDate <= thirtyDaysFromNow && dueDate > now;
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tâches</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Complétées</p>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">En Retard</p>
                <p className="text-2xl font-bold">{overdueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Coût Estimé</p>
                <p className="text-2xl font-bold">${totalCost.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de progression */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Progression de Conformité</h3>
            <span className="text-sm text-gray-600">{completionRate.toFixed(1)}%</span>
          </div>
          <Progress value={completionRate} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{completedTasks} complétées</span>
            <span>{totalTasks - completedTasks} restantes</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {(isAdmin || !userId) && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Génération Intelligente</h3>
                <p className="text-sm text-gray-600">
                  Générer automatiquement les tâches de conformité basées sur votre situation
                </p>
              </div>
              <Button 
                onClick={generateTasks} 
                disabled={generating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {generating ? 'Génération...' : 'Générer les Tâches'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des tâches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tâches de Conformité</span>
            <Badge variant="outline" className="ml-2">
              {upcomingTasks} à venir (30j)
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Toutes ({totalTasks})</TabsTrigger>
              <TabsTrigger value="pending">En Attente ({tasks.filter(t => t.status === 'PENDING').length})</TabsTrigger>
              <TabsTrigger value="overdue">En Retard ({overdueTasks})</TabsTrigger>
              <TabsTrigger value="completed">Complétées ({completedTasks})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Aucune tâche trouvée pour ce filtre
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getCategoryIcon(task.category)}
                            <h4 className="font-semibold">{task.name}</h4>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {task.dueDate && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            )}
                            
                            {task.estimatedFee && (
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span>Frais: {task.estimatedFee}</span>
                              </div>
                            )}
                          </div>

                          {task.notes && (
                            <p className="text-sm text-gray-500 mt-2 italic">
                              Note: {task.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          {task.status !== 'COMPLETED' && (
                            <Button
                              size="sm"
                              onClick={() => updateTaskStatus(task.id, 'COMPLETED')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Terminer
                            </Button>
                          )}
                          
                          {task.status === 'PENDING' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')}
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              En Cours
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 