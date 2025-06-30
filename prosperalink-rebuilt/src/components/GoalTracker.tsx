'use client';

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  color: string;
}

interface Milestone {
  id: string;
  name: string;
  target: number;
  achieved: boolean;
  date: Date;
  reward: string;
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Profit Net',
      target: 112500,
      current: 0,
      unit: '$',
      deadline: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000), // 300 jours
      color: 'blue'
    },
    {
      id: '2',
      name: 'Clients',
      target: 150,
      current: 0,
      unit: 'clients',
      deadline: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      color: 'green'
    },
    {
      id: '3',
      name: 'Taux de Conversion',
      target: 15,
      current: 0,
      unit: '%',
      deadline: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      color: 'purple'
    },
    {
      id: '4',
      name: 'Satisfaction Client',
      target: 98,
      current: 0,
      unit: '%',
      deadline: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      color: 'orange'
    }
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      name: '25 Clients',
      target: 25,
      achieved: false,
      date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 jours
      reward: '18,750$ de profit'
    },
    {
      id: '2',
      name: '50 Clients',
      target: 50,
      achieved: false,
      date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 jours
      reward: '37,500$ de profit'
    },
    {
      id: '3',
      name: '75 Clients',
      target: 75,
      achieved: false,
      date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 jours
      reward: '56,250$ de profit'
    },
    {
      id: '4',
      name: '100 Clients',
      target: 100,
      achieved: false,
      date: new Date(Date.now() + 240 * 24 * 60 * 60 * 1000), // 240 jours
      reward: '75,000$ de profit'
    },
    {
      id: '5',
      name: '150 Clients',
      target: 150,
      achieved: false,
      date: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000), // 300 jours
      reward: '112,500$ de profit'
    }
  ]);

  const [daysRemaining, setDaysRemaining] = useState(300);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simuler des données de progression
    const interval = setInterval(() => {
      setGoals(prev => prev.map(goal => {
        if (goal.name === 'Profit Net') {
          const progress = Math.min(goal.current + Math.random() * 100, goal.target);
          return { ...goal, current: Math.round(progress) };
        }
        if (goal.name === 'Clients') {
          const progress = Math.min(goal.current + Math.random() * 0.5, goal.target);
          return { ...goal, current: Math.round(progress) };
        }
        if (goal.name === 'Taux de Conversion') {
          const progress = Math.min(goal.current + Math.random() * 0.1, goal.target);
          return { ...goal, current: Math.round(progress * 10) / 10 };
        }
        if (goal.name === 'Satisfaction Client') {
          const progress = Math.min(goal.current + Math.random() * 0.2, goal.target);
          return { ...goal, current: Math.round(progress * 10) / 10 };
        }
        return goal;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Calculer les jours restants
    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(Date.now() + 300 * 24 * 60 * 60 * 1000);
      const diff = deadline.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysRemaining(Math.max(0, days));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Vérifier les milestones
    setMilestones(prev => prev.map(milestone => {
      const goal = goals.find(g => g.name === 'Clients');
      if (goal && goal.current >= milestone.target) {
        return { ...milestone, achieved: true };
      }
      return milestone;
    }));
  }, [goals]);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressWidth = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 shadow-lg"
        >
          🎯
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full bg-white shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🎯 Suivi des Objectifs</h2>
              <p className="text-sm opacity-90">Objectif : 112,500$ en 300 jours</p>
            </div>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Timer principal */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Temps restant pour atteindre l'objectif
            </h3>
            <div className="text-4xl font-bold text-blue-600">
              {daysRemaining} jours
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {Math.floor(daysRemaining / 30)} mois et {daysRemaining % 30} jours
            </p>
          </div>

          {/* Goals Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {goals.map((goal) => {
              const progress = getProgressWidth(goal.current, goal.target);
              return (
                <Card key={goal.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                      <p className="text-sm text-gray-600">
                        Objectif : {goal.target.toLocaleString()}{goal.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {goal.current.toLocaleString()}{goal.unit}
                      </div>
                      <div className="text-sm text-gray-600">
                        {progress.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0{goal.unit}</span>
                    <span>{goal.target.toLocaleString()}{goal.unit}</span>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Milestones */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎉 Milestones</h3>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    milestone.achieved
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      milestone.achieved
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {milestone.achieved ? '✓' : milestone.target}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{milestone.name}</h4>
                      <p className="text-sm text-gray-600">{milestone.reward}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {milestone.achieved ? 'Atteint !' : 'En cours'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {milestone.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              📊 Voir Dashboard
            </Button>
            <Button
              onClick={() => window.location.href = '/calendar'}
              variant="outline"
            >
              📅 Planifier Consultation
            </Button>
            <Button
              onClick={() => window.location.href = '/auth/signup'}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              🚀 Commencer Maintenant
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 