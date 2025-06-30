"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isConsultant } from "@/lib/auth";
import { useState, useEffect } from "react";

interface Permission {
  permission: string;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

export default function ConsultantPage() {
  const { data: session, status } = useSession();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (session?.user?.role === "CONSULTANT") {
      fetchPermissions();
    }
  }, [session]);

  const fetchPermissions = async () => {
    try {
      const response = await fetch("/api/consultant/permissions");
      const data = await response.json();
      setPermissions(data);
    } catch (error) {
      console.error("Erreur lors du chargement des permissions:", error);
    }
  };

  const hasPermission = (permission: string, action: 'read' | 'write' | 'delete' = 'read') => {
    const perm = permissions.find(p => p.permission === permission);
    if (!perm) return false;
    
    switch (action) {
      case 'read': return perm.canRead;
      case 'write': return perm.canWrite;
      case 'delete': return perm.canDelete;
      default: return false;
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!isConsultant(session)) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            👨‍💼 Espace Consultant
          </h1>
          <p className="text-xl text-gray-300">
            Accès aux fonctionnalités selon vos permissions
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="flex flex-wrap space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            📊 Dashboard
          </button>
          
          {hasPermission("users") && (
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === "users"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              👥 Utilisateurs
            </button>
          )}
          
          {hasPermission("companies") && (
            <button
              onClick={() => setActiveTab("companies")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === "companies"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              🏢 Entreprises
            </button>
          )}
          
          {hasPermission("payments") && (
            <button
              onClick={() => setActiveTab("payments")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === "payments"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              💳 Paiements
            </button>
          )}
          
          {hasPermission("documents") && (
            <button
              onClick={() => setActiveTab("documents")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === "documents"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              📄 Documents
            </button>
          )}
          
          {hasPermission("analytics") && (
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === "analytics"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              📈 Analytics
            </button>
          )}
        </div>

        {/* Onglet Dashboard */}
        {activeTab === "dashboard" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Dashboard Consultant
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Vos Permissions
                </h3>
                <div className="space-y-2">
                  {permissions.map((perm) => (
                    <div key={perm.permission} className="flex justify-between items-center">
                      <span className="text-gray-300 capitalize">{perm.permission}</span>
                      <div className="flex space-x-2">
                        {perm.canRead && <span className="text-green-400 text-xs">L</span>}
                        {perm.canWrite && <span className="text-blue-400 text-xs">E</span>}
                        {perm.canDelete && <span className="text-red-400 text-xs">S</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Actions Rapides
                </h3>
                <div className="space-y-2">
                  {hasPermission("users") && (
                    <button className="w-full text-left text-gray-300 hover:text-white p-2 rounded bg-white/5">
                      Voir les utilisateurs
                    </button>
                  )}
                  {hasPermission("companies") && (
                    <button className="w-full text-left text-gray-300 hover:text-white p-2 rounded bg-white/5">
                      Gérer les entreprises
                    </button>
                  )}
                  {hasPermission("payments") && (
                    <button className="w-full text-left text-gray-300 hover:text-white p-2 rounded bg-white/5">
                      Vérifier les paiements
                    </button>
                  )}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Informations
                </h3>
                <div className="space-y-2 text-gray-300">
                  <p>Rôle: Consultant</p>
                  <p>Permissions accordées: {permissions.length}</p>
                  <p>Dernière connexion: Aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Utilisateurs */}
        {activeTab === "users" && hasPermission("users") && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Gestion des Utilisateurs
            </h2>
            <div className="text-gray-300">
              {hasPermission("users", "write") ? (
                <p>Vous pouvez lire et modifier les utilisateurs.</p>
              ) : (
                <p>Vous pouvez uniquement consulter les utilisateurs.</p>
              )}
            </div>
          </div>
        )}

        {/* Onglet Entreprises */}
        {activeTab === "companies" && hasPermission("companies") && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Gestion des Entreprises
            </h2>
            <div className="text-gray-300">
              {hasPermission("companies", "write") ? (
                <p>Vous pouvez lire et modifier les entreprises.</p>
              ) : (
                <p>Vous pouvez uniquement consulter les entreprises.</p>
              )}
            </div>
          </div>
        )}

        {/* Onglet Paiements */}
        {activeTab === "payments" && hasPermission("payments") && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Gestion des Paiements
            </h2>
            <div className="text-gray-300">
              {hasPermission("payments", "write") ? (
                <p>Vous pouvez lire et modifier les paiements.</p>
              ) : (
                <p>Vous pouvez uniquement consulter les paiements.</p>
              )}
            </div>
          </div>
        )}

        {/* Onglet Documents */}
        {activeTab === "documents" && hasPermission("documents") && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Gestion des Documents
            </h2>
            <div className="text-gray-300">
              {hasPermission("documents", "write") ? (
                <p>Vous pouvez lire et modifier les documents.</p>
              ) : (
                <p>Vous pouvez uniquement consulter les documents.</p>
              )}
            </div>
          </div>
        )}

        {/* Onglet Analytics */}
        {activeTab === "analytics" && hasPermission("analytics") && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Analytics et Statistiques
            </h2>
            <div className="text-gray-300">
              <p>Accès aux données analytiques selon vos permissions.</p>
            </div>
          </div>
        )}

        {/* Message si aucune permission */}
        {!permissions.length && (
          <div className="bg-yellow-500/20 backdrop-blur-lg rounded-lg p-6 border border-yellow-500/30">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              ⚠️ Aucune Permission Accordée
            </h2>
            <p className="text-yellow-300">
              Vous n'avez pas encore de permissions accordées par un administrateur. 
              Veuillez contacter votre administrateur pour obtenir l'accès aux fonctionnalités.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 