'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Building2, 
  DollarSign, 
  Shield, 
  Clock, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Info,
  Star
} from 'lucide-react'

export function StateComparison() {
  const [selectedStates, setSelectedStates] = useState(['Wyoming', 'Delaware', 'Nevada'])

  const states = [
    {
      name: 'Wyoming',
      tier: 'ESSENTIAL',
      annualPrice: 299,
      formationTime: '12h',
      taxAdvantages: ['Aucun impôt sur le revenu', 'Aucun impôt sur les sociétés', 'Confidentialité maximale'],
      disadvantages: ['Moins de reconnaissance internationale'],
      bestFor: 'Entrepreneurs internationaux, Confidentialité',
      rating: 4.8,
      features: {
        noIncomeTax: true,
        noCorporateTax: true,
        privacy: true,
        assetProtection: true,
        internationalRecognition: false
      }
    },
    {
      name: 'Delaware',
      tier: 'ESSENTIAL',
      annualPrice: 399,
      formationTime: '24h',
      taxAdvantages: ['Cour de chancellerie spécialisée', 'Reconnaissance internationale', 'Flexibilité juridique'],
      disadvantages: ['Franchise tax annuelle', 'Coûts plus élevés'],
      bestFor: 'Startups, Investisseurs, Reconnaissance internationale',
      rating: 4.9,
      features: {
        noIncomeTax: true,
        noCorporateTax: true,
        privacy: true,
        assetProtection: true,
        internationalRecognition: true
      }
    },
    {
      name: 'Nevada',
      tier: 'GROWTH',
      annualPrice: 499,
      formationTime: '24h',
      taxAdvantages: ['Aucun impôt sur le revenu', 'Protection des actifs', 'Flexibilité opérationnelle'],
      disadvantages: ['Franchise tax', 'Moins de reconnaissance que Delaware'],
      bestFor: 'Protection d\'actifs, Entrepreneurs', 
      rating: 4.7,
      features: {
        noIncomeTax: true,
        noCorporateTax: true,
        privacy: true,
        assetProtection: true,
        internationalRecognition: false
      }
    }
  ]

  const comparisonCriteria = [
    { key: 'annualPrice', label: 'Prix annuel', format: 'currency' },
    { key: 'formationTime', label: 'Temps de formation', format: 'text' },
    { key: 'rating', label: 'Note globale', format: 'rating' },
    { key: 'noIncomeTax', label: 'Pas d\'impôt sur le revenu', format: 'boolean' },
    { key: 'noCorporateTax', label: 'Pas d\'impôt sur les sociétés', format: 'boolean' },
    { key: 'privacy', label: 'Confidentialité', format: 'boolean' },
    { key: 'assetProtection', label: 'Protection d\'actifs', format: 'boolean' },
    { key: 'internationalRecognition', label: 'Reconnaissance internationale', format: 'boolean' }
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'ESSENTIAL': return 'bg-green-100 text-green-800'
      case 'GROWTH': return 'bg-blue-100 text-blue-800'
      case 'PREMIUM': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatValue = (value: any, format: string) => {
    switch (format) {
      case 'currency':
        return `$${value}`
      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            <span>{value}</span>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        )
      case 'boolean':
        return value ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )
      default:
        return value
    }
  }

  const selectedStateData = states.filter(state => selectedStates.includes(state.name))

  return (
    <section id="comparison" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800">
            <TrendingUp className="w-4 h-4 mr-2" />
            Comparaison des états
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez le meilleur état pour votre entreprise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comparez les avantages fiscaux, les coûts et les caractéristiques 
            de chaque état pour faire le bon choix.
          </p>
        </div>

        {/* State Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Sélectionnez les états à comparer
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {states.map((state) => (
              <button
                key={state.name}
                onClick={() => {
                  if (selectedStates.includes(state.name)) {
                    setSelectedStates(prev => prev.filter(s => s !== state.name))
                  } else if (selectedStates.length < 4) {
                    setSelectedStates(prev => [...prev, state.name])
                  }
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedStates.includes(state.name)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{state.name}</div>
                  <Badge className={`mt-2 ${getTierColor(state.tier)}`}>
                    {state.tier}
                  </Badge>
                  <div className="text-sm text-gray-600 mt-1">
                    ${state.annualPrice}/an
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedStateData.length > 0 && (
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Comparaison détaillée</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Critères</TableHead>
                        {selectedStateData.map((state) => (
                          <TableHead key={state.name} className="text-center">
                            <div className="font-semibold">{state.name}</div>
                            <Badge className={`mt-1 ${getTierColor(state.tier)}`}>
                              {state.tier}
                            </Badge>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comparisonCriteria.map((criteria) => (
                        <TableRow key={criteria.key}>
                          <TableCell className="font-medium">
                            {criteria.label}
                          </TableCell>
                          {selectedStateData.map((state) => (
                            <TableCell key={state.name} className="text-center">
                              {formatValue(state[criteria.key as keyof typeof state], criteria.format)}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* State Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedStateData.map((state) => (
            <Card key={state.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{state.name}</CardTitle>
                  <Badge className={getTierColor(state.tier)}>
                    {state.tier}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-blue-600">
                    ${state.annualPrice}
                  </div>
                  <div className="text-sm text-gray-600">/an</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(state.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{state.rating}/5</span>
                </div>

                {/* Advantages */}
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Avantages :</h4>
                  <ul className="space-y-1">
                    {state.taxAdvantages.map((advantage, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages */}
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Inconvénients :</h4>
                  <ul className="space-y-1">
                    {state.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span>{disadvantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Idéal pour :</h4>
                  <p className="text-sm text-gray-600">{state.bestFor}</p>
                </div>

                {/* CTA */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Choisir {state.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendation */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Recommandation personnalisée
              </h3>
              <p className="text-gray-600 mb-6">
                Notre IA analyse votre situation et vous recommande l'état optimal 
                pour votre entreprise. Obtenez une recommandation personnalisée en 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Obtenir une recommandation IA
                </Button>
                <Button variant="outline">
                  Consulter un expert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 