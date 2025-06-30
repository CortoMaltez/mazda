import { Metadata } from 'next';
import { Hero } from '@/components/Hero'
import { Problem } from '@/components/Problem'
import { Solution } from '@/components/Solution'
import { Services } from '@/components/Services'
import { Features } from '@/components/Features'
import { PricingSection } from '@/components/PricingSection'
import { PriceCalculator } from '@/components/PriceCalculator'
import { StateComparison } from '@/components/StateComparison'
import { Process } from '@/components/Process'
import { Stats } from '@/components/Stats'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { CTA } from '@/components/CTA'
import ScrollToTop from "@/components/ScrollToTop";
import AIAssistant from "@/components/AIAssistant";
import ConversionOptimizer from "@/components/ConversionOptimizer";
import GoalTracker from "@/components/GoalTracker";
import Calendar from "@/components/Calendar";
import AIChatbot from "@/components/AIChatbot";
import DiscreetAccessWrapper from "@/components/DiscreetAccessWrapper";
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Users, TrendingUp, Shield, Zap, Globe, Building2, Calculator, Brain, ArrowRight, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ProsperaLink - Formation d\'entreprises LLC aux États-Unis | IA Révolutionnaire',
  description: 'Formation d\'entreprises LLC en 12h grâce à l\'IA. Service premium pour entrepreneurs internationaux. Formation rapide, support IA 24/7, conformité garantie.',
  keywords: ['LLC', 'formation entreprise', 'Delaware', 'Wyoming', 'EIN', 'entrepreneurs internationaux', 'conformité américaine', 'IA', 'intelligence artificielle'],
  openGraph: {
    title: 'ProsperaLink - Formation d\'entreprises LLC avec IA',
    description: 'Service premium de formation d\'entreprises LLC avec IA. Formation en 12h, support IA 24/7, conformité garantie.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Features />
      <PricingSection />
      <PriceCalculator />
      <StateComparison />
      <Process />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  )
}
