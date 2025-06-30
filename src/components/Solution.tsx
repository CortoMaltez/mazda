'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Zap, Shield, Globe, Clock, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Solution() {
  const benefits = [
    {
      icon: Clock,
      title: "Formation en 12h",
      description: "Processus ultra-rapide, de la demande à la création",
      highlight: "Au lieu de 6-8 semaines"
    },
    {
      icon: Zap,
      title: "IA intégrée",
      description: "Support intelligent 24/7, réponses instantanées",
      highlight: "Zéro attente"
    },
    {
      icon: Shield,
      title: "Conformité garantie",
      description: "Surveillance automatique des délais et obligations",
      highlight: "Zéro risque"
    },
    {
      icon: Globe,
      title: "Support international",
      description: "Assistance multilingue, expertise locale",
      highlight: "Partout dans le monde"
    },
    {
      icon: Star,
      title: "Service premium",
      description: "Accompagnement personnalisé, suivi dédié",
      highlight: "Expérience VIP"
    },
    {
      icon: CheckCircle,
      title: "Prix transparents",
      description: "Coûts réels + profit fixe, aucune surprise",
      highlight: "100% transparent"
    }
  ]

  return (
    <section id="solution" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            <Zap className="w-4 h-4 mr-2" />
            Notre approche
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ProsperaLink révolutionne la formation d'entreprise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une plateforme tout-en-un qui combine technologie de pointe, 
            expertise juridique et service client exceptionnel.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-blue-100 hover:border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {benefit.description}
                    </p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {benefit.highlight}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Technologie de pointe
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>IA Gemini pour l'assistance intelligente</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Automatisation complète des processus</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Dashboard en temps réel</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Notifications intelligentes</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Expertise garantie
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Équipe d'experts juridiques</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Conformité IRS 100% garantie</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Support multilingue 24/7</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Suivi personnalisé</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
            Découvrir nos services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
} 