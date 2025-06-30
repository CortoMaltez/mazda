'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Bot,
  Zap,
  Settings,
  FileText
} from 'lucide-react';
import { getGeminiCostManager } from '../lib/gemini-cost-manager';

interface WhatsAppMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'document' | 'quick_reply';
  quickReplies?: string[];
  metadata?: {
    phone?: string;
    name?: string;
    intent?: string;
    leadScore?: number;
  };
}

interface WhatsAppBotProps {
  phoneNumber: string;
  businessName: string;
  autoResponder: boolean;
  leadQualification: boolean;
  appointmentScheduling: boolean;
}

export default function WhatsAppBot({
  phoneNumber = '+1 (555) 123-4567',
  businessName = 'ProsperaLink',
  autoResponder = true,
  leadQualification = true,
  appointmentScheduling = true
}: WhatsAppBotProps) {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentLead, setCurrentLead] = useState<any>(null);
  const [stats, setStats] = useState({
    totalMessages: 0,
    leadsGenerated: 0,
    appointmentsScheduled: 0,
    revenueGenerated: 0,
    aiCosts: 0
  });

  const costManager = getGeminiCostManager();

  // Templates de réponses IA
  const responseTemplates = {
    welcome: `Bonjour ! Je suis l'assistant IA de ${businessName}. 
    
Je peux vous aider avec :
• Formation d'entreprises LLC
• Optimisation fiscale
• Services de conformité
• Consultation personnalisée

Comment puis-je vous aider aujourd'hui ?`,

    pricing: `Nos tarifs pour la formation LLC :

📋 **Formation de base** : $297
- Constitution LLC complète
- EIN et compte bancaire
- Guide de démarrage

🚀 **Formation Premium** : $597
- Tout inclus + optimisation fiscale
- Support prioritaire
- Documents légaux

💎 **Formation Elite** : $997
- Service complet + conseil fiscal
- Gestion comptable 1 an
- Support VIP

Quel plan vous intéresse ?`,

    appointment: `Parfait ! Je peux vous programmer un appel de consultation gratuit.

Disponibilités cette semaine :
📅 Lundi : 14h-16h
📅 Mardi : 10h-12h, 15h-17h
📅 Mercredi : 9h-11h, 16h-18h
📅 Jeudi : 13h-15h
📅 Vendredi : 11h-13h

Quelle plage horaire vous convient ?`,

    qualification: `Pour mieux vous servir, j'aimerais en savoir plus sur votre projet :

1️⃣ Quel type d'activité prévoyez-vous ?
2️⃣ Avez-vous déjà une entreprise ?
3️⃣ Quel est votre budget approximatif ?
4️⃣ Quand souhaitez-vous démarrer ?

Vos réponses m'aideront à vous proposer la meilleure solution !`
  };

  useEffect(() => {
    // Simuler la connexion WhatsApp
    setTimeout(() => {
      setIsConnected(true);
      // Message de bienvenue automatique
      addBotMessage(responseTemplates.welcome, 'text');
    }, 2000);
  }, []);

  const addBotMessage = (content: string, type: 'text' | 'image' | 'document' | 'quick_reply' = 'text', quickReplies?: string[]) => {
    const message: WhatsAppMessage = {
      id: Date.now().toString(),
      content,
      sender: 'bot',
      timestamp: new Date(),
      type,
      quickReplies
    };
    setMessages(prev => [...prev, message]);
    setStats(prev => ({ ...prev, totalMessages: prev.totalMessages + 1 }));
  };

  const processUserMessage = async (content: string) => {
    // Analyser l'intention avec Gemini
    try {
      const intentAnalysis = await costManager.generateText(
        `Analyse cette intention client WhatsApp et réponds avec seulement un mot clé parmi: pricing, appointment, qualification, general, complaint, urgent
        
        Message: "${content}"
        
        Réponds seulement le mot clé.`
      );

      const intent = intentAnalysis.trim().toLowerCase();
      
      // Réponses automatiques basées sur l'intention
      switch (intent) {
        case 'pricing':
          addBotMessage(responseTemplates.pricing, 'text', ['Formation de base', 'Formation Premium', 'Formation Elite']);
          break;
        case 'appointment':
          addBotMessage(responseTemplates.appointment, 'text', ['Lundi 14h', 'Mardi 10h', 'Mercredi 9h', 'Jeudi 13h']);
          break;
        case 'qualification':
          addBotMessage(responseTemplates.qualification, 'text');
          // Qualifier le lead
          if (leadQualification) {
            qualifyLead(content);
          }
          break;
        case 'urgent':
          addBotMessage('Je comprends l\'urgence de votre situation. Je vous transfère immédiatement vers un expert humain. Un de nos spécialistes vous contactera dans les 5 minutes.', 'text');
          break;
        default:
          // Réponse générique avec Gemini
          const genericResponse = await costManager.generateText(
            `En tant qu'expert ProsperaLink, réponds de manière professionnelle et utile à cette question WhatsApp: "${content}". 
            Sois concis, amical et orienté vers la conversion.`
          );
          addBotMessage(genericResponse, 'text');
      }
    } catch (error) {
      console.error('Erreur traitement message:', error);
      addBotMessage('Désolé, je rencontre des difficultés techniques. Un expert vous contactera bientôt.', 'text');
    }
  };

  const qualifyLead = async (message: string) => {
    try {
      const leadAnalysis = await costManager.generateText(
        `Analyse ce message client et évalue le lead sur 100 points. Réponds au format JSON:
        {
          "score": 85,
          "budget": "high|medium|low",
          "urgency": "high|medium|low",
          "services": ["llc", "tax", "compliance"],
          "nextAction": "appointment|followup|nurture"
        }
        
        Message: "${message}"`
      );

      const leadData = JSON.parse(leadAnalysis);
      setCurrentLead(leadData);
      
      if (leadData.score > 70) {
        setStats(prev => ({ ...prev, leadsGenerated: prev.leadsGenerated + 1 }));
      }
    } catch (error) {
      console.error('Erreur qualification lead:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Ajouter le message utilisateur
    const userMessage: WhatsAppMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);

    // Traiter avec l'IA
    if (autoResponder) {
      await processUserMessage(content);
    }
  };

  const scheduleAppointment = (timeSlot: string) => {
    addBotMessage(`Parfait ! Votre rendez-vous est confirmé pour ${timeSlot}. 
    
Je vous envoie un lien de calendrier pour finaliser. 
Un expert ProsperaLink vous contactera 10 minutes avant.`, 'text');
    
    setStats(prev => ({ ...prev, appointmentsScheduled: prev.appointmentsScheduled + 1 }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <h2 className="text-xl font-bold">WhatsApp Bot IA</h2>
            <Badge variant={isConnected ? 'default' : 'secondary'}>
              {isConnected ? 'Connecté' : 'Déconnecté'}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{phoneNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zone de chat */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block max-w-xs lg:max-w-md rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-900 border'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.quickReplies && (
                      <div className="mt-2 space-y-1">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (reply.includes('Formation')) {
                                handleSendMessage(`Je veux en savoir plus sur la ${reply}`);
                              } else if (reply.includes('h')) {
                                scheduleAppointment(reply);
                              } else {
                                handleSendMessage(reply);
                              }
                            }}
                            className="block w-full text-left text-xs bg-gray-100 hover:bg-gray-200 rounded p-2 transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie */}
            <div className="mt-4 flex space-x-2">
              <Input
                placeholder="Tapez votre message..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button onClick={() => {
                const input = document.querySelector('input[placeholder="Tapez votre message..."]') as HTMLInputElement;
                if (input) {
                  handleSendMessage(input.value);
                  input.value = '';
                }
              }}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Panneau de contrôle */}
          <div className="space-y-4">
            {/* Statistiques */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Statistiques
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Messages totaux:</span>
                  <span className="font-medium">{stats.totalMessages}</span>
                </div>
                <div className="flex justify-between">
                  <span>Leads générés:</span>
                  <span className="font-medium text-green-600">{stats.leadsGenerated}</span>
                </div>
                <div className="flex justify-between">
                  <span>RDV programmés:</span>
                  <span className="font-medium text-blue-600">{stats.appointmentsScheduled}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coûts IA:</span>
                  <span className="font-medium text-red-600">${stats.aiCosts.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Lead actuel */}
            {currentLead && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Lead actuel
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <Badge variant={currentLead.score > 70 ? 'default' : 'secondary'}>
                      {currentLead.score}/100
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget:</span>
                    <span className="capitalize">{currentLead.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgence:</span>
                    <span className="capitalize">{currentLead.urgency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Action:</span>
                    <span className="capitalize">{currentLead.nextAction}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Actions rapides */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Actions rapides
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSendMessage('Je veux connaître vos tarifs')}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Tarifs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSendMessage('Je veux prendre rendez-vous')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Rendez-vous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleSendMessage('J\'ai besoin d\'aide pour ma LLC')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Aide LLC
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
} 