'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Shield, 
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Formation LLC", href: "/#services" },
        { name: "EIN & Compte bancaire", href: "/#services" },
        { name: "Services comptables", href: "/#services" },
        { name: "Support IA 24/7", href: "/#features" },
        { name: "Conformité automatique", href: "/#features" }
      ]
    },
    {
      title: "Ressources",
      links: [
        { name: "Calculateur de prix", href: "/dashboard/calculator" },
        { name: "Guide de formation", href: "/guide" },
        { name: "FAQ", href: "/#faq" },
        { name: "Blog", href: "/blog" },
        { name: "Support", href: "/support" }
      ]
    },
    {
      title: "Entreprise",
      links: [
        { name: "À propos", href: "/about" },
        { name: "Notre équipe", href: "/team" },
        { name: "Carrières", href: "/careers" },
        { name: "Partenaires", href: "/partners" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Légal",
      links: [
        { name: "Conditions d'utilisation", href: "/terms" },
        { name: "Politique de confidentialité", href: "/privacy" },
        { name: "Cookies", href: "/cookies" },
        { name: "Mentions légales", href: "/legal" },
        { name: "RGPD", href: "/gdpr" }
      ]
    }
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "text-blue-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "text-blue-700" },
    { name: "Instagram", icon: Instagram, href: "#", color: "text-pink-600" },
    { name: "YouTube", icon: Youtube, href: "#", color: "text-red-600" }
  ]

  const trustIndicators = [
    { icon: Shield, text: "Paiements sécurisés", color: "text-green-600" },
    { icon: Star, text: "4.9/5 étoiles", color: "text-yellow-500" },
    { icon: Building2, text: "2,500+ clients", color: "text-blue-600" },
    { icon: Globe, text: "50+ pays servis", color: "text-purple-600" }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link href="/" className="flex items-center">
                <span className="text-3xl font-bold text-white">ProsperaLink</span>
              </Link>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Service premium de formation d'entreprises LLC aux États-Unis. 
              IA révolutionnaire, formation en 12h, support international 24/7.
            </p>
            
            {/* Trust Indicators */}
            <div className="space-y-3 mb-6">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <indicator.icon className={`w-4 h-4 ${indicator.color}`} />
                  <span className="text-sm text-gray-300">{indicator.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Restez informé
              </h3>
              <p className="text-gray-300">
                Recevez nos dernières actualités, conseils et offres spéciales 
                pour entrepreneurs internationaux.
              </p>
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                S'abonner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <span>© {currentYear} ProsperaLink. Tous droits réservés.</span>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>SSL Sécurisé</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@prosperalink.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-black/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Paiements sécurisés Stripe</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Support multilingue</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Garantie satisfaction 100%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Formation en 12h garantie</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 