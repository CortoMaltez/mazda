'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  FileText,
  MessageCircle,
  Clock,
  CheckCircle,
  Brain,
  Globe
} from 'lucide-react';
// Gestionnaire de coûts IA supprimé - remplacé par AIUsageService

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'quick-reply' | 'file' | 'link';
  quickReplies?: string[];
  fileUrl?: string;
  linkUrl?: string;
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
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis l'assistant IA de ProsperaLink. Comment puis-je vous aider avec votre formation d'entreprise LLC aux États-Unis ?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      quickReplies: [
        "Formation LLC",
        "Prix et tarifs",
        "Support technique",
        "Conformité fiscale"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentLead, setCurrentLead] = useState<any>(null);
  const [stats, setStats] = useState({
    totalMessages: 0,
    leadsGenerated: 0,
    appointmentsScheduled: 0,
    revenueGenerated: 0,
    aiCosts: 0
  });

  // Gestionnaire de coûts IA supprimé - remplacé par AIUsageService

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // Simuler la connexion WhatsApp
    setTimeout(() => {
      setIsConnected(true);
    }, 2000);
  }, []);

  const handleQuickReply = (reply: string) => {
    addMessage(reply, 'user');
    handleBotResponse(reply);
  };

  const handleBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    let botResponse = '';
    let quickReplies: string[] = [];
    
    if (userMessage.toLowerCase().includes('formation') || userMessage.toLowerCase().includes('llc')) {
      botResponse = "Excellent choix ! Notre formation LLC prend seulement 12h. Quel état vous intéresse ? Delaware, Wyoming, ou un autre ?";
      quickReplies = ["Delaware", "Wyoming", "Autre état", "Voir les prix"];
    } else if (userMessage.toLowerCase().includes('prix') || userMessage.toLowerCase().includes('tarif')) {
      botResponse = "Nos prix sont transparents : coûts réels + 500$ de profit fixe. Delaware : ~$800, Wyoming : ~$600. Voulez-vous une estimation précise ?";
      quickReplies = ["Estimation Delaware", "Estimation Wyoming", "Comparaison états", "Démarrer maintenant"];
    } else if (userMessage.toLowerCase().includes('support') || userMessage.toLowerCase().includes('technique')) {
      botResponse = "Je suis disponible 24/7 ! Vous pouvez aussi contacter notre équipe par email ou téléphone. Que préférez-vous ?";
      quickReplies = ["Email", "Téléphone", "Chat en direct", "FAQ"];
    } else if (userMessage.toLowerCase().includes('conformité') || userMessage.toLowerCase().includes('fiscal')) {
      botResponse = "Nous gérons toute la conformité : Form 5472, rapports annuels, EIN. Aucun risque de pénalité IRS. Voulez-vous plus de détails ?";
      quickReplies = ["Form 5472", "Rapports annuels", "EIN", "Garanties"];
    } else {
      botResponse = "Je comprends votre question. Laissez-moi vous connecter avec un expert humain pour une réponse personnalisée. En attendant, puis-je vous aider avec autre chose ?";
      quickReplies = ["Formation LLC", "Prix", "Support", "Contact humain"];
    }
    
    addMessage(botResponse, 'bot', 'text', quickReplies);
    setIsTyping(false);
  };

  const addMessage = (text: string, sender: 'user' | 'bot', type: 'text' | 'quick-reply' | 'file' | 'link' = 'text', quickReplies?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
      quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
    setStats(prev => ({ ...prev, totalMessages: prev.totalMessages + 1 }));
  };

  const handleSend = () => {
    if (inputText.trim()) {
      addMessage(inputText, 'user');
      handleBotResponse(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scheduleAppointment = (timeSlot: string) => {
    addMessage(`Parfait ! Votre rendez-vous est confirmé pour ${timeSlot}. 
    
Je vous envoie un lien de calendrier pour finaliser. 
Un expert ProsperaLink vous contactera 10 minutes avant.`, 'bot', 'text');
    
    setStats(prev => ({ ...prev, appointmentsScheduled: prev.appointmentsScheduled + 1 }));
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <CardHeader className="bg-green-500 text-white rounded-t-lg pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-lg">ProsperaLink IA</CardTitle>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span>En ligne</span>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-3`}>
                  <p className="text-sm">{message.text}</p>
                  {message.quickReplies && message.sender === 'bot' && (
                    <div className="mt-3 space-y-2">
                      {message.quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          variant="outline"
                          size="sm"
                          className="w-full text-xs bg-white hover:bg-gray-50"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
                className="bg-green-500 hover:bg-green-600"
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Features Preview */}
      <div className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
              <MessageCircle className="w-4 h-4 mr-2" />
              Assistant IA WhatsApp
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Support intelligent 24/7
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre assistant IA intégré à WhatsApp vous accompagne à chaque étape 
              de votre formation d'entreprise aux États-Unis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  IA Intelligente
                </h3>
                <p className="text-gray-600">
                  Réponses instantanées et personnalisées grâce à Gemini AI
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Support Multilingue
                </h3>
                <p className="text-gray-600">
                  Assistance en français, anglais, espagnol et plus
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Disponible 24/7
                </h3>
                <p className="text-gray-600">
                  Support continu, même en dehors des heures de bureau
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
} 