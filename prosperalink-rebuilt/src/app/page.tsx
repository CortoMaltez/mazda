import { Metadata } from 'next';
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ScrollToTop from "@/components/ScrollToTop";
import AIAssistant from "@/components/AIAssistant";
import ConversionOptimizer from "@/components/ConversionOptimizer";
import GoalTracker from "@/components/GoalTracker";
import Calendar from "@/components/Calendar";
import AIChatbot from "@/components/AIChatbot";
import DiscreetAccessWrapper from "@/components/DiscreetAccessWrapper";
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Users, TrendingUp, Shield, Zap, Globe, Building2, Calculator, Brain, ArrowRight, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ProsperaLink - Formation d\'entreprises LLC aux États-Unis | IA Révolutionnaire',
  description: 'Formation d\'entreprises LLC en 12h grâce à l\'IA. Service premium pour entrepreneurs internationaux. Formation rapide, support IA 24/7, conformité garantie.',
  keywords: ['LLC', 'formation entreprise', 'Delaware', 'Wyoming', 'EIN', 'entrepreneurs internationaux', 'conformité américaine', 'IA', 'intelligence artificielle'],
  openGraph: {
    title: 'ProsperaLink - Formation d\'entreprises LLC avec IA',
    description: 'Service premium de formation d\'entreprises LLC avec IA. Formation en 12h, support IA 24/7, conformité garantie.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image src="/Logo.svg" alt="ProsperaLink" width={40} height={40} className="w-10 h-10" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ProsperaLink
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
              <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Tarifs</Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">À propos</Link>
              <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 transition-colors">Connexion</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                  Commencer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  Leader en formation LLC
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Créez votre{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    entreprise LLC
                  </span>{' '}
                  avec l'IA
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  ProsperaLink révolutionne la formation d'entreprises aux États-Unis avec l'intelligence artificielle. 
                  Processus automatisé, conseils personnalisés, et suivi intelligent pour votre succès entrepreneurial.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg">
                    Commencer maintenant
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-blue-200 hover:border-blue-300">
                  <Play className="mr-2 w-5 h-5" />
                  Voir la démo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">500+ entrepreneurs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.9/5 (2,847 avis)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Formation LLC Automatisée</h3>
                      <p className="text-sm text-gray-600">Processus simplifié en 8 étapes</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {['Analyse de marché IA', 'Documents légaux générés', 'Conseils personnalisés', 'Suivi en temps réel'].map((step, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progression</span>
                      <span className="text-sm font-semibold text-blue-600">100%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-700 border-0">
              <Zap className="w-3 h-3 mr-1" />
              Services IA Premium
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900">
              Tout ce dont vous avez besoin pour réussir
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme combine expertise légale et intelligence artificielle pour vous offrir 
              une expérience de formation d'entreprise incomparable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Formation LLC Automatisée",
                description: "Processus complet en 8 étapes avec génération automatique de documents légaux",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Brain,
                title: "Conseils IA Personnalisés",
                description: "Recommandations intelligentes basées sur votre secteur et objectifs",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Calculator,
                title: "Calculateur de Tarifs",
                description: "Estimation précise des coûts avec analyse comparative des états",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: TrendingUp,
                title: "Analyses Prédictives",
                description: "Prévisions de croissance et recommandations stratégiques",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Shield,
                title: "Protection Légale",
                description: "Veille réglementaire et alertes de conformité automatiques",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Globe,
                title: "Expansion Internationale",
                description: "Support pour l'expansion vers d'autres états américains",
                color: "from-cyan-500 to-blue-500"
              }
            ].map((feature, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-100 text-green-700 border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              Plans Flexibles
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900">
              Choisissez votre plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des options adaptées à tous les budgets, avec des fonctionnalités IA avancées 
              pour maximiser vos chances de succès.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "299",
                description: "Formation LLC de base",
                features: ["Formation LLC complète", "Documents légaux", "Support email", "Suivi de base"],
                popular: false,
                color: "from-gray-500 to-gray-600"
              },
              {
                name: "Professional",
                price: "599",
                description: "Avec services IA premium",
                features: ["Tout du plan Starter", "Conseils IA personnalisés", "Calculateur de tarifs", "Analyses prédictives", "Support prioritaire"],
                popular: true,
                color: "from-blue-500 to-indigo-500"
              },
              {
                name: "Enterprise",
                price: "999",
                description: "Solution complète",
                features: ["Tout du plan Professional", "Expansion multi-états", "Protection légale avancée", "Consultant dédié", "API personnalisée"],
                popular: false,
                color: "from-purple-500 to-pink-500"
              }
            ].map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:shadow-xl transition-all duration-300 border-0 shadow-lg`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">
                      Plus populaire
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      ${plan.price}
                    </div>
                    <CardDescription className="text-gray-600">
                      {plan.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`}
                    size="lg"
                  >
                    Choisir {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-yellow-100 text-yellow-700 border-0">
              <Star className="w-3 h-3 mr-1" />
              Témoignages
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez pourquoi des centaines d'entrepreneurs choisissent ProsperaLink 
              pour créer leur entreprise LLC.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Fondatrice, TechStart LLC",
                content: "ProsperaLink a transformé notre processus de formation. L'IA nous a donné des insights précieux sur le marché et nous a fait gagner des semaines.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "CEO, GreenEnergy Solutions",
                content: "Le calculateur de tarifs nous a aidés à choisir le meilleur état pour notre LLC. Les économies réalisées ont dépassé nos attentes.",
                rating: 5
              },
              {
                name: "Emily Watson",
                role: "Directrice, Creative Agency LLC",
                content: "Support exceptionnel et processus transparent. J'ai pu créer mon entreprise en moins d'une semaine grâce à l'automatisation intelligente.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <Card key={i} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à créer votre entreprise LLC ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Rejoignez des centaines d'entrepreneurs qui ont déjà transformé leurs rêves en réalité 
            avec ProsperaLink. Commencez votre voyage entrepreneurial dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              Parler à un expert
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src="/Logo.svg" alt="ProsperaLink" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl font-bold">ProsperaLink</span>
              </div>
              <p className="text-gray-400">
                La plateforme intelligente pour créer et gérer votre entreprise LLC aux États-Unis.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Formation LLC</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Services IA</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Conseils légaux</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Expansion</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Carrières</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Presse</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProsperaLink. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
