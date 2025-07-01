'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote, Globe, Building2, Clock, Shield } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Entrepreneuse Tech",
      country: "France",
      company: "TechInnovate",
      rating: 5,
      content: "ProsperaLink a transformé mon expérience. Formation en 12h, support IA exceptionnel. Mon LLC est maintenant opérationnel et je peux me concentrer sur mon business.",
      avatar: "MD",
      highlight: "Formation en 12h"
    },
    {
      name: "Carlos Rodriguez",
      role: "CEO E-commerce",
      country: "Espagne",
      company: "DigitalStore",
      rating: 5,
      content: "Service incroyable ! L'assistant IA m'a aidé à comprendre tous les aspects légaux. Conformité automatique, aucun stress. Recommandé à 100%.",
      avatar: "CR",
      highlight: "Support IA 24/7"
    },
    {
      name: "Anna Kowalski",
      role: "Consultante Marketing",
      country: "Pologne",
      company: "MarketingPro",
      rating: 5,
      content: "Après avoir essayé d'autres services, ProsperaLink est de loin le meilleur. Transparence totale des coûts, processus simple, résultats rapides.",
      avatar: "AK",
      highlight: "Transparence totale"
    },
    {
      name: "Ahmed Hassan",
      role: "Investisseur Immobilier",
      country: "Émirats Arabes Unis",
      company: "RealEstate UAE",
      rating: 5,
      content: "Excellent service pour entrepreneurs internationaux. Support multilingue, conseils personnalisés. Mon LLC est maintenant actif et je peux investir aux USA.",
      avatar: "AH",
      highlight: "Support international"
    },
    {
      name: "Sophie Müller",
      role: "Fondatrice SaaS",
      country: "Allemagne",
      company: "CloudSoft",
      rating: 5,
      content: "ProsperaLink a dépassé toutes mes attentes. Formation rapide, documents parfaits, conformité garantie. Je recommande à tous les entrepreneurs européens.",
      avatar: "SM",
      highlight: "Conformité garantie"
    },
    {
      name: "Lucas Silva",
      role: "Directeur Financier",
      country: "Brésil",
      company: "FinanceBR",
      rating: 5,
      content: "Service exceptionnel ! L'équipe a répondu à toutes mes questions en portugais. Processus transparent, coûts clairs, résultats excellents.",
      avatar: "LS",
      highlight: "Support multilingue"
    }
  ]

  const stats = [
    {
      icon: Building2,
      number: "2,500+",
      label: "Entreprises créées",
      color: "blue"
    },
    {
      icon: Clock,
      number: "12h",
      label: "Formation moyenne",
      color: "green"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Note moyenne",
      color: "yellow"
    },
    {
      icon: Globe,
      number: "50+",
      label: "Pays servis",
      color: "purple"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Star className="w-4 h-4 mr-2" />
            Témoignages Clients
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi des entrepreneurs du monde entier choisissent 
            ProsperaLink pour créer leur entreprise aux États-Unis.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="mb-4">
                  <Quote className="w-6 h-6 text-gray-300 mb-2" />
                  <p className="text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{testimonial.country}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.highlight}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pourquoi nos clients nous font confiance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Sécurité</div>
                <div className="text-sm text-gray-600">Conformité garantie</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Rapidité</div>
                <div className="text-sm text-gray-600">Formation en 12h</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Excellence</div>
                <div className="text-sm text-gray-600">98% satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 