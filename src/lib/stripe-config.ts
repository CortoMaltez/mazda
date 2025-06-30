import Stripe from 'stripe';

// Configuration Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

// Configuration des produits Stripe
export const STRIPE_PRODUCTS = {
  starter: {
    name: 'Plan Starter IA',
    description: 'Formation LLC en 12h avec support IA',
    price: 29700, // 297$ en centimes
    currency: 'usd',
    metadata: {
      plan_id: 'starter',
      profit: '252',
      margin: '85'
    }
  },
  growth: {
    name: 'Plan Growth IA',
    description: 'Formation LLC + services bancaires et comptables',
    price: 59700, // 597$ en centimes
    currency: 'usd',
    metadata: {
      plan_id: 'growth',
      profit: '477',
      margin: '80'
    }
  },
  scale: {
    name: 'Plan Scale IA',
    description: 'Solution complète pour entreprises en croissance',
    price: 99700, // 997$ en centimes
    currency: 'usd',
    metadata: {
      plan_id: 'scale',
      profit: '748',
      margin: '75'
    }
  },
  enterprise: {
    name: 'Plan Enterprise IA',
    description: 'Solution enterprise avec IA dédiée',
    price: 199700, // 1997$ en centimes
    currency: 'usd',
    metadata: {
      plan_id: 'enterprise',
      profit: '1398',
      margin: '70'
    }
  }
};

// Services d'upselling
export const STRIPE_UPSELLS = {
  banking: {
    name: 'Compte Bancaire Premium',
    description: 'Compte bancaire business avec cartes de crédit',
    price: 19900,
    currency: 'usd',
    interval: 'one_time',
    metadata: {
      upsell_id: 'banking',
      profit: '179',
      margin: '90'
    }
  },
  accounting: {
    name: 'Services Comptables IA',
    description: 'Comptabilité automatisée avec IA',
    price: 29900,
    currency: 'usd',
    interval: 'recurring',
    recurring: {
      interval: 'year'
    },
    metadata: {
      upsell_id: 'accounting',
      profit: '254',
      margin: '85'
    }
  },
  compliance: {
    name: 'Conformité Prédictive',
    description: 'Surveillance continue de la conformité',
    price: 14900,
    currency: 'usd',
    interval: 'recurring',
    recurring: {
      interval: 'year'
    },
    metadata: {
      upsell_id: 'compliance',
      profit: '119',
      margin: '80'
    }
  },
  tax_optimization: {
    name: 'Optimisation Fiscale IA',
    description: 'Optimisation fiscale continue',
    price: 19900,
    currency: 'usd',
    interval: 'recurring',
    recurring: {
      interval: 'month'
    },
    metadata: {
      upsell_id: 'tax_optimization',
      profit: '159',
      margin: '80'
    }
  },
  growth_strategy: {
    name: 'Stratégie Croissance IA',
    description: 'Plan de croissance personnalisé',
    price: 29900,
    currency: 'usd',
    interval: 'recurring',
    recurring: {
      interval: 'month'
    },
    metadata: {
      upsell_id: 'growth_strategy',
      profit: '224',
      margin: '75'
    }
  },
  legal_services: {
    name: 'Services Juridiques',
    description: 'Support juridique complet',
    price: 39900,
    currency: 'usd',
    interval: 'recurring',
    recurring: {
      interval: 'month'
    },
    metadata: {
      upsell_id: 'legal_services',
      profit: '279',
      margin: '70'
    }
  }
};

// Fonction pour créer un produit Stripe
export async function createStripeProduct(productKey: string, productConfig: any) {
  try {
    // Créer le produit
    const product = await stripe.products.create({
      name: productConfig.name,
      description: productConfig.description,
      metadata: productConfig.metadata
    });

    // Créer le prix
    const priceData: Stripe.PriceCreateParams = {
      product: product.id,
      unit_amount: productConfig.price,
      currency: productConfig.currency,
      metadata: productConfig.metadata
    };

    if (productConfig.interval === 'recurring' && productConfig.recurring) {
      priceData.recurring = productConfig.recurring;
    }

    const price = await stripe.prices.create(priceData);

    return { product, price };
  } catch (error) {
    console.error(`Erreur création produit Stripe ${productKey}:`, error);
    throw error;
  }
}

// Fonction pour créer une session de paiement
export async function createCheckoutSession(
  planId: string,
  upsells: string[] = [],
  customerEmail?: string,
  successUrl?: string,
  cancelUrl?: string
) {
  try {
    const plan = STRIPE_PRODUCTS[planId as keyof typeof STRIPE_PRODUCTS];
    if (!plan) {
      throw new Error(`Plan ${planId} non trouvé`);
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: plan.currency,
          product_data: {
            name: plan.name,
            description: plan.description,
            metadata: plan.metadata
          },
          unit_amount: plan.price
        },
        quantity: 1
      }
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      customer_email: customerEmail || undefined,
      metadata: {
        plan_id: planId,
        upsells: upsells.join(','),
        total_profit: calculateTotalProfit(planId, upsells).toString()
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required'
    });

    return session;
  } catch (error) {
    console.error('Erreur création session Stripe:', error);
    throw error;
  }
}

// Fonction pour calculer le profit total
function calculateTotalProfit(planId: string, upsells: string[]): number {
  const plan = STRIPE_PRODUCTS[planId as keyof typeof STRIPE_PRODUCTS];
  if (!plan) return 0;

  let totalProfit = parseInt(plan.metadata.profit);
  
  // Ajouter les profits des upsells
  for (const upsellId of upsells) {
    // Logique pour calculer le profit des upsells
    totalProfit += 50; // Profit estimé par upsell
  }
  
  return totalProfit;
}

// Fonction pour gérer les webhooks Stripe
export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;
    
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      await handleRecurringPayment(invoice);
      break;
    
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCancelled(subscription);
      break;
    
    default:
      console.log(`Webhook non géré: ${event.type}`);
  }
}

// Gestion du paiement réussi
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    const { plan_id, upsells, total_profit } = session.metadata || {};
    
    // Créer l'entreprise LLC
    await createLLCCompany(session.customer_details, plan_id, upsells?.split(',') || []);
    
    // Envoyer les emails de confirmation
    await sendConfirmationEmails(session.customer_details?.email, plan_id);
    
    // Mettre à jour les analytics
    await updateAnalytics(parseInt(total_profit || '0'));
    
    console.log(`Paiement réussi: ${session.id} - Profit: $${total_profit}`);
  } catch (error) {
    console.error('Erreur traitement paiement:', error);
  }
}

// Gestion des paiements récurrents
async function handleRecurringPayment(invoice: Stripe.Invoice) {
  // Logique pour les services récurrents (comptabilité, conformité, etc.)
  console.log(`Paiement récurrent: ${invoice.id}`);
}

// Gestion de l'annulation d'abonnement
async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  // Logique pour arrêter les services récurrents
  console.log(`Abonnement annulé: ${subscription.id}`);
}

// Fonction pour créer l'entreprise LLC (à implémenter)
async function createLLCCompany(customerDetails: any, planId: string, upsells: string[]) {
  // Logique de formation LLC automatisée
  console.log('Création LLC en cours...');
}

// Fonction pour envoyer les emails de confirmation
async function sendConfirmationEmails(email: string | undefined, planId: string) {
  // Logique d'envoi d'emails
  console.log(`Email de confirmation envoyé à: ${email}`);
}

// Fonction pour mettre à jour les analytics
async function updateAnalytics(profit: number) {
  // Logique de mise à jour des analytics
  console.log(`Analytics mis à jour - Profit: $${profit}`);
} 