'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import About from '@/components/About'
import ServicesGrid from '@/components/ServicesGrid'
import Quiz from '@/components/Quiz'
import BreathingWidget, { BreathingSection } from '@/components/BreathingWidget'
import Testimonials from '@/components/Testimonials'
import LeadMagnet from '@/components/LeadMagnet'
import FAQ from '@/components/FAQ'
import Booking from '@/components/Booking'
import ContactForm from '@/components/ContactForm'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import Footer from '@/components/Footer'
import GlobalParticles from '@/components/GlobalParticles'

export default function HomePage() {
  const [quizOpen, setQuizOpen] = useState(false)
  const [breathingOpen, setBreathingOpen] = useState(false)

  return (
    <main>
      <GlobalParticles />
      <Nav />

      <Hero
        onOpenQuiz={() => setQuizOpen(true)}
        onOpenBreathing={() => setBreathingOpen(true)}
      />

      <TrustBar />

      <About />

      <ServicesGrid />

      <BreathingSection onOpen={() => setBreathingOpen(true)} />

      <Testimonials />

      <LeadMagnet />

      <FAQ />

      <Booking />

      <ContactForm />

      <Footer />

      <WhatsAppFloat />

      {/* Modals */}
      <AnimatePresence>
        {quizOpen && <Quiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {breathingOpen && (
          <BreathingWidget isOpen={breathingOpen} onClose={() => setBreathingOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  )
}
