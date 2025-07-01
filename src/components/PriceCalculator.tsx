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
                          <p className="text-sm font-medium text-gray-900">
                            +${service.price}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Résumé des coûts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* State Price */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">Formation LLC - {selectedState}</div>
                  <div className="text-sm text-gray-600">Prix de base annuel</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">${getStatePrice(selectedState)}</div>
                  <div className="text-sm text-gray-600">/an</div>
                </div>
              </div>

              {/* Additional Services */}
              {selectedServices.filter(id => id !== 'llc-formation').length > 0 && (
                <div className="space-y-3">
                  <div className="font-medium text-gray-900">Services additionnels</div>
                  {selectedServices
                    .filter(serviceId => serviceId !== 'llc-formation')
                    .map(serviceId => {
                      const service = services.find(s => s.id === serviceId)
                      return service ? (
                        <div key={serviceId} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{service.name}</span>
                          <span className="text-sm font-medium text-gray-900">+${service.price}</span>
                        </div>
                      ) : null
                    })}
                </div>
              )}

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-900">Total annuel</div>
                  <div className="text-2xl font-bold text-blue-600">${total}</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Coûts réels + profit fixe de $500
                </div>
              </div>

              {/* Breakdown Toggle */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full"
                >
                  <Info className="w-4 h-4 mr-2" />
                  {showBreakdown ? 'Masquer' : 'Voir'} le détail des coûts
                </Button>
              </div>

              {/* Cost Breakdown */}
              {showBreakdown && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="font-medium text-gray-900">Détail des coûts</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Coûts réels de l'état</span>
                      <span>${getStatePrice(selectedState) - 500}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit fixe ProsperaLink</span>
                      <span>$500</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${getStatePrice(selectedState)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="text-center">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Aucun engagement, annulation à tout moment
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 