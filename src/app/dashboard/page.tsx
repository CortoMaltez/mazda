"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AIAssistant from '@/components/AIAssistant';

interface Company {
  id: string;
  name: string;
  state: string;
  businessType: string;
  status: string;
  formationDate: string | null;
  createdAt: string;
  documents: any[];
  payments: any[];
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboardData();
    }
  }, [status]);

  const fetchDashboardData = async () => {
    try {
      const [companiesRes, paymentsRes] = await Promise.all([
        fetch("/api/companies"),
        fetch("/api/payments")
      ]);

      if (companiesRes.ok) {
        const companiesData = await companiesRes.json();
        setCompanies(companiesData);
      }

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPayments(paymentsData);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-600 bg-green-100";
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "SUSPENDED":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600 bg-green-100";
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "FAILED":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="mb-4">Vous devez être connecté pour accéder au dashboard.</p>
          <Link href="/auth/signin">
            <Button>Se connecter</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Bonjour, {session?.user?.name} !
        </h1>
        <p className="text-gray-600">
          Voici un aperçu de vos entreprises et activités récentes.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entreprises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-muted-foreground">
              Total des entreprises
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground">
              Total des transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${payments
                .filter(p => p.status === "COMPLETED")
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Revenus totaux
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/calculator">
              <Button variant="outline">
                Calculer un prix
              </Button>
            </Link>
            <Button variant="outline">
              Créer une entreprise
            </Button>
            <Button variant="outline">
              Voir les documents
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Entreprises récentes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Entreprises récentes</CardTitle>
        </CardHeader>
        <CardContent>
          {companies.length === 0 ? (
            <p className="text-gray-500">Aucune entreprise créée pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {companies.slice(0, 5).map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-sm text-gray-600">
                      {company.state} • {company.businessType}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        company.status
                      )}`}
                    >
                      {company.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Paiements récents */}
      <Card>
        <CardHeader>
          <CardTitle>Paiements récents</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-gray-500">Aucun paiement effectué pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {payments.slice(0, 5).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">
                      ${payment.amount} {payment.currency.toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <AIAssistant />
    </div>
  );
} 