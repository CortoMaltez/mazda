'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  Globe, 
  Building2, 
  DollarSign, 
  Shield,
  CheckCircle,
  Zap
} from 'lucide-react'

export function Stats() {
  const mainStats = [
    {
      icon: Building2,
      number: "2,500+",
      label: "Entreprises créées",
      description: "LLC formées avec succès",
      color: "blue"
    },
    {
      icon: Clock,
      number: "12h",
      label: "Temps moyen",
      description: "De la demande à la création",
      color: "green"
    },
    {
      icon: Star,
      number: "98%",
      label: "Satisfaction client",
      description: "Clients très satisfaits",
      color: "yellow"
    },
    {
      icon: Globe,
      number: "50+",
      label: "Pays servis",
      description: "Entrepreneurs internationaux",
      color: "purple"
    }
  ]

  const performanceStats = [
    {
      title: "Économies réalisées",
      value: "$2.5M+",
      description: "Économies totales pour nos clients",
      trend: "+45%",
      trendUp: true
    },
    {
      title: "Temps économisé",
      value: "15,000h+",
      description: "Heures économisées par nos clients",
      trend: "+60%",
      trendUp: true
    },
    {
      title: "Taux de réussite",
      value: "99.8%",
      description: "Formations approuvées du premier coup",
      trend: "+2%",
      trendUp: true
    },
    {
      title: "Support IA",
      value: "24/7",
      description: "Assistance intelligente disponible",
      trend: "100%",
      trendUp: true
    }
  ]

  const clientResults = [
    {
      category: "Délai de formation",
      before: "6-8 semaines",
      after: "12h",
      improvement: "99% plus rapide"
    },
    {
      category: "Coût moyen",
      before: "$500-2000",
      after: "$99-299",
      improvement: "70% moins cher"
    },
    {
      category: "Support disponible",
      before: "Limité",
      after: "IA 24/7",
      improvement: "Infini"
    },
    {
      category: "Complexité",
      before: "Très complexe",
      after: "Ultra-simple",
      improvement: "100% simplifié"
    }
  ]

  return (
    <section id="stats" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            <TrendingUp className="w-4 h-4 mr-2" />
            Résultats impressionnants
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            ProsperaLink en chiffres
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez l'impact réel de notre plateforme sur la réussite 
            des entrepreneurs internationaux.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-300">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {performanceStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                  <Badge variant="outline" className={stat.trendUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {stat.trend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Before/After Comparison */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Avant vs Après ProsperaLink
            </h3>
            <p className="text-gray-300">
              Voyez la différence que fait notre plateforme
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientResults.map((result, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold mb-4">{result.category}</h4>
                <div className="space-y-2">
                  <div className="bg-red-500/20 p-3 rounded-lg">
                    <div className="text-sm text-gray-300">Avant</div>
                    <div className="font-semibold text-red-300">{result.before}</div>
                  </div>
                  <div className="text-2xl">→</div>
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <div className="text-sm text-gray-300">Après</div>
                    <div className="font-semibold text-green-300">{result.after}</div>
                  </div>
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <div className="text-xs font-semibold text-blue-300">
                      {result.improvement}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-300 mb-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Conformité garantie</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span>Formation en 12h</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-purple-400" />
              <span>Support IA 24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span>Prix transparents</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold mb-2">
              Rejoignez nos clients satisfaits
            </h4>
            <p className="text-gray-300 mb-4">
              Commencez votre aventure entrepreneuriale avec la confiance 
              de milliers d'entrepreneurs qui nous font confiance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                4.9/5 - 2,500+ avis
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                98% de satisfaction
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 