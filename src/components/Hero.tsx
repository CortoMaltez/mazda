'use client'

import React from 'react';
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

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Titre principal - La promesse de sérénité */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Votre LLC Américaine.
            <span className="block text-blue-600 mt-2">Sans la Complexité.</span>
          </h1>
          
          {/* Sous-titre - La liberté cognitive */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Concentrez-vous sur votre vision. Nous gérons tout le reste : 
            formation, conformité, fiscalité. Un prix. Pour toujours.
          </p>
          
          {/* Valeur centrale */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-900">997$</p>
                <p className="text-gray-600">par an, tout inclus</p>
              </div>
              <div className="w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">0$</p>
                <p className="text-gray-600">de frais cachés</p>
              </div>
              <div className="w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-600">∞</p>
                <p className="text-gray-600">tranquillité d'esprit</p>
              </div>
            </div>
          </div>
          
          {/* CTA principal avec IA */}
          <div className="space-y-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
              Commencez Maintenant →
            </button>
            <p className="text-gray-500">
              Ou discutez avec notre IA multilingue 24/7
            </p>
          </div>
        </div>
      </div>
      
      {/* Animation subtile de sérénité */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
    </section>
  );
}; 