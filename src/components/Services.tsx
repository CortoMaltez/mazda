'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  FileText, 
  Shield, 
  Users, 
  Globe, 
  Zap, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react'

export function Services() {
  const services = [
    {
      icon: Building2,
      title: "Formation LLC",
      description: "Création complète de votre entreprise en 12h",
      features: ["Agent agréé inclus", "EIN automatique", "Conformité garantie"],
      price: "À partir de $299/an",
      badge: "Populaire",
      color: "blue"
    },
    {
      icon: FileText,
      title: "Services comptables",
      description: "Comptabilité complète et déclarations fiscales",
      features: ["Comptabilité mensuelle", "Déclarations IRS", "Support dédié"],
      price: "À partir de $200/mois",
      badge: "Recommandé",
      color: "green"
    },
    {
      icon: Shield,
      title: "Conformité automatique",
      description: "Surveillance et gestion des obligations légales",
      features: ["Rapports annuels", "Form 5472", "Alertes automatiques"],
      price: "À partir de $150/an",
      badge: "Essentiel",
      color: "purple"
    },
    {
      icon: Users,
      title: "Support IA Premium",
      description: "Assistance intelligente 24/7 avec Gemini",
      features: ["Chat IA avancé", "Réponses instantanées", "Support multilingue"],
      price: "À partir de $100/mois",
      badge: "Innovant",
      color: "orange"
    },
    {
      icon: Globe,
      title: "Services bancaires",
      description: "Ouverture de comptes d'entreprise américains",
      features: ["Compte bancaire", "Carte de crédit", "Services de paiement"],
      price: "À partir de $100",
      badge: "Exclusif",
      color: "indigo"
    },
    {
      icon: Zap,
      title: "Accélération VIP",
      description: "Service prioritaire et accompagnement dédié",
      features: ["Formation en 6h", "Conciergerie", "Support direct"],
      price: "À partir de $500",
      badge: "Premium",
      color: "red"
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-200 bg-blue-50 hover:border-blue-300'
      case 'green': return 'border-green-200 bg-green-50 hover:border-green-300'
      case 'purple': return 'border-purple-200 bg-purple-50 hover:border-purple-300'
      case 'orange': return 'border-orange-200 bg-orange-50 hover:border-orange-300'
      case 'indigo': return 'border-indigo-200 bg-indigo-50 hover:border-indigo-300'
      case 'red': return 'border-red-200 bg-red-50 hover:border-red-300'
      default: return 'border-gray-200 bg-gray-50 hover:border-gray-300'
    }
  }

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800'
      case 'green': return 'bg-green-100 text-green-800'
      case 'purple': return 'bg-purple-100 text-purple-800'
      case 'orange': return 'bg-orange-100 text-orange-800'
      case 'indigo': return 'bg-indigo-100 text-indigo-800'
      case 'red': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            <Zap className="w-4 h-4 mr-2" />
            Nos services
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Solutions complètes pour votre entreprise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De la formation initiale à la gestion quotidienne, nous couvrons 
            tous vos besoins pour réussir aux États-Unis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-300 ${getColorClasses(service.color)}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <service.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <Badge className={getBadgeColor(service.color)}>
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mt-4">
                  {service.title}
                </CardTitle>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    {service.price}
                  </span>
                  <Button size="sm" variant="outline" className="group-hover:bg-gray-900 group-hover:text-white">
                    Détails
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Prêt à lancer votre entreprise américaine ?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Rejoignez des centaines d'entrepreneurs qui ont déjà réussi avec ProsperaLink
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Parler à un expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 