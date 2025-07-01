'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Zap, 
  Shield, 
  Brain, 
  Globe, 
  Clock, 
  DollarSign,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Formation Express",
      description: "Création de votre LLC en 12h avec processus automatisé",
      benefit: "Rapidité maximale"
    },
    {
      icon: Shield,
      title: "Conformité Automatique",
      description: "Surveillance proactive de toutes les obligations légales",
      benefit: "Sécurité totale"
    },
    {
      icon: Brain,
      title: "IA Premium 24/7",
      description: "Assistant intelligent pour toutes vos questions",
      benefit: "Support intelligent"
    },
    {
      icon: Globe,
      title: "Service International",
      description: "Support multilingue pour entrepreneurs mondiaux",
      benefit: "Accessibilité globale"
    },
    {
      icon: Clock,
      title: "Suivi Temps Réel",
      description: "Dashboard en ligne avec progression et alertes",
      benefit: "Transparence totale"
    },
    {
      icon: DollarSign,
      title: "Prix Transparent",
      description: "Coûts réels + profit fixe, aucun frais caché",
      benefit: "Équité garantie"
    }
  ]

  const highlights = [
    "Formation en 12h maximum",
    "Conformité automatique incluse",
    "Support IA multilingue 24/7",
    "Prix transparent et équitable",
    "Accès à l'écosystème américain",
    "Garantie de satisfaction"
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            <Zap className="w-4 h-4 mr-2" />
            Fonctionnalités
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont vous avez besoin pour réussir
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ProsperaLink combine rapidité, sécurité et intelligence pour 
            vous offrir la meilleure expérience de formation LLC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-blue-100 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      {feature.benefit}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pourquoi ProsperaLink ?
            </h3>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Notre impact sur votre succès
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">12h</div>
                <div className="text-gray-600">Formation moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$0</div>
                <div className="text-gray-600">Frais cachés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Support IA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600">Conformité garantie</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 