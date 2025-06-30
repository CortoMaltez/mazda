"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isAI } from "@/lib/auth";

export default function AIPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!isAI(session)) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🧠 Panneau de Contrôle IA
          </h1>
          <p className="text-xl text-gray-300">
            Accès complet aux fonctionnalités d'intelligence artificielle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gestionnaire de Coûts IA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              💰 Gestionnaire de Coûts IA
            </h3>
            <p className="text-gray-300 mb-4">
              Optimisation automatique du budget Gemini (15,000$/an)
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Budget utilisé:</span>
                <span className="text-green-400">8,500$ / 15,000$</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '57%' }}></div>
              </div>
            </div>
          </div>

          {/* Assistant IA Avancé */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              🤖 Assistant IA Avancé
            </h3>
            <p className="text-gray-300 mb-4">
              Contrôle total des recommandations et optimisations
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Recommandations de prix
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Optimisation des campagnes
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Génération de contenu
              </div>
            </div>
          </div>

          {/* Bot WhatsApp IA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              📱 Bot WhatsApp IA
            </h3>
            <p className="text-gray-300 mb-4">
              Gestion automatisée des conversations clients
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Réponses automatiques
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Qualification des leads
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Intégration CRM
              </div>
            </div>
          </div>

          {/* Générateur de Contenu IA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              ✍️ Générateur de Contenu IA
            </h3>
            <p className="text-gray-300 mb-4">
              Création automatique de contenu marketing
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Posts réseaux sociaux
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Articles de blog
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Vidéos et images
              </div>
            </div>
          </div>

          {/* Analyse Prédictive IA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              📊 Analyse Prédictive IA
            </h3>
            <p className="text-gray-300 mb-4">
              Prévisions et recommandations stratégiques
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Prévisions de ventes
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Analyse de marché
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Optimisation ROI
              </div>
            </div>
          </div>

          {/* Optimiseur de Conversion IA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              🎯 Optimiseur de Conversion IA
            </h3>
            <p className="text-gray-300 mb-4">
              Amélioration automatique des taux de conversion
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> A/B Testing automatique
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Personnalisation
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-green-400">✓</span> Optimisation UX
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques Avancées */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <h3 className="text-2xl font-semibold text-white mb-6">
            📈 Statistiques Avancées IA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">98.5%</div>
              <div className="text-gray-300">Précision IA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">2.4x</div>
              <div className="text-gray-300">Amélioration ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">15,000$</div>
              <div className="text-gray-300">Budget Optimisé</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">660%</div>
              <div className="text-gray-300">ROI Attendu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 