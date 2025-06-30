'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Eye, EyeOff, Settings, Users, Database, BarChart3, FileText, Lock, Unlock } from 'lucide-react';

interface DiscreetIndicatorProps {
  isVisible: boolean;
  userType?: 'admin' | 'consultant' | 'none';
}

export default function DiscreetIndicator({ isVisible, userType = 'none' }: DiscreetIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Raccourci clavier pour afficher/masquer l'indicateur
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl + Alt + I pour afficher/masquer l'indicateur
      if (event.ctrlKey && event.altKey && event.key === 'i') {
        event.preventDefault();
        setShowIndicator(!showIndicator);
      }
      
      // Ctrl + Alt + S pour afficher/masquer les statistiques
      if (event.ctrlKey && event.altKey && event.key === 's') {
        event.preventDefault();
        setShowStats(!showStats);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showIndicator, showStats]);

  if (!isVisible || userType === 'none') return null;

  return (
    <>
      {/* Indicateur discret flottant */}
      {showIndicator && (
        <div className="fixed bottom-4 left-4 z-40">
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 p-3">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${userType === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">
                  {userType === 'admin' ? 'Administrateur' : 'Consultant'}
                </div>
                <div className="text-xs text-gray-500">
                  Mode discret actif
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowIndicator(false)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <EyeOff className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Statistiques discrètes */}
      {showStats && (
        <div className="fixed top-20 right-4 z-40">
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 p-4 w-80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Statistiques Système</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(false)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <EyeOff className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Utilisateurs actifs :</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">LLC formées :</span>
                <span className="font-medium">892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenus du jour :</span>
                <span className="font-medium text-green-600">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tickets support :</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IA conversations :</span>
                <span className="font-medium">1,856</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => window.location.href = '/admin'}
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => window.location.href = '/consultant'}
                >
                  <Users className="w-3 h-3 mr-1" />
                  Consultant
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Bouton discret pour activer l'indicateur */}
      {!showIndicator && (
        <div className="fixed bottom-4 left-4 z-40">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowIndicator(true)}
            className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full border border-white/30"
            title="Afficher l'indicateur discret (Ctrl+Alt+I)"
          >
            <Eye className="w-4 h-4 text-white" />
          </Button>
        </div>
      )}
    </>
  );
} 