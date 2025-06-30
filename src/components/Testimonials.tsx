'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote, MapPin, Building2 } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Fondatrice, TechStart France",
      location: "Paris, France",
      company: "SaaS Tech",
      rating: 5,
      content: "ProsperaLink a transformé notre expansion aux États-Unis. En 12h, nous avions notre LLC et tous les documents. L'équipe est exceptionnelle !",
      avatar: "MD",
      verified: true
    },
    {
      name: "Carlos Rodriguez",
      role: "CEO, InnovateLab",
      location: "Madrid, Espagne",
      company: "E-commerce",
      rating: 5,
      content: "Processus incroyablement simple. L'IA répond à toutes mes questions instantanément. Je recommande à tous les entrepreneurs européens.",
      avatar: "CR",
      verified: true
    },
    {
      name: "Sarah Johnson",
      role: "Directrice, Global Solutions",
      location: "Londres, UK",
      company: "Consulting",
      rating: 5,
      content: "Prix transparents, service impeccable. Nous avons économisé des milliers de dollars et des semaines de paperasse.",
      avatar: "SJ",
      verified: true
    },
    {
      name: "Ahmed Hassan",
      role: "Fondateur, MiddleEast Tech",
      location: "Dubai, UAE",
      company: "Fintech",
      rating: 5,
      content: "Support multilingue parfait. L'équipe comprend les défis des entrepreneurs internationaux. Service premium !",
      avatar: "AH",
      verified: true
    },
    {
      name: "Lisa Chen",
      role: "CEO, AsiaConnect",
      location: "Singapour",
      company: "Logistics",
      rating: 5,
      content: "Formation en 12h, conformité garantie. ProsperaLink nous a permis de nous concentrer sur notre business, pas sur l'administratif.",
      avatar: "LC",
      verified: true
    },
    {
      name: "Pierre Moreau",
      role: "Fondateur, FrenchInnovation",
      location: "Lyon, France",
      company: "AI/ML",
      rating: 5,
      content: "L'IA intégrée est révolutionnaire. Réponses instantanées, conseils personnalisés. Un vrai game-changer !",
      avatar: "PM",
      verified: true
    }
  ]

  const stats = [
    {
      number: "2,500+",
      label: "Entreprises créées",
      icon: Building2
    },
    {
      number: "98%",
      label: "Satisfaction client",
      icon: Star
    },
    {
      number: "12h",
      label: "Temps moyen de formation",
      icon: Quote
    },
    {
      number: "50+",
      label: "Pays servis",
      icon: MapPin
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            <Star className="w-4 h-4 mr-2" />
            Témoignages clients
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi des milliers d'entrepreneurs internationaux 
            choisissent ProsperaLink pour leur expansion aux États-Unis.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-200">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  {testimonial.verified && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Vérifié
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>{testimonial.company}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Rejoignez nos clients satisfaits
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Commencez votre aventure entrepreneuriale aux États-Unis avec 
            la confiance de milliers d'entrepreneurs qui nous font confiance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              4.9/5 - 2,500+ avis
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
              <Quote className="w-4 h-4 mr-2" />
              98% de satisfaction
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
} 