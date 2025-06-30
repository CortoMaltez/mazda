import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createPaymentIntent } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { amount, currency = 'usd', companyId } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Montant invalide" },
        { status: 400 }
      );
    }

    // Créer le PaymentIntent avec Stripe
    const paymentIntent = await createPaymentIntent(amount, currency);

    // Enregistrer le paiement dans la base de données
    const payment = await prisma.payment.create({
      data: {
        amount,
        currency,
        status: 'PENDING',
        stripePaymentId: paymentIntent.id,
        userId: session.user.id,
        companyId: companyId || null,
      },
      include: {
        company: true,
      }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
    });
  } catch (error) {
    console.error("Erreur lors de la création du PaymentIntent:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
} 