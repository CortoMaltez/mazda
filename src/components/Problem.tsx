'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Clock, DollarSign, FileText, Globe, Users, XCircle } from 'lucide-react'

export function Problem() {
  const problems = [
    {
      icon: Clock,
      title: "Délais interminables",
      description: "6-8 semaines pour une formation LLC, perte de temps précieux",
      impact: "Retard de lancement"
    },
    {
      icon: DollarSign,
      title: "Coûts cachés",
      description: "Frais supplémentaires non annoncés, factures surprises",
      impact: "Budget dépassé"
    },
    {
      icon: FileText,
      title: "Complexité administrative",
      description: "Formulaires complexes, jargon juridique incompréhensible",
      impact: "Erreurs coûteuses"
    },
    {
      icon: Users,
      title: "Support inexistant",
      description: "Pas d'assistance, réponses tardives, frustration",
      impact: "Problèmes non résolus"
    },
    {
      icon: Globe,
      title: "Barrière linguistique",
      description: "Difficultés avec l'anglais juridique et les procédures",
      impact: "Incompréhension"
    },
    {
      icon: AlertTriangle,
      title: "Risques de non-conformité",
      description: "Pénalités IRS de $25,000+ pour Form 5472 manqué",
      impact: "Sanctions financières"
    }
  ]

  return (
    <section id="problem" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="destructive" className="mb-4">
            <XCircle className="w-4 h-4 mr-2" />
            Problèmes actuels
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Les entrepreneurs internationaux souffrent
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Formation d'entreprise aux États-Unis : un cauchemar administratif 
            qui coûte temps, argent et opportunités d'affaires.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-red-100 hover:border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <problem.icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {problem.description}
                    </p>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {problem.impact}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">6-8</div>
              <div className="text-gray-600">Semaines de délai</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">$25K+</div>
              <div className="text-gray-600">Pénalités IRS</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">5-7</div>
              <div className="text-gray-600">Fournisseurs différents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">40%</div>
              <div className="text-gray-600">Abandon du projet</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            <strong>Résultat :</strong> Les entrepreneurs abandonnent ou perdent des opportunités d'affaires
          </p>
          <div className="inline-flex items-center space-x-2 text-red-600 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            <span>Il faut une solution radicale</span>
          </div>
        </div>
      </div>
    </section>
  )
} 