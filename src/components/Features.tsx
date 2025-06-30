'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  BarChart3, 
  FileText, 
  Clock,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "IA Gemini Intégrée",
      description: "Assistant intelligent 24/7 pour toutes vos questions",
      benefits: ["Réponses instantanées", "Conseils personnalisés", "Support multilingue"],
      color: "blue"
    },
    {
      icon: Shield,
      title: "Conformité Automatique",
      description: "Surveillance intelligente des obligations légales",
      benefits: ["Alertes automatiques", "Formulaires pré-remplis", "Zéro pénalité"],
      color: "green"
    },
    {
      icon: Zap,
      title: "Formation Ultra-Rapide",
      description: "Processus optimisé par IA en 12h maximum",
      benefits: ["Soumission intelligente", "Traitement prioritaire", "Confirmation instantanée"],
      color: "purple"
    },
    {
      icon: Globe,
      title: "Support International",
      description: "Assistance spécialisée pour entrepreneurs internationaux",
      benefits: ["ITIN assistance", "Services de traduction", "Expertise locale"],
      color: "orange"
    },
    {
      icon: Users,
      title: "Portail Client Premium",
      description: "Dashboard complet pour gérer votre entreprise",
      benefits: ["Documents en ligne", "Suivi en temps réel", "Notifications intelligentes"],
      color: "indigo"
    },
    {
      icon: BarChart3,
      title: "Analytics Prédictifs",
      description: "Insights avancés pour optimiser votre business",
      benefits: ["Tendances du marché", "Recommandations IA", "ROI optimisé"],
      color: "pink"
    }
  ]

  const advancedFeatures = [
    {
      title: "Gestion des Réseaux Sociaux",
      description: "Automatisation complète de vos campagnes marketing",
      icon: "📱"
    },
    {
      title: "Espionnage Concurrentiel",
      description: "Surveillance intelligente de vos concurrents",
      icon: "🔍"
    },
    {
      title: "Génération de Contenu IA",
      description: "Création automatique de contenu marketing",
      icon: "✍️"
    },
    {
      title: "Optimisation Conversion",
      description: "Amélioration continue de vos performances",
      icon: "📈"
    }
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800">
            <Star className="w-4 h-4 mr-2" />
            Fonctionnalités avancées
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technologie de pointe au service de votre succès
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment l'IA révolutionne la formation et la gestion d'entreprises 
            aux États-Unis.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-200"
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-${feature.color}-200 transition-colors`}>
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200"
                  size="sm"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advanced Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Services Premium avec IA
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Au-delà de la formation d'entreprise, ProsperaLink vous offre une suite complète 
              d'outils alimentés par l'IA pour faire croître votre business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Stack Technologique Avancée
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              ProsperaLink utilise les dernières technologies pour vous offrir 
              une expérience exceptionnelle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-semibold">Gemini AI</div>
              <div className="text-sm text-blue-200">Intelligence artificielle</div>
            </div>
            <div>
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold">Next.js 15</div>
              <div className="text-sm text-blue-200">Performance optimale</div>
            </div>
            <div>
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-semibold">Stripe</div>
              <div className="text-sm text-blue-200">Paiements sécurisés</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">Analytics</div>
              <div className="text-sm text-blue-200">Données en temps réel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 