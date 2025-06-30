export {}; 

// Logique pure de génération de réponse IA pour l'assistant

export type AIResponseType = 'text' | 'suggestion' | 'action';

export function generateAIResponse(userInput: string): { text: string; type: AIResponseType } {
  const input = userInput.toLowerCase();

  if (input.includes('temps') || input.includes('rapide') || input.includes('12h')) {
    return {
      text: 'Grâce à notre IA, nous formons votre LLC en 12h au lieu de 24h ! Notre processus optimisé par IA élimine les erreurs et accélère chaque étape. Prêt à commencer ?',
      type: 'action'
    };
  }

  if (input.includes('formation') || input.includes('llc') || input.includes('créer')) {
    return {
      text: 'Excellent choix ! Notre formation LLC IA prend seulement 12h au lieu de 24h. Je peux vous guider à travers le processus. Quel plan vous intéresse le plus ?',
      type: 'suggestion'
    };
  }

  if (input.includes('coût') || input.includes('prix') || input.includes('tarif')) {
    return {
      text: 'Nos prix sont transparents et compétitifs ! Plan Starter IA à 297$, Growth IA à 597$, Scale IA à 997$. Chaque plan inclut notre IA révolutionnaire. Voulez-vous que je vous explique les différences ?',
      type: 'suggestion'
    };
  }

  if (input.includes('ia') || input.includes('intelligence') || input.includes('artificielle')) {
    return {
      text: 'Notre IA révolutionnaire analyse vos besoins, génère automatiquement vos documents, optimise votre conformité et vous guide 24/7. C\'est la différence ProsperaLink ! Voulez-vous une démonstration ?',
      type: 'suggestion'
    };
  }

  return {
    text: 'Je comprends votre question. Notre équipe IA est spécialisée dans la formation d\'entreprises LLC. Pouvez-vous me donner plus de détails sur vos besoins spécifiques ?',
    type: 'text'
  };
} 