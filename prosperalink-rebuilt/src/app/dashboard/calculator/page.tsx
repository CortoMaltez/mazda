"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  Building2, 
  CreditCard, 
  FileText, 
  CheckCircle,
  DollarSign,
  Clock,
  Shield
} from "lucide-react";
import AIAssistant from '@/components/AIAssistant';

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    state: "",
    services: {
      basicFormation: true,
      ein: false,
      bankAccount: false,
      accounting: false,
      registeredAgent: false,
      compliance: false
    }
  });

  const [showResults, setShowResults] = useState(false);

  const states = [
    { name: "Delaware", formationFee: 90, popular: true },
    { name: "Wyoming", formationFee: 100, popular: false },
    { name: "Nevada", formationFee: 75, popular: false },
    { name: "Florida", formationFee: 125, popular: false },
    { name: "Texas", formationFee: 300, popular: false },
    { name: "California", formationFee: 70, popular: false }
  ];

  const services = [
    {
      id: "basicFormation",
      name: "Formation de base",
      description: "Articles d'organisation, accord d'exploitation, certificat de formation",
      price: 49,
      required: true
    },
    {
      id: "ein",
      name: "EIN (Numéro d'employeur)",
      description: "Numéro d'identification fédéral pour votre entreprise",
      price: 25,
      required: false
    },
    {
      id: "bankAccount",
      name: "Compte bancaire d'entreprise",
      description: "Ouverture de compte bancaire avec cartes de crédit/débit",
      price: 50,
      required: false
    },
    {
      id: "accounting",
      name: "Services comptables (1 an)",
      description: "Comptabilité mensuelle, déclarations fiscales, rapports financiers",
      price: 199,
      required: false
    },
    {
      id: "registeredAgent",
      name: "Agent enregistré (1 an)",
      description: "Service d'agent enregistré pour recevoir les documents légaux",
      price: 99,
      required: false
    },
    {
      id: "compliance",
      name: "Services de conformité",
      description: "Suivi des obligations légales et fiscales",
      price: 149,
      required: false
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [serviceId]: !formData.services[serviceId as keyof typeof formData.services]
      }
    });
  };

  const calculateTotal = () => {
    const selectedState = states.find(s => s.name === formData.state);
    const stateFee = selectedState ? selectedState.formationFee : 0;
    
    const servicesTotal = services.reduce((total, service) => {
      if (formData.services[service.id as keyof typeof formData.services]) {
        return total + service.price;
      }
      return total;
    }, 0);

    return {
      stateFee,
      servicesTotal,
      total: stateFee + servicesTotal
    };
  };

  const handleCalculate = () => {
    if (formData.companyName && formData.state) {
      setShowResults(true);
    }
  };

  const handleStartFormation = () => {
    // TODO: Rediriger vers le processus de formation
    console.log("Démarrer la formation avec:", formData);
  };

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calculateur de prix</h1>
          <p className="text-gray-600 mt-2">
            Calculez le coût de formation de votre entreprise LLC
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Configuration de votre entreprise
                </CardTitle>
                <CardDescription>
                  Remplissez les informations pour calculer le prix exact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Nom de l'entreprise */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: TechStart LLC"
                  />
                </div>

                {/* État de formation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    État de formation
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un état</option>
                    {states.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name} {state.popular && "(Recommandé)"} - ${state.formationFee}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Services additionnels</h3>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={service.id}
                          checked={formData.services[service.id as keyof typeof formData.services]}
                          onChange={() => handleServiceChange(service.id)}
                          disabled={service.required}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <label htmlFor={service.id} className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-gray-900">
                                {service.name}
                                {service.required && <span className="text-red-500 ml-1">*</span>}
                              </span>
                              <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                            <span className="font-semibold text-gray-900">${service.price}</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleCalculate}
                  disabled={!formData.companyName || !formData.state}
                  className="w-full"
                >
                  Calculer le prix
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Résultats */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Estimation des coûts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showResults ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Frais de formation ({formData.state})</span>
                        <span>${totals.stateFee}</span>
                      </div>
                      {services.map((service) => {
                        if (formData.services[service.id as keyof typeof formData.services]) {
                          return (
                            <div key={service.id} className="flex justify-between text-sm">
                              <span>{service.name}</span>
                              <span>${service.price}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${totals.total}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-800">Prix transparent</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Aucun frais caché. Ce prix inclut tous les frais gouvernementaux et de traitement.
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-800">Formation en 24h</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Votre entreprise sera formée en moins de 24 heures.
                      </p>
                    </div>

                    <Button onClick={handleStartFormation} className="w-full">
                      Commencer la formation
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Remplissez le formulaire pour voir l'estimation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Avantages */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi choisir ProsperaLink ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Garantie de satisfaction</h3>
                <p className="text-sm text-gray-600">
                  100% satisfait ou remboursé. Votre succès est notre priorité.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Processus rapide</h3>
                <p className="text-sm text-gray-600">
                  Formation en 24h au lieu de semaines avec les méthodes traditionnelles.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Prix transparents</h3>
                <p className="text-sm text-gray-600">
                  Aucun frais caché. Vous savez exactement ce que vous payez.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
} 