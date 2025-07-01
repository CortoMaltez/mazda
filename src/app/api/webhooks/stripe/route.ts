import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/services/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Erreur de signature webhook:", error);
    return NextResponse.json(
      { error: "Signature invalide" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        
        // Mettre à jour le statut du paiement dans la base de données
        await prisma.payment.updateMany({
          where: {
            stripePaymentId: paymentIntent.id,
          },
          data: {
            status: "COMPLETED",
          },
        });

        // Optionnel : Mettre à jour le statut de l'entreprise
        const payment = await prisma.payment.findFirst({
          where: {
            stripePaymentId: paymentIntent.id,
          },
          include: {
            company: true,
          },
        });

        if (payment?.company) {
          await prisma.company.update({
            where: {
              id: payment.company.id,
            },
            data: {
              status: "ACTIVE",
            },
          });
        }
        break;

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object;
        
        await prisma.payment.updateMany({
          where: {
            stripePaymentId: failedPaymentIntent.id,
          },
          data: {
            status: "FAILED",
          },
        });
        break;

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur lors du traitement du webhook:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 