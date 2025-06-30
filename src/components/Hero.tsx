'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Formez votre entreprise LLC en toute simplicité
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            ProsperaLink vous accompagne dans la création de votre entreprise aux États-Unis. 
            Processus 100% en ligne, support expert et garantie de satisfaction.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Commencer maintenant
              </Button>
            </Link>
            <Link href="/dashboard/calculator">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                Calculer les prix
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200 mb-2">500+</div>
              <div className="text-blue-100">Entreprises formées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200 mb-2">24h</div>
              <div className="text-blue-100">Délai de traitement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200 mb-2">99%</div>
              <div className="text-blue-100">Taux de satisfaction</div>
            </div>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className="mt-20 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-2xl"></div>
            <div className="relative rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                  <h3 className="font-semibold text-gray-900">LLC Formation</h3>
                  <p className="mt-2 text-sm text-gray-600">Création rapide et sécurisée</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                  <h3 className="font-semibold text-gray-900">Banking</h3>
                  <p className="mt-2 text-sm text-gray-600">Compte bancaire américain</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 p-6">
                  <h3 className="font-semibold text-gray-900">Compliance</h3>
                  <p className="mt-2 text-sm text-gray-600">Gestion automatisée</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
} 