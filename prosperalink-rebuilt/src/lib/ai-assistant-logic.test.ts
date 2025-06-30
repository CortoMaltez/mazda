import { generateAIResponse } from "./ai-assistant-logic";

describe("Génération de réponse IA (simulateur)", () => {
  it("détecte la formation LLC", () => {
    const res = generateAIResponse("Je veux former une LLC");
    expect(res.type).toBe("suggestion");
    expect(res.text).toMatch(/formation LLC/);
  });

  it("détecte la question sur les coûts", () => {
    const res = generateAIResponse("Quels sont les coûts de formation ?");
    expect(res.type).toBe("suggestion");
    expect(res.text).toMatch(/prix|plan/i);
  });

  it("détecte la question sur la rapidité", () => {
    const res = generateAIResponse("En combien de temps puis-je avoir ma LLC ?");
    expect(res.type).toBe("action");
    expect(res.text).toMatch(/12h|rapide/i);
  });

  it("détecte la question sur l'IA", () => {
    const res = generateAIResponse("Quels services IA proposez-vous ?");
    expect(res.type).toBe("suggestion");
    expect(res.text).toMatch(/intelligence|artificielle|IA/i);
  });

  it("retourne une réponse générique sinon", () => {
    const res = generateAIResponse("Je veux des conseils personnalisés");
    expect(res.type).toBe("text");
    expect(res.text).toMatch(/besoins spécifiques/i);
  });
}); 