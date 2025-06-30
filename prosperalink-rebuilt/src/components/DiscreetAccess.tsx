'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Settings, Users, Shield, Database, BarChart3, FileText, LogOut, Eye, EyeOff } from 'lucide-react';

interface DiscreetAccessProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function DiscreetAccess({ isVisible, onToggle }: DiscreetAccessProps) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isConsultantMode, setIsConsultantMode] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [showAccessPanel, setShowAccessPanel] = useState(false);

  // Raccourcis clavier pour activer l'accès discret
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl + Alt + A pour Admin
      if (event.ctrlKey && event.altKey && event.key === 'a') {
        event.preventDefault();
        setShowAccessPanel(true);
        setIsAdminMode(true);
        setIsConsultantMode(false);
      }
      
      // Ctrl + Alt + C pour Consultant
      if (event.ctrlKey && event.altKey && event.key === 'c') {
        event.preventDefault();
        setShowAccessPanel(true);
        setIsConsultantMode(true);
        setIsAdminMode(false);
      }
      
      // Échap pour fermer
      if (event.key === 'Escape') {
        setShowAccessPanel(false);
        setIsAdminMode(false);
        setIsConsultantMode(false);
        setAccessCode('');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Zone cliquable discrète (coin supérieur droit)
  const handleDiscreetClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Zone sensible : coin supérieur droit (20x20px)
    if (x > rect.width - 20 && y < 20) {
      setShowAccessPanel(true);
    }
  };

  const handleAccessCodeSubmit = () => {
    // Codes d'accès (à remplacer par une authentification sécurisée)
    const adminCodes = ['admin2024', 'prospera_admin', 'superuser'];
    const consultantCodes = ['consultant2024', 'prospera_consultant', 'advisor'];
    
    if (isAdminMode && adminCodes.includes(accessCode)) {
      window.location.href = '/admin';
    } else if (isConsultantMode && consultantCodes.includes(accessCode)) {
      window.location.href = '/consultant';
    } else {
      alert('Code d\'accès incorrect');
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Zone cliquable discrète */}
      <div 
        className="fixed top-0 right-0 w-20 h-20 z-40 cursor-default"
        onClick={handleDiscreetClick}
        title="Zone d'accès discret"
      />

      {/* Panneau d'accès */}
      {showAccessPanel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {isAdminMode ? 'Accès Administrateur' : 'Accès Consultant'}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAccessPanel(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  {isAdminMode ? (
                    <p>Accès complet au système d'administration ProsperaLink</p>
                  ) : (
                    <p>Accès aux outils de consultation et de gestion client</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Code d'accès
                  </label>
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAccessCodeSubmit()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Entrez votre code d'accès"
                    autoFocus
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleAccessCodeSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Accéder
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAccessPanel(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Raccourcis clavier :</strong></p>
                  <p>• Ctrl + Alt + A : Mode Administrateur</p>
                  <p>• Ctrl + Alt + C : Mode Consultant</p>
                  <p>• Échap : Fermer</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Indicateur discret en mode admin/consultant */}
      {(isAdminMode || isConsultantMode) && (
        <div className="fixed top-4 right-4 z-40">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-gray-200">
            <div className={`w-2 h-2 rounded-full ${isAdminMode ? 'bg-red-500' : 'bg-blue-500'}`}></div>
            <span className="text-xs font-medium text-gray-700">
              {isAdminMode ? 'ADMIN' : 'CONSULTANT'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsAdminMode(false);
                setIsConsultantMode(false);
                setShowAccessPanel(false);
              }}
              className="h-4 w-4 p-0 text-gray-400 hover:text-gray-600"
            >
              <LogOut className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
} 