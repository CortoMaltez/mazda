'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Zap, 
  Shield, 
  Clock, 
  Brain, 
  Globe, 
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'

export function Solution() {
  const solutions = [
    {
      icon: Shield,
      title: "Compliance Shield Complet",
      description: "Protection contre les $25,000 de pénalités IRS avec surveillance automatique",
      benefit: "Sécurité juridique totale"
    },
    {
      icon: MessageCircle,
      title: "Support WhatsApp Personnel",
      description: "Un point de contact unique qui connaît votre histoire et vos objectifs",
      benefit: "Support premium"
    },
    {
      icon: Brain,
      title: "Expertise Multilingue",
      description: "Support en anglais, français et arabe pour entrepreneurs internationaux",
      benefit: "Accessibilité mondiale"
    },
    {
      icon: Globe,
      title: "Service International",
      description: "Déclaration fiscale annuelle incluse avec support expert direct",
      benefit: "Conformité totale"
    },
    {
      icon: Clock,
      title: "Suivi en Temps Réel",
      description: "Dashboard en ligne avec progression et alertes automatiques",
      benefit: "Transparence totale"
    },
    {
      icon: Star,
      title: "Prix Transparent",
      description: "Coûts réels + profit fixe, aucun frais caché, modèle partenariat",
      benefit: "Prix équitable"
    }
  ]

  const benefits = [
    "Évite les pénalités IRS de $25,000+",
    "Support personnel WhatsApp 24/7",
    "Déclaration fiscale annuelle incluse",
    "Surveillance automatique de conformité",
    "Prix transparent et équitable",
    "Accès à l'écosystème américain"
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-4 bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-4 h-4 mr-2" />
            Solution ProsperaLink
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            La révolution de la conformité américaine
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ProsperaLink est le seul service de formation qui inclut votre déclaration fiscale annuelle 
            avec un support expert personnel via WhatsApp. Nous gérons tout, vous avez la conformité totale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-green-100 hover:border-green-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <solution.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{solution.title}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      {solution.benefit}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
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
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
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
                <div className="text-3xl font-bold text-green-600 mb-2">12h</div>
                <div className="text-gray-600">Formation moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
                <div className="text-gray-600">Frais cachés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">Support WhatsApp</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Conformité garantie</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 