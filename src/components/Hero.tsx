'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Star, 
  Clock, 
  Globe, 
  Shield, 
  Zap, 
  ArrowRight, 
  Play,
  Building2,
  Users,
  TrendingUp,
  Calculator,
  Brain
} from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              Compliance Shield
            </Badge>
            <span className="text-sm text-blue-700">Formation en 12h avec support personnel</span>
          </div>

          {/* Main Heading - Big Promise */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            U.S. Compliance,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Solved. For Good.
            </span>
          </h1>

          {/* Subtitle - Sharp, Efficient Partner Voice */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            ProsperaLink est le seul service de formation qui inclut votre déclaration fiscale annuelle 
            avec un support expert personnel via WhatsApp. 
            <span className="font-semibold text-blue-600"> Nous gérons tout, vous avez la conformité totale et la tranquillité d'esprit.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard/calculator">
              <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg font-semibold">
                <Calculator className="w-5 h-5 mr-2" />
                Calculer le vrai coût
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Personal, Transparent, Reliable */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 mb-12">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Support personnel WhatsApp 24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Prix transparent, aucun frais caché</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Protection contre les pénalités IRS</span>
            </div>
          </div>
        </div>

        {/* Feature Cards - Core Values in Action */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Formation en 12h</h3>
              <p className="text-gray-600">De la demande à la création complète avec suivi en temps réel</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Expert Personnel</h3>
              <p className="text-gray-600">Un point de contact unique qui connaît votre histoire et vos objectifs</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Multilingue</h3>
              <p className="text-gray-600">Support en anglais, français et arabe pour entrepreneurs internationaux</p>
            </CardContent>
          </Card>
        </div>

        {/* Video Preview */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600 mb-4">
            <Play className="w-5 h-5" />
            <span>Voir comment nous simplifions la conformité</span>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-lg font-semibold text-gray-700">Démonstration en ligne</p>
                <p className="text-gray-500">Découvrez notre processus simple et notre support personnel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 