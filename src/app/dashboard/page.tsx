import { Metadata } from 'next';
import { FacebookIntegration } from '@/components/FacebookIntegration';
import { MetaIntegrationTest } from '@/components/MetaIntegrationTest';

export const metadata: Metadata = {
  title: 'Dashboard - ProsperaLink',
  description: 'Tableau de bord ProsperaLink avec intégration Meta API',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard ProsperaLink
          </h1>
          <p className="text-xl text-gray-600">
            Gérez votre entreprise et vos réseaux sociaux
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Navigation rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/" 
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-blue-900">Accueil</h3>
              <p className="text-sm text-blue-700">Retour à la page principale</p>
            </a>
            <a 
              href="/auth/signin" 
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold text-green-900">Connexion</h3>
              <p className="text-sm text-green-700">Se connecter à votre compte</p>
            </a>
            <a 
              href="/test" 
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-semibold text-purple-900">Tests</h3>
              <p className="text-sm text-purple-700">Page de test de l'application</p>
            </a>
          </div>
        </div>

        {/* Meta API Integration */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intégration Meta API</h2>
          <FacebookIntegration />
        </div>

        {/* Meta API Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tests d'intégration Meta</h2>
          <MetaIntegrationTest />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Statistiques rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2,500+</div>
              <div className="text-sm text-blue-700">Entreprises créées</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">12h</div>
              <div className="text-sm text-green-700">Formation moyenne</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-purple-700">Satisfaction client</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">50+</div>
              <div className="text-sm text-orange-700">Pays servis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 