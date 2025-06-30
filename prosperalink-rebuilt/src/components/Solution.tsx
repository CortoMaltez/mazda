import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Solution() {
  const solutions = [
    {
      icon: Zap,
      title: "Processus 100% en ligne",
      description: "Formez votre entreprise en quelques clics depuis votre ordinateur. Plus besoin de vous déplacer ou de faire la queue."
    },
    {
      icon: CheckCircle,
      title: "Prix transparents",
      description: "Un tarif unique, sans surprise. Tous les frais sont inclus et clairement affichés dès le début."
    },
    {
      icon: Shield,
      title: "Documents garantis",
      description: "Nos experts vérifient chaque document pour éviter les erreurs et assurer une approbation rapide."
    },
    {
      icon: Users,
      title: "Support expert 24/7",
      description: "Une équipe d'experts à votre disposition pour répondre à toutes vos questions et vous accompagner."
    }
  ];

  const benefits = [
    "Formation en 24h au lieu de semaines",
    "Économies de 60% en moyenne",
    "Documents générés automatiquement",
    "Conformité garantie",
    "Support en français",
    "Accès au tableau de bord en temps réel"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            La solution ProsperaLink
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous avons révolutionné la formation d'entreprises en créant une plateforme 
            simple, rapide et économique qui élimine tous les obstacles traditionnels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <solution.icon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {solution.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pourquoi choisir ProsperaLink ?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Commencer maintenant
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Comparaison rapide
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Délai de formation</span>
                <div className="text-right">
                  <span className="text-red-600 line-through">2-8 semaines</span>
                  <span className="text-green-600 font-semibold ml-2">24h</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Coût moyen</span>
                <div className="text-right">
                  <span className="text-red-600 line-through">$500-2000</span>
                  <span className="text-green-600 font-semibold ml-2">$99</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Support</span>
                <div className="text-right">
                  <span className="text-red-600 line-through">Limité</span>
                  <span className="text-green-600 font-semibold ml-2">24/7</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Garantie</span>
                <div className="text-right">
                  <span className="text-red-600 line-through">Aucune</span>
                  <span className="text-green-600 font-semibold ml-2">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 