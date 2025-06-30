'use client';

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Offer {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  urgency: string;
  features: string[];
  popular?: boolean;
}

interface UrgencyTimer {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ConversionOptimizer() {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [timer, setTimer] = useState<UrgencyTimer>({ hours: 23, minutes: 59, seconds: 59 });
  const [showUrgency, setShowUrgency] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  const offers: Offer[] = [
    {
      id: '1',
      title: 'Offre de Lancement IA - 50% de Réduction',
      description: 'Formation LLC IA + Services Premium inclus',
      originalPrice: 597,
      discountedPrice: 297,
      savings: 300,
      urgency: 'Plus que 3 places disponibles',
      features: [
        'Formation LLC en 12h (IA accélérée)',
        'EIN automatique inclus',
        'Compte bancaire IA inclus',
        'Services comptables 6 mois IA',
        'Conformité prédictive IA',
        'Support IA premium 24/7',
        'Garantie 30 jours'
      ],
      popular: true
    },
    {
      id: '2',
      title: 'Pack Entrepreneur IA - 40% de Réduction',
      description: 'Solution complète pour entrepreneurs sérieux',
      originalPrice: 997,
      discountedPrice: 597,
      savings: 400,
      urgency: 'Offre limitée aux 10 premiers',
      features: [
        'Tout du plan précédent',
        'Services comptables 12 mois IA',
        'Support prioritaire IA 24/7',
        'Gestion de risque IA',
        'Stratégie croissance IA',
        'IA dédiée personnalisée',
        'Analytics business IA'
      ]
    },
    {
      id: '3',
      title: 'Solution Enterprise IA - 30% de Réduction',
      description: 'Solution sur mesure pour grandes entreprises',
      originalPrice: 1997,
      discountedPrice: 1397,
      savings: 600,
      urgency: 'Consultant dédié inclus',
      features: [
        'Tout des plans précédents',
        'IA dédiée personnalisée',
        'Consultant dédié IA',
        'Services juridiques IA inclus',
        'Accès exclusif événements IA',
        'SLA garanti IA',
        'API IA personnalisée'
      ]
    }
  ];

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer and change offer
          setCurrentOffer((prev) => (prev + 1) % offers.length);
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate visitor count
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Show urgency after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUrgency(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const currentOfferData = offers[currentOffer];

  const handlePurchase = (offerId: string) => {
    // Track conversion
    console.log('Conversion tracked:', offerId);
    
    // Redirect to checkout
    window.location.href = `/checkout?offer=${offerId}`;
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full bg-white shadow-2xl border-0">
        {/* Header avec timer */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">🚨 OFFRE LIMITÉE 🚨</h2>
            <p className="text-lg mb-4">{currentOfferData.title}</p>
            
            {/* Timer */}
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="text-sm mb-2">Temps restant pour profiter de cette offre :</p>
              <div className="flex justify-center space-x-4 text-2xl font-bold">
                <div className="bg-white/30 rounded p-2">
                  <span>{formatTime(timer.hours)}</span>
                  <div className="text-xs">Heures</div>
                </div>
                <div className="bg-white/30 rounded p-2">
                  <span>{formatTime(timer.minutes)}</span>
                  <div className="text-xs">Minutes</div>
                </div>
                <div className="bg-white/30 rounded p-2">
                  <span>{formatTime(timer.seconds)}</span>
                  <div className="text-xs">Secondes</div>
                </div>
              </div>
            </div>

            {/* Urgency indicators */}
            {showUrgency && (
              <div className="space-y-2">
                <p className="text-sm">🔥 {currentOfferData.urgency}</p>
                <p className="text-sm">👥 {visitorCount} personnes regardent cette offre</p>
                <p className="text-sm">⚡ Formation en 12h au lieu de 24h</p>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentOfferData.description}
            </h3>
            
            {/* Pricing */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              <span className="text-3xl line-through text-gray-400">
                ${currentOfferData.originalPrice}
              </span>
              <span className="text-5xl font-bold text-red-600">
                ${currentOfferData.discountedPrice}
              </span>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Économisez ${currentOfferData.savings}
              </div>
            </div>

            {currentOfferData.popular && (
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                ⭐ LE PLUS POPULAIRE
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Ce qui est inclus :</h4>
            <ul className="space-y-2">
              {currentOfferData.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social proof */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5000+</div>
                <div>Entreprises formées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99%</div>
                <div>Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12h</div>
                <div>Temps de formation</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handlePurchase(currentOfferData.id)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold"
            >
              🚀 COMMANDER MAINTENANT - ${currentOfferData.discountedPrice}
            </Button>
            
            <Button
              variant="outline"
              className="w-full py-3"
              onClick={() => window.location.href = '/calendar'}
            >
              📅 Consultation gratuite (15 min)
            </Button>
          </div>

          {/* Guarantee */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              🔒 Paiement sécurisé • 🛡️ Garantie 30 jours • 🤖 Support IA 24/7
            </p>
          </div>

          {/* Close button */}
          <div className="text-center mt-4">
            <button
              onClick={() => window.location.href = '/'}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Continuer sans cette offre
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
} 