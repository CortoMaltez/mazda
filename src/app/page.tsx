import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Users, TrendingUp, Shield, Zap, Globe, Building2, Calculator, Brain, ArrowRight, Play } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50" role="navigation" aria-label="Navigation principale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image src="/Logo.svg" alt="ProsperaLink Logo" width={40} height={40} className="w-10 h-10" />
              <span className="text-xl font-bold bg-gradient-to-r from-logo-blue to-indigo-600 bg-clip-text text-transparent">
            ProsperaLink
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-gray-700 hover:text-logo-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 rounded">Services</Link>
              <Link href="#pricing" className="text-gray-700 hover:text-logo-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 rounded">Tarifs</Link>
              <Link href="#about" className="text-gray-700 hover:text-logo-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 rounded">À propos</Link>
              <Link href="/auth/signin" className="text-gray-700 hover:text-logo-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 rounded">Connexion</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-logo-blue to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2">
                  Commencer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden" role="banner" aria-labelledby="hero-title">
        <div className="absolute inset-0 bg-gradient-to-r from-logo-blue/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-logo-red to-pink-500 text-white border-0 animate-pulse">
                  <Star className="w-3 h-3 mr-1" />
                  Leader en formation LLC
                </Badge>
                <h1 id="hero-title" className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Créez votre{' '}
                  <span className="bg-gradient-to-r from-logo-blue to-indigo-600 bg-clip-text text-transparent">
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
                  <Button size="lg" className="bg-gradient-to-r from-logo-blue to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2">
                    Commencer maintenant
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-logo-blue/20 hover:border-logo-blue/40 hover:bg-logo-blue/5 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2">
                  <Play className="mr-2 w-5 h-5" />
                  Voir la démo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-logo-blue to-indigo-400 border-2 border-white shadow-lg"></div>
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
            
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-logo-blue/20 transform hover:scale-105 transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-logo-blue to-indigo-500 rounded-lg flex items-center justify-center">
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

                  <div className="bg-gradient-to-r from-logo-blue/10 to-indigo-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progression</span>
                      <span className="text-sm font-semibold text-logo-blue">100%</span>
                    </div>
                    <div className="w-full bg-logo-blue/20 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-logo-blue to-indigo-500 h-2 rounded-full w-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-logo-red/20 to-pink-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-logo-blue/20 to-indigo-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-24 bg-white" role="region" aria-labelledby="services-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <Badge className="bg-logo-blue/10 text-logo-blue border-0">
              <Zap className="w-3 h-3 mr-1" />
              Services IA Premium
            </Badge>
            <h2 id="services-title" className="text-4xl font-bold text-gray-900">
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
                color: "from-logo-blue to-indigo-500",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center"
              },
              {
                icon: Brain,
                title: "Conseils IA Personnalisés",
                description: "Recommandations intelligentes basées sur votre secteur et objectifs",
                color: "from-purple-500 to-pink-500",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center"
              },
              {
                icon: Calculator,
                title: "Calculateur de Tarifs",
                description: "Estimation précise des coûts avec analyse comparative des états",
                color: "from-green-500 to-teal-500",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center"
              },
              {
                icon: TrendingUp,
                title: "Analyses Prédictives",
                description: "Prévisions de croissance et recommandations stratégiques",
                color: "from-orange-500 to-logo-red",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
              },
              {
                icon: Shield,
                title: "Protection Légale",
                description: "Veille réglementaire et alertes de conformité automatiques",
                color: "from-indigo-500 to-purple-500",
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&crop=center"
              },
              {
                icon: Globe,
                title: "Expansion Internationale",
                description: "Support pour l'expansion vers d'autres états américains",
                color: "from-cyan-500 to-logo-blue",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center"
              }
            ].map((feature, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image 
                    src={feature.image} 
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
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
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-logo-blue/5" role="region" aria-labelledby="pricing-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <Badge className="bg-green-100 text-green-700 border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              Plans Flexibles
            </Badge>
            <h2 id="pricing-title" className="text-4xl font-bold text-gray-900">
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
                color: "from-logo-blue to-indigo-500"
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
              <Card key={i} className={`relative ${plan.popular ? 'ring-2 ring-logo-blue scale-105' : ''} hover:shadow-xl transition-all duration-500 border-0 shadow-lg transform hover:scale-105 animate-fade-in-up`} style={{ animationDelay: `${i * 0.2}s` }}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-logo-blue to-indigo-500 text-white border-0">
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
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2`}
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
      <section className="py-24 bg-white" role="region" aria-labelledby="testimonials-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <Badge className="bg-yellow-100 text-yellow-700 border-0">
              <Star className="w-3 h-3 mr-1" />
              Témoignages
            </Badge>
            <h2 id="testimonials-title" className="text-4xl font-bold text-gray-900">
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
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Marcus Rodriguez",
                role: "CEO, GreenEnergy Solutions",
                content: "Le calculateur de tarifs nous a aidés à choisir le meilleur état pour notre LLC. Les économies réalisées ont dépassé nos attentes.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Emily Watson",
                role: "Directrice, Creative Agency LLC",
                content: "Support exceptionnel et processus transparent. J'ai pu créer mon entreprise en moins d'une semaine grâce à l'automatisation intelligente.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-logo-blue to-indigo-600" role="region" aria-labelledby="cta-title">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 id="cta-title" className="text-4xl font-bold text-white mb-6">
            Prêt à créer votre entreprise LLC ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Rejoignez des centaines d'entrepreneurs qui ont déjà transformé leurs rêves en réalité 
            avec ProsperaLink. Commencez votre voyage entrepreneurial dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-logo-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-logo-blue">
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-logo-blue px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-logo-blue">
              Parler à un expert
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src="/Logo.svg" alt="ProsperaLink Logo" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl font-bold">ProsperaLink</span>
              </div>
              <p className="text-gray-400">
                La plateforme intelligente pour créer et gérer votre entreprise LLC aux États-Unis.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Formation LLC</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Services IA</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Conseils légaux</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Expansion</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">À propos</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Carrières</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-logo-blue focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Presse</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProsperaLink. Tous droits réservés.</p>
        </div>
      </div>
      </footer>
    </div>
  )
} 