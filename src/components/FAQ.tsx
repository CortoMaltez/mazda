"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Shield,
  Globe,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export function FAQ() {
  const faqs = [
    {
      question: "Combien de temps faut-il pour créer une LLC ?",
      answer: "Avec ProsperaLink, votre LLC est créée en 12h maximum. Notre processus automatisé traite votre demande en temps réel et soumet tous les documents nécessaires.",
      category: "Temps"
    },
    {
      question: "Quels sont les coûts réels ?",
      answer: "Nos prix sont transparents : coûts réels de l'état + profit fixe de $500. Aucun frais caché, vous savez exactement ce que vous payez.",
      category: "Prix"
    },
    {
      question: "La conformité est-elle incluse ?",
      answer: "Oui, la conformité automatique est incluse dans tous nos plans. Nous surveillons vos obligations légales 24/7 et vous alertons automatiquement.",
      category: "Conformité"
    },
    {
      question: "Le support IA est-il disponible 24/7 ?",
      answer: "Absolument. Notre assistant IA intelligent est disponible 24/7 en anglais, français et arabe pour répondre à toutes vos questions.",
      category: "Support"
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment sans frais. Nous croyons en la transparence et la flexibilité.",
      category: "Flexibilité"
    },
    {
      question: "Quels états proposez-vous ?",
      answer: "Nous proposons la formation dans tous les états américains, avec des recommandations optimisées selon votre secteur d'activité.",
      category: "États"
    }
  ]

  const categories = [
    {
      icon: Clock,
      title: "Rapidité",
      description: "Formation en 12h maximum"
    },
    {
      icon: DollarSign,
      title: "Transparence",
      description: "Prix clairs, aucun frais caché"
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Conformité garantie"
    },
    {
      icon: Globe,
      title: "International",
      description: "Support multilingue"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir sur ProsperaLink et la formation d'entreprises aux États-Unis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {faq.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <category.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">{category.title}</div>
              <div className="text-sm text-gray-600">{category.description}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à commencer ?
            </h3>
            <p className="text-gray-600 mb-6">
              Rejoignez des milliers d'entrepreneurs qui ont choisi ProsperaLink 
              pour créer leur entreprise aux États-Unis.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 