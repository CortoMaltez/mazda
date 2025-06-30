"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { isClient, isConsultant, isAdmin } from "@/lib/auth";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menuItems = [
    { name: "Accueil", href: "/#hero" },
    { name: "Problème", href: "/#problem" },
    { name: "Solution", href: "/#solution" },
    { name: "Services", href: "/#services" },
    { name: "Processus", href: "/#process" },
    { name: "Tarifs", href: "/#pricing" },
    { name: "Témoignages", href: "/#testimonials" },
    { name: "FAQ", href: "/#faq" },
  ];

  const serviceItems = [
    { name: "Formation LLC", href: "/dashboard/calculator" },
    { name: "EIN & Compte bancaire", href: "/dashboard/calculator" },
    { name: "Services comptables", href: "/dashboard/calculator" },
  ];

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "CLIENT": return "Client";
      case "CONSULTANT": return "Consultant";
      case "ADMIN": return "Administrateur";
      default: return "Utilisateur";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "CLIENT": return "text-green-600";
      case "CONSULTANT": return "text-blue-600";
      case "ADMIN": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">ProsperaLink</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isServicesOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {serviceItems.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{session.user.name}</span>
                  <span className={`text-xs ${getRoleColor(session.user.role)}`}>
                    ({getRoleDisplayName(session.user.role)})
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    
                    {isConsultant(session) && (
                      <Link
                        href="/consultant"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Espace Consultant
                      </Link>
                    )}
                    
                    {isAdmin(session) && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Administration
                      </Link>
                    )}
                    
                    <button
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Se connecter</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Commencer</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Services */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Services
              </div>
              {serviceItems.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>

            {/* Mobile User Menu */}
            {session ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Compte
                </div>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                
                {isConsultant(session) && (
                  <Link
                    href="/consultant"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Espace Consultant
                  </Link>
                )}
                
                {isAdmin(session) && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Administration
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </button>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Commencer
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 