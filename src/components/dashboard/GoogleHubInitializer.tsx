'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FolderOpen, Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface HubStatus {
  hasGoogleAccess: boolean;
  company: any;
  hubInitialized: boolean;
}

export default function GoogleHubInitializer() {
  const { data: session } = useSession();
  const [hubStatus, setHubStatus] = useState<HubStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchHubStatus();
    }
  }, [session]);

  const fetchHubStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/workspace/initialize-hub');
      const data = await response.json();

      if (response.ok) {
        setHubStatus(data);
        if (data.company?.name) {
          setCompanyName(data.company.name);
        }
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

  const initializeHub = async () => {
    if (!companyName.trim()) {
      setError('Veuillez saisir le nom de votre entreprise');
      return;
    }

    try {
      setIsInitializing(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/workspace/initialize-hub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName: companyName.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Hub corporate créé avec succès !');
        await fetchHubStatus(); // Recharger le statut
      } else {
        if (data.requiresGoogleAuth) {
          setError('Connexion Google requise. Veuillez vous connecter avec Google.');
        } else {
          setError(data.error || 'Erreur lors de l\'initialisation du hub');
        }
      }
    } catch (err) {
      setError('Erreur de connexion');
      console.error('Erreur lors de l\'initialisation:', err);
    } finally {
      setIsInitializing(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Hub Google Drive
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
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Hub Google Drive Corporate
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {!hubStatus?.hasGoogleAccess ? (
          <div className="text-center py-8">
            <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Connexion Google requise
            </h3>
            <p className="text-gray-600 mb-4">
              Connectez-vous avec Google pour créer votre hub corporate sur Google Drive.
            </p>
            <Button onClick={() => window.location.href = '/auth/signin'}>
              Se connecter avec Google
            </Button>
          </div>
        ) : hubStatus?.hubInitialized ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Hub initialisé</h4>
              </div>
              <p className="text-sm text-green-700">
                Votre hub corporate a été créé avec succès sur Google Drive.
              </p>
            </div>

            {hubStatus.company && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Informations de l'entreprise</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <p><strong>Nom:</strong> {hubStatus.company.name}</p>
                  <p><strong>État:</strong> {hubStatus.company.state}</p>
                  <p><strong>Type:</strong> {hubStatus.company.businessType}</p>
                  <p><strong>Statut:</strong> {hubStatus.company.status}</p>
                </div>
              </div>
            )}

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Structure du hub</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📁 ProsperaLink - {hubStatus.company?.name || 'Votre Entreprise'}</p>
                <p className="ml-4">📄 Documents Légaux</p>
                <p className="ml-4">📋 Compliance</p>
                <p className="ml-4">💰 Factures & Paiements</p>
                <p className="ml-4">📧 Correspondance</p>
                <p className="ml-4">📊 Rapports Annuels</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">Initialisation requise</h4>
              </div>
              <p className="text-sm text-yellow-700">
                Créez votre hub corporate sur Google Drive pour organiser tous vos documents d'entreprise.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="companyName">Nom de votre entreprise</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Ex: Ma Société LLC"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                onClick={initializeHub}
                disabled={isInitializing || !companyName.trim()}
                className="w-full"
              >
                {isInitializing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Créer le hub corporate
                  </>
                )}
              </Button>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Ce qui sera créé :</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Un dossier principal pour votre entreprise</li>
                <li>• Des sous-dossiers organisés par catégorie</li>
                <li>• Une structure prête pour la gestion documentaire</li>
                <li>• Intégration avec les services Google Workspace</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 