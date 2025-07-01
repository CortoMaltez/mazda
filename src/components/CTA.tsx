'use client';

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Shield,
  Zap,
  Star
} from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  const benefits = [
    "Formation en 12h maximum",
    "Conformité automatique incluse",
    "Support IA 24/7",
    "Prix transparent",
    "Garantie de satisfaction"
  ]

  const stats = [
    {
      number: "2,500+",
      label: "Entreprises créées",
      icon: Star
    },
    {
      number: "12h",
      label: "Formation moyenne",
      icon: Clock
    },
    {
      number: "4.9/5",
      label: "Note moyenne",
      icon: Star
    },
    {
      number: "50+",
      label: "Pays servis",
      icon: Shield
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-16">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            <Zap className="w-4 h-4 mr-2" />
            Commencer maintenant
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Prêt à créer votre entreprise aux États-Unis ?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Rejoignez des milliers d'entrepreneurs qui ont choisi ProsperaLink 
            pour leur formation LLC. Commencez en 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-6">
              Pourquoi choisir ProsperaLink ?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="opacity-90">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <h4 className="text-xl font-semibold text-white mb-6 text-center">
                Nos résultats
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Commencez en 5 minutes
            </h3>
            <p className="text-white/90 mb-6">
              Notre processus intelligent vous guide étape par étape. 
              Aucune connaissance préalable requise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Créer mon LLC
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Calculer le prix
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 