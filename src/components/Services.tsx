'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  FileText, 
  Shield, 
  Brain, 
  Globe, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  DollarSign,
  Users,
  Zap,
  Star
} from 'lucide-react'
import Link from 'next/link'

export function Services() {
  const services = [
    {
      icon: Building2,
      title: "Formation LLC Directe",
      description: "Création immédiate avec tous les documents légaux requis",
      features: [
        "Articles d'organisation",
        "Accord d'exploitation",
        "Certificat de formation",
        "Agent agréé inclus"
      ],
      price: "À partir de $299",
      popular: true
    },
    {
      icon: FileText,
      title: "EIN & Comptabilité",
      description: "Numéro d'employeur fédéral et services comptables complets",
      features: [
        "EIN automatique",
        "Comptabilité mensuelle",
        "Déclarations fiscales",
        "Rapports financiers"
      ],
      price: "À partir de $199",
      popular: false
    },
    {
      icon: Shield,
      title: "Conformité Automatique",
      description: "Surveillance proactive de toutes les obligations légales",
      features: [
        "Surveillance continue",
        "Alertes automatiques",
        "Renouvellements",
        "Support conformité"
      ],
      price: "À partir de $149",
      popular: false
    },
    {
      icon: Brain,
      title: "Support IA Premium",
      description: "Assistant IA intelligent 24/7 pour toutes vos questions",
      features: [
        "Support multilingue",
        "Réponses instantanées",
        "Conseils personnalisés",
        "Historique complet"
      ],
      price: "À partir de $99",
      popular: false
    },
    {
      icon: Globe,
      title: "Services Internationaux",
      description: "Support spécialisé pour entrepreneurs internationaux",
      features: [
        "Traduction automatique",
        "Support culturel",
        "Conseils juridiques",
        "Accompagnement complet"
      ],
      price: "À partir de $199",
      popular: false
    },
    {
      icon: Clock,
      title: "Formation Express",
      description: "Formation LLC en 12h avec processus automatisé",
      features: [
        "Processus automatisé",
        "Suivi en temps réel",
        "Documents instantanés",
        "Support prioritaire"
      ],
      price: "À partir de $499",
      popular: true
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Star className="w-4 h-4 mr-2" />
            Services
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Solutions complètes pour votre entreprise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De la formation initiale à la gestion continue, nous couvrons tous 
            vos besoins pour une entreprise LLC prospère aux États-Unis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`relative ${service.popular ? 'border-blue-200 shadow-lg' : 'hover:shadow-md'} transition-all duration-300`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Populaire
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-4">{service.price}</div>
                  <Link href="/auth/signup">
                    <Button 
                      className={`w-full ${service.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                    >
                      Commencer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi choisir nos services ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Rapidité</div>
                <div className="text-sm text-gray-600">Formation en 12h</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Sécurité</div>
                <div className="text-sm text-gray-600">Conformité garantie</div>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Intelligence</div>
                <div className="text-sm text-gray-600">Support IA 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 