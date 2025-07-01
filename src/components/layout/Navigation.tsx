"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Building2, Calculator, Users, Shield, Bot, Facebook, DollarSign, FileText, Settings, BarChart3, MessageSquare, Globe, Zap } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      name: "Formation LLC",
      href: "#formation",
      icon: Building2,
      description: "Créer votre entreprise en 12h"
    },
    {
      name: "Calculateur",
      href: "#calculator",
      icon: Calculator,
      description: "Prix transparent en temps réel"
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      description: "Gérer votre entreprise",
      requiresAuth: true
    },
    {
      name: "Support IA",
      href: "#ai-support",
      icon: Bot,
      description: "Assistant 24/7 multilingue"
    },
    {
      name: "Réseaux Sociaux",
      href: "#social",
      icon: Facebook,
      description: "Gestion Facebook/Instagram"
    },
    {
      name: "Conformité",
      href: "#compliance",
      icon: Shield,
      description: "Documents et obligations"
    },
    {
      name: "Paiements",
      href: "#payments",
      icon: DollarSign,
      description: "Stripe intégré"
    },
    {
      name: "Documents",
      href: "#documents",
      icon: FileText,
      description: "Upload et gestion"
    }
  ];

  const adminItems = [
    {
      name: "Admin Portal",
      href: "/admin",
      icon: Settings,
      description: "Gestion CRM/ERP",
      requiresAdmin: true
    },
    {
      name: "Analytics",
      href: "#analytics",
      icon: BarChart3,
      description: "Statistiques avancées",
      requiresAdmin: true
    }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ProsperaLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 grid grid-cols-2 gap-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Access Links */}
            <Link href="#calculator" className="text-gray-700 hover:text-blue-600 transition-colors">
              Calculateur
            </Link>
            <Link href="#formation" className="text-gray-700 hover:text-blue-600 transition-colors">
              Formation
            </Link>
            <Link href="#ai-support" className="text-gray-700 hover:text-blue-600 transition-colors">
              IA Support
            </Link>
            <Link href="#social" className="text-gray-700 hover:text-blue-600 transition-colors">
              Réseaux Sociaux
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                {session.user?.role === "ADMIN" && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/auth/signin">
                  <Button size="sm">
                    {session.user?.name || "Mon Compte"}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Commencer
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Admin Items */}
            {session?.user?.role === "ADMIN" && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Administration</h3>
                <div className="grid grid-cols-2 gap-4">
                  {adminItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Auth Buttons */}
            <div className="border-t pt-4">
              {session ? (
                <div className="space-y-3">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full" size="sm">
                      Mon Compte
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full" size="sm">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full" size="sm">
                      Commencer
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 