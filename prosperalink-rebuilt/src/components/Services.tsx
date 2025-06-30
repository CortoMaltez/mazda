import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, FileText, Calculator, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: Building2,
      title: "Formation LLC",
      price: "À partir de $49",
      description: "Formation complète de votre entreprise LLC avec tous les documents nécessaires.",
      features: [
        "Articles d'organisation",
        "Accord d'exploitation",
        "Certificat de formation",
        "Support juridique"
      ],
      popular: false
    },
    {
      icon: CreditCard,
      title: "EIN & Compte bancaire",
      price: "À partir de $99",
      description: "Numéro d'employeur fédéral et ouverture de compte bancaire d'entreprise.",
      features: [
        "EIN (numéro d'employeur)",
        "Compte bancaire d'entreprise",
        "Cartes de crédit/débit",
        "Services bancaires en ligne"
      ],
      popular: true
    },
    {
      icon: FileText,
      title: "Services comptables",
      price: "À partir de $199",
      description: "Services comptables complets pour maintenir votre conformité fiscale.",
      features: [
        "Comptabilité mensuelle",
        "Déclarations fiscales",
        "Rapports financiers",
        "Conseil fiscal"
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      icon: Calculator,
      title: "Calculateur de prix",
      description: "Calculez instantanément le coût de formation de votre entreprise."
    },
    {
      icon: Users,
      title: "Support expert",
      description: "Accompagnement personnalisé par nos experts en formation d'entreprises."
    },
    {
      icon: Shield,
      title: "Garantie de satisfaction",
      description: "100% satisfait ou remboursé. Votre succès est notre priorité."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nos services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions complètes pour créer et gérer votre entreprise aux États-Unis. 
            Choisissez le service qui correspond à vos besoins.
          </p>
        </div>

        {/* Services principaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className={`relative ${service.popular ? 'border-blue-500 shadow-lg' : ''}`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/calculator">
                  <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                    Choisir ce service
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services additionnels */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Services additionnels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à créer votre entreprise ?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Rejoignez des milliers d'entrepreneurs qui ont déjà choisi ProsperaLink 
              pour créer leur entreprise aux États-Unis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard/calculator">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Calculer les prix
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Commencer maintenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 