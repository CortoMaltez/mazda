'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Bot, User, DollarSign, Zap, Sparkles, CheckCircle, Minimize2, Maximize2, Loader2 } from 'lucide-react';
import { getGeminiCostManager, AI_BUDGET_CONFIG } from '../lib/gemini-cost-manager';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'qualification';
}

interface Prospect {
  name: string;
  email: string;
  country: string;
  businessType: string;
  budget: string;
  timeline: string;
  qualified: boolean;
}

interface AIChatbotProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark' | 'prospera';
  maxMessages?: number;
  showCostTracker?: boolean;
}

export default function AIChatbot({
  position = 'bottom-right',
  theme = 'prospera',
  maxMessages = 50,
  showCostTracker = true
}: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis l'assistant IA de ProsperaLink. Je peux vous aider à former votre LLC aux États-Unis en 12h. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [qualificationStep, setQualificationStep] = useState(0);
  const [costStats, setCostStats] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fonctions utilitaires
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white border-gray-700';
      case 'light':
        return 'bg-white text-gray-900 border-gray-200';
      default:
        return 'bg-gradient-to-br from-blue-600 to-purple-700 text-white border-blue-500';
    }
  };

  // Gestion sécurisée du costManager
  const costManager = React.useMemo(() => {
    try {
      return getGeminiCostManager();
    } catch (error) {
      console.warn('AIChatbot: Impossible d\'initialiser le gestionnaire de coûts:', error);
      return null;
    }
  }, []);

  // Si le gestionnaire de coûts n'est pas disponible, afficher un message d'erreur discret
  if (!costManager) {
    return (
      <div className={`fixed ${getPositionClasses()} z-50`}>
        <Button
          onClick={() => setHasError(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-gray-500 hover:bg-gray-600 text-white hover:scale-110 transition-all duration-200"
          title="Assistant IA temporairement indisponible"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {hasError && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Assistant IA Indisponible</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setHasError(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">
                  L'assistant IA est temporairement indisponible. Veuillez réessayer plus tard ou contactez notre support.
                </p>
                <Button
                  onClick={() => setHasError(false)}
                  className="w-full"
                >
                  Fermer
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    // Message de bienvenue automatique
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        content: 'Bonjour ! Je suis l\'assistant IA de ProsperaLink. Je peux vous aider avec la formation d\'entreprises LLC, l\'optimisation fiscale, et bien plus encore. Comment puis-je vous aider aujourd\'hui ?',
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    // Mettre à jour les statistiques de coûts de manière sécurisée
    if (showCostTracker && costManager) {
      try {
        setCostStats(costManager.getCostStats());
      } catch (error) {
        console.warn('Erreur lors de la récupération des statistiques de coûts:', error);
      }
    }
  }, [messages, showCostTracker, costManager]);

  useEffect(() => {
    // Scroll vers le bas quand de nouveaux messages arrivent
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const qualificationQuestions = [
    {
      question: "Quel est votre nom ?",
      field: 'name' as keyof Prospect
    },
    {
      question: "Quel est votre email ?",
      field: 'email' as keyof Prospect
    },
    {
      question: "De quel pays venez-vous ?",
      field: 'country' as keyof Prospect
    },
    {
      question: "Quel type d'entreprise souhaitez-vous créer ?",
      field: 'businessType' as keyof Prospect,
      options: ['SaaS', 'E-commerce', 'Consulting', 'Services', 'Autre']
    },
    {
      question: "Quel est votre budget pour la formation ?",
      field: 'budget' as keyof Prospect,
      options: ['< $500', '$500-$1000', '$1000-$2000', '> $2000']
    },
    {
      question: "Quand souhaitez-vous lancer votre entreprise ?",
      field: 'timeline' as keyof Prospect,
      options: ['Immédiatement', 'Dans 1 mois', 'Dans 3 mois', 'Plus tard']
    }
  ];

  const quickReplies = [
    "Comment fonctionne la formation ?",
    "Quels sont les prix ?",
    "Combien de temps ça prend ?",
    "Quels documents sont nécessaires ?",
    "Puis-je parler à un expert ?"
  ];

  const addMessage = (content: string, sender: 'user' | 'bot', type: 'text' | 'quick_reply' | 'qualification' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, 'user', 'quick_reply');
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      switch (reply) {
        case "Comment fonctionne la formation ?":
          response = "Notre formation LLC se fait en 3 étapes simples : 1) Remplissez notre formulaire en ligne, 2) Nous soumettons les documents à l'état, 3) Vous recevez votre LLC en 12h ! Voulez-vous que je vous guide pour commencer ?";
          break;
        case "Quels sont les prix ?":
          response = "Nous avons 2 plans : Solo Founder ($899 setup + $29/mois) et Multi-Member ($999 setup + $49/mois). Prix transparents, aucun frais caché. Quel plan vous intéresse ?";
          break;
        case "Combien de temps ça prend ?":
          response = "Formation en 12h garantie ! Nous utilisons des processus optimisés et l'IA pour accélérer le processus. Voulez-vous commencer maintenant ?";
          break;
        case "Quels documents sont nécessaires ?":
          response = "Vous n'avez besoin que de votre passeport et d'une adresse email. Nous gérons tout le reste ! Souhaitez-vous que je vous qualifie pour commencer ?";
          break;
        case "Puis-je parler à un expert ?":
          response = "Bien sûr ! Je peux vous connecter avec un expert. Mais d'abord, laissez-moi vous qualifier rapidement pour mieux vous servir. C'est parti ?";
          break;
        default:
          response = "Merci pour votre question ! Je peux vous aider avec la formation LLC. Souhaitez-vous que je vous guide pour commencer ?";
      }
      addMessage(response, 'bot');
      setIsTyping(false);
    }, 1500);
  };

  const handleQualification = (answer: string) => {
    if (!prospect) return;

    const currentQuestion = qualificationQuestions[qualificationStep];
    const updatedProspect = { ...prospect, [currentQuestion.field]: answer };
    setProspect(updatedProspect);

    addMessage(answer, 'user', 'qualification');

    if (qualificationStep < qualificationQuestions.length - 1) {
      setQualificationStep(qualificationStep + 1);
      const nextQuestion = qualificationQuestions[qualificationStep + 1];
      setTimeout(() => {
        addMessage(nextQuestion.question, 'bot', 'qualification');
      }, 500);
    } else {
      // Qualification complete
      const finalProspect = { ...updatedProspect, qualified: true };
      setProspect(finalProspect);
      
      setTimeout(() => {
        addMessage("Parfait ! Votre qualification est terminée. Je vais créer votre profil prospect et vous connecter avec notre équipe. Voulez-vous commencer la formation maintenant ?", 'bot');
        // Here you would typically send the prospect data to your CRM
        console.log('Prospect qualified:', finalProspect);
      }, 500);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    addMessage(userMessage, 'user');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      if (userMessage.toLowerCase().includes('commencer') || userMessage.toLowerCase().includes('formation')) {
        setProspect({
          name: '',
          email: '',
          country: '',
          businessType: '',
          budget: '',
          timeline: '',
          qualified: false
        });
        setQualificationStep(0);
        addMessage(qualificationQuestions[0].question, 'bot', 'qualification');
      } else {
        addMessage("Merci pour votre message ! Je peux vous aider avec la formation LLC. Voulez-vous commencer le processus de qualification ?", 'bot');
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">ProsperaLink IA</h3>
                  <p className="text-xs opacity-90">Formation LLC en 12h</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.type === 'qualification' && message.sender === 'bot' && (
                        <div className="mt-3 space-y-2">
                          {qualificationQuestions[qualificationStep]?.options ? (
                            qualificationQuestions[qualificationStep].options?.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleQualification(option)}
                                className="block w-full text-left p-2 bg-white bg-opacity-20 rounded text-sm hover:bg-opacity-30 transition-colors"
                              >
                                {option}
                              </button>
                            ))
                          ) : (
                            <div className="text-xs opacity-75">
                              Tapez votre réponse ci-dessous
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-gray-600">IA en train d'écrire...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 text-center">Questions rapides :</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {prospect && (
                  <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Qualification en cours...</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
} 