'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { generateAIResponse } from '../lib/ai-assistant-logic';
import { answerSupportQuery } from '@/services/gemini';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
}

interface Suggestion {
  id: string;
  text: string;
  action: string;
  value: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant IA ProsperaLink. Comment puis-je vous aider à créer votre entreprise LLC aujourd\'hui ?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions: Suggestion[] = [
    {
      id: '1',
      text: '💼 Formation LLC',
      action: 'formation',
      value: 'Je veux former une LLC'
    },
    {
      id: '2',
      text: '💰 Calculer les coûts',
      action: 'pricing',
      value: 'Quels sont les coûts de formation ?'
    },
    {
      id: '3',
      text: '⚡ Formation rapide',
      action: 'speed',
      value: 'En combien de temps puis-je avoir ma LLC ?'
    },
    {
      id: '4',
      text: '🤖 Services IA',
      action: 'ai-services',
      value: 'Quels services IA proposez-vous ?'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Ajouter le message utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Appel à Gemini
      const aiRes = await answerSupportQuery({
        question: text,
        userContext: {}
      });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiRes.content,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      // Fallback logique simulée
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type
      };
      setMessages(prev => [...prev, aiMessage]);
    }
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    handleSendMessage(suggestion.value);
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'start-formation':
        window.location.href = '/auth/signup';
        break;
      case 'pricing':
        window.location.href = '#pricing';
        break;
      case 'consultation':
        window.location.href = '/calendar';
        break;
      default:
        break;
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 shadow-lg"
        >
          🤖
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[500px]">
      <Card className="h-full flex flex-col bg-white shadow-2xl border-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-semibold">Assistant IA ProsperaLink</h3>
                <p className="text-xs opacity-90">Support intelligent 24/7</p>
              </div>
            </div>
            <Button
              onClick={() => setIsMinimized(true)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}> 
              <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow ${msg.sender === 'ai' ? 'bg-blue-50 text-blue-900' : 'bg-blue-600 text-white'}`}> 
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 max-w-[80%] text-sm shadow bg-blue-50 text-blue-900 opacity-80 flex items-center gap-2">
                <span className="animate-pulse">L'IA réfléchit…</span>
                <svg className="animate-spin h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="p-4 border-t">
            <p className="text-sm text-gray-600 mb-3">Suggestions rapides :</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto p-2"
                >
                  {suggestion.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Actions rapides */}
        {messages.length > 2 && (
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Button
                onClick={() => handleActionClick('start-formation')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Commencer Formation
              </Button>
              <Button
                onClick={() => handleActionClick('consultation')}
                variant="outline"
                size="sm"
              >
                Consultation
              </Button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Posez votre question..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Envoyer
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 