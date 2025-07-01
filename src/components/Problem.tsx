'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Clock, DollarSign, FileText, Globe, Users, XCircle, Shield } from 'lucide-react'

export function Problem() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Pénalités IRS dévastatrices",
      description: "Pénalités de $25,000+ pour Form 5472 manqué, erreurs coûteuses par ignorance",
      impact: "Risque financier majeur"
    },
    {
      icon: DollarSign,
      title: "Coûts cachés et surprises",
      description: "Frais supplémentaires non annoncés, factures surprises pour services essentiels",
      impact: "Budget dépassé"
    },
    {
      icon: FileText,
      title: "Complexité administrative écrasante",
      description: "Formulaires complexes, jargon juridique incompréhensible, barrière linguistique",
      impact: "Erreurs coûteuses"
    },
    {
      icon: Users,
      title: "Support inexistant ou robotique",
      description: "Pas d'assistance réelle, réponses tardives, sentiment d'abandon",
      impact: "Problèmes non résolus"
    },
    {
      icon: Globe,
      title: "Barrière linguistique et culturelle",
      description: "Difficultés avec l'anglais juridique, incompréhension des procédures américaines",
      impact: "Incompréhension totale"
    },
    {
      icon: Shield,
      title: "Risques de non-conformité",
      description: "Surveillance continue manquée, renouvellements oubliés, obligations ignorées",
      impact: "Sanctions et fermeture"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="destructive" className="mb-4">
            <XCircle className="w-4 h-4 mr-2" />
            Les défis réels
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi les entrepreneurs internationaux souffrent
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Formation d'entreprise aux États-Unis : un parcours semé d'embûches, 
            de coûts cachés et de complexité administrative qui paralyse l'ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="border-red-100 hover:border-red-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <problem.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
                    <Badge variant="destructive" className="text-xs">
                      {problem.impact}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-red-800 mb-4">
              Le coût réel de ces problèmes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">$25,000+</div>
                <div className="text-gray-600">Pénalités IRS moyennes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">8 semaines</div>
                <div className="text-gray-600">Délai de formation moyen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">40%</div>
                <div className="text-gray-600">Taux d'abandon du projet</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg text-red-700 font-semibold">
                <strong>Résultat :</strong> Les entrepreneurs abandonnent ou perdent des opportunités d'affaires
              </p>
              <div className="inline-flex items-center space-x-2 text-red-600 font-semibold mt-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Il faut une solution radicale</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 