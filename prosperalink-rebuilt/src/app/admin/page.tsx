"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { useState, useEffect } from "react";
import ProgressTracker from "@/components/ProgressTracker";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ConsultantPermission {
  id: string;
  consultantId: string;
  permission: string;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<ConsultantPermission[]>([]);
  const [activeTab, setActiveTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // État pour le formulaire de permissions
  const [permissionForm, setPermissionForm] = useState({
    consultantId: "",
    permission: "",
    canRead: false,
    canWrite: false,
    canDelete: false,
  });

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchUsers();
      fetchPermissions();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch("/api/admin/permissions");
      const data = await response.json();
      setPermissions(data);
    } catch (error) {
      console.error("Erreur lors du chargement des permissions:", error);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error);
    }
  };

  const grantPermission = async () => {
    if (!permissionForm.consultantId || !permissionForm.permission) {
      alert("Veuillez sélectionner un consultant et une permission");
      return;
    }

    try {
      const response = await fetch("/api/admin/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultantId: permissionForm.consultantId,
          permission: permissionForm.permission,
          canRead: permissionForm.canRead,
          canWrite: permissionForm.canWrite,
          canDelete: permissionForm.canDelete,
        }),
      });
      
      if (response.ok) {
        fetchPermissions();
        setPermissionForm({
          consultantId: "",
          permission: "",
          canRead: false,
          canWrite: false,
          canDelete: false,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'attribution des permissions:", error);
    }
  };

  const deletePermission = async (permissionId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette permission ?")) {
      try {
        const response = await fetch(`/api/admin/permissions/${permissionId}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          fetchPermissions();
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la permission:", error);
      }
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!isAdmin(session)) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔐 Panneau d'Administration
          </h1>
          <p className="text-xl text-gray-300">
            Gestion des utilisateurs et des permissions
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="flex space-x-4 mb-8">
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
          <button
            onClick={() => setActiveTab("permissions")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "permissions"
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            🔑 Permissions Consultants
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            📊 Analytics
          </button>
        </div>

        {/* Onglet Utilisateurs */}
        {activeTab === "users" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Gestion des Utilisateurs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="text-sm uppercase bg-white/10">
                  <tr>
                    <th className="px-4 py-3">Nom</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Rôle</th>
                    <th className="px-4 py-3">Date d'inscription</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-white/10">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white"
                        >
                          <option value="VISITOR">Visiteur</option>
                          <option value="CLIENT">Client</option>
                          <option value="CONSULTANT">Consultant</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Gérer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Onglet Permissions */}
        {activeTab === "permissions" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Permissions des Consultants
            </h2>
            
            {/* Formulaire d'attribution de permissions */}
            <div className="mb-8 p-4 bg-white/5 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">
                Attribuer des Permissions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <select
                  value={permissionForm.consultantId}
                  onChange={(e) => setPermissionForm({...permissionForm, consultantId: e.target.value})}
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                >
                  <option value="">Sélectionner un consultant</option>
                  {users.filter(u => u.role === "CONSULTANT").map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                
                <select
                  value={permissionForm.permission}
                  onChange={(e) => setPermissionForm({...permissionForm, permission: e.target.value})}
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                >
                  <option value="">Sélectionner une permission</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="users">Gestion Utilisateurs</option>
                  <option value="companies">Gestion Entreprises</option>
                  <option value="payments">Gestion Paiements</option>
                  <option value="documents">Gestion Documents</option>
                  <option value="analytics">Analytics</option>
                </select>
                
                <div className="flex space-x-4">
                  <label className="flex items-center text-white">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={permissionForm.canRead}
                      onChange={(e) => setPermissionForm({...permissionForm, canRead: e.target.checked})}
                    />
                    Lecture
                  </label>
                  <label className="flex items-center text-white">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={permissionForm.canWrite}
                      onChange={(e) => setPermissionForm({...permissionForm, canWrite: e.target.checked})}
                    />
                    Écriture
                  </label>
                  <label className="flex items-center text-white">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={permissionForm.canDelete}
                      onChange={(e) => setPermissionForm({...permissionForm, canDelete: e.target.checked})}
                    />
                    Suppression
                  </label>
                </div>
                
                <button 
                  onClick={grantPermission}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Attribuer
                </button>
              </div>
            </div>

            {/* Liste des permissions existantes */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="text-sm uppercase bg-white/10">
                  <tr>
                    <th className="px-4 py-3">Consultant</th>
                    <th className="px-4 py-3">Permission</th>
                    <th className="px-4 py-3">Lecture</th>
                    <th className="px-4 py-3">Écriture</th>
                    <th className="px-4 py-3">Suppression</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((perm) => (
                    <tr key={perm.id} className="border-b border-white/10">
                      <td className="px-4 py-3">
                        {users.find(u => u.id === perm.consultantId)?.name}
                      </td>
                      <td className="px-4 py-3">{perm.permission}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          perm.canRead ? "bg-green-600" : "bg-red-600"
                        }`}>
                          {perm.canRead ? "✓" : "✗"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          perm.canWrite ? "bg-green-600" : "bg-red-600"
                        }`}>
                          {perm.canWrite ? "✓" : "✗"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          perm.canDelete ? "bg-green-600" : "bg-red-600"
                        }`}>
                          {perm.canDelete ? "✓" : "✗"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => deletePermission(perm.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Onglet Analytics */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Progrès du Projet */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
                📊 Progrès du Projet
            </h2>
              <ProgressTracker showDetails={true} />
              </div>
              
            {/* Autres analytics peuvent être ajoutés ici */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">
                📈 Métriques Business
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-600/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">ROI Cible</h3>
                  <p className="text-3xl font-bold text-blue-300">660%</p>
                </div>
                <div className="bg-green-600/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">Budget IA</h3>
                  <p className="text-3xl font-bold text-green-300">15,000$/an</p>
                </div>
                <div className="bg-purple-600/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">Conversion</h3>
                  <p className="text-3xl font-bold text-purple-300">{'>'}25%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 