'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Calculator, 
  DollarSign, 
  Building2, 
  Shield, 
  Users, 
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  Info
} from 'lucide-react'

export function PriceCalculator() {
  const [selectedState, setSelectedState] = useState('Wyoming')
  const [selectedServices, setSelectedServices] = useState<string[]>(['llc-formation'])
  const [showBreakdown, setShowBreakdown] = useState(false)

  const states = [
    { name: 'Wyoming', tier: 'ESSENTIAL', annualPrice: 299 },
    { name: 'Delaware', tier: 'ESSENTIAL', annualPrice: 399 },
    { name: 'Nevada', tier: 'GROWTH', annualPrice: 499 },
    { name: 'Florida', tier: 'GROWTH', annualPrice: 599 },
    { name: 'Texas', tier: 'PREMIUM', annualPrice: 799 },
    { name: 'California', tier: 'PREMIUM', annualPrice: 999 }
  ]

  const services = [
    {
      id: 'llc-formation',
      name: 'Formation LLC',
      description: 'Création complète de votre entreprise',
      price: 0,
      included: true
    },
    {
      id: 'ein-acquisition',
      name: 'EIN Acquisition',
      description: 'Numéro d\'employeur fédéral',
      price: 50,
      included: false
    },
    {
      id: 'bank-account',
      name: 'Compte bancaire',
      description: 'Ouverture de compte d\'entreprise',
      price: 100,
      included: false
    },
    {
      id: 'accounting',
      name: 'Services comptables',
      description: 'Comptabilité mensuelle',
      price: 200,
      included: false
    },
    {
      id: 'compliance',
      name: 'Conformité automatique',
      description: 'Surveillance des obligations',
      price: 150,
      included: false
    },
    {
      id: 'ai-support',
      name: 'Support IA Premium',
      description: 'Assistance IA 24/7 avancée',
      price: 100,
      included: false
    }
  ]

  const getStateTier = (stateName: string) => {
    const state = states.find(s => s.name === stateName)
    return state?.tier || 'ESSENTIAL'
  }

  const getStatePrice = (stateName: string) => {
    const state = states.find(s => s.name === stateName)
    return state?.annualPrice || 299
  }

  const calculateTotal = () => {
    const basePrice = getStatePrice(selectedState)
    const additionalServices = selectedServices
      .filter(serviceId => serviceId !== 'llc-formation')
      .map(serviceId => {
        const service = services.find(s => s.id === serviceId)
        return service?.price || 0
      })
      .reduce((sum, price) => sum + price, 0)
    
    return basePrice + additionalServices
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'ESSENTIAL': return 'bg-green-100 text-green-800'
      case 'GROWTH': return 'bg-blue-100 text-blue-800'
      case 'PREMIUM': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const total = calculateTotal()

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            <Calculator className="w-4 h-4 mr-2" />
            Calculateur de prix
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Calculez votre prix en temps réel
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prix transparents basés sur les coûts réels de votre état. 
            Aucun frais caché, juste les coûts réels + $500 de profit fixe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* State Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  État de formation
                </label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.name} value={state.name}>
                        <div className="flex items-center justify-between w-full">
                          <span>{state.name}</span>
                          <Badge className={getTierColor(state.tier)}>
                            {state.tier}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Prix de base : ${getStatePrice(selectedState)}/an
                </p>
              </div>

              {/* Services Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Services additionnels
                </label>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                        disabled={service.included}
                      />
                      <div className="flex-1">
                        <label 
                          htmlFor={service.id}
                          className="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          {service.name}
                          {service.included && (
                            <Badge className="ml-2 bg-green-100 text-green-800">
                              Inclus
                            </Badge>
                          )}
                        </label>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        {!service.included && (
                          <p className="text-sm text-blue-600 font-medium">
                            +${service.price}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breakdown Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full"
              >
                <Info className="w-4 h-4 mr-2" />
                {showBreakdown ? 'Masquer' : 'Voir'} le détail des coûts
              </Button>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Récapitulatif</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* State Info */}
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{selectedState}</span>
                  <Badge className={getTierColor(getStateTier(selectedState))}>
                    {getStateTier(selectedState)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Formation LLC + Agent agréé + Conformité
                </p>
              </div>

              {/* Selected Services */}
              <div>
                <h4 className="font-medium mb-3">Services sélectionnés :</h4>
                <div className="space-y-2">
                  {selectedServices.map((serviceId) => {
                    const service = services.find(s => s.id === serviceId)
                    if (!service) return null
                    
                    return (
                      <div key={serviceId} className="flex items-center justify-between text-sm">
                        <span className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{service.name}</span>
                        </span>
                        <span className="font-medium">
                          {service.included ? 'Inclus' : `$${service.price}`}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Cost Breakdown */}
              {showBreakdown && (
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Détail des coûts :</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Agent agréé :</span>
                      <span>$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rapport annuel :</span>
                      <span>$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais IRS :</span>
                      <span>$50</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Coûts totaux :</span>
                      <span>$250</span>
                    </div>
                    <div className="flex justify-between font-bold text-blue-600">
                      <span>Profit fixe :</span>
                      <span>$500</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-sm opacity-90">Prix total annuel</p>
                  <p className="text-4xl font-bold">${total}</p>
                  <p className="text-sm opacity-90 mt-2">
                    ou ${Math.round(total / 12)}/mois
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Commencer maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="w-full">
                  Comparer les états
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Garantie 30j</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Formation en 12h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 