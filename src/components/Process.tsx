'use client';

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  CheckCircle, 
  Shield, 
  Clock, 
  ArrowRight,
  Zap,
  Brain,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export function Process() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Configuration Initiale",
      description: "Remplissez notre formulaire intelligent en 5 minutes",
      duration: "5 min",
      features: [
        "Formulaire intelligent",
        "Validation automatique",
        "Sélection d'état optimisée"
      ]
    },
    {
      number: "02",
      icon: Zap,
      title: "Formation Automatisée",
      description: "Notre IA traite votre demande en temps réel",
      duration: "12h max",
      features: [
        "Traitement IA",
        "Documents générés",
        "Soumission automatique"
      ]
    },
    {
      number: "03",
      icon: Shield,
      title: "Conformité Garantie",
      description: "Surveillance continue de vos obligations légales",
      duration: "24/7",
      features: [
        "Surveillance automatique",
        "Alertes intelligentes",
        "Renouvellements"
      ]
    },
    {
      number: "04",
      icon: Brain,
      title: "Support IA Premium",
      description: "Assistant intelligent disponible 24/7",
      duration: "Immédiat",
      features: [
        "Support multilingue",
        "Réponses instantanées",
        "Conseils personnalisés"
      ]
    }
  ]

  const benefits = [
    "Formation en 12h maximum",
    "Conformité automatique incluse",
    "Support IA 24/7",
    "Prix transparent",
    "Garantie de satisfaction",
    "Accès à l'écosystème américain"
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Processus
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus simple et efficace pour créer votre entreprise 
            aux États-Unis en 12h maximum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-gray-200 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <Badge className="mb-3 bg-blue-600 text-white">
                    {step.number}
                  </Badge>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {step.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{step.duration}</span>
                  </div>
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pourquoi ce processus fonctionne
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
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

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Timeline de formation
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Configuration</span>
                <Badge className="bg-green-100 text-green-800">5 min</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Traitement IA</span>
                <Badge className="bg-blue-100 text-blue-800">2-4h</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Soumission</span>
                <Badge className="bg-purple-100 text-purple-800">1-2h</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Confirmation</span>
                <Badge className="bg-green-100 text-green-800">4-6h</Badge>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-2xl font-bold text-blue-600">12h maximum</div>
              <div className="text-sm text-gray-600">Temps total de formation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 