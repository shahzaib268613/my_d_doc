import { useState } from 'react'
import { AboutCta } from '../components/AboutCta'
import { AboutHero } from '../components/AboutHero'
import { BookAppointmentModal } from '../components/BookAppointmentModal'
import { CareApproach } from '../components/CareApproach'
import { EducationTraining } from '../components/EducationTraining'
import { MeetYourDoctor } from '../components/MeetYourDoctor'
import { Testimonials } from '../components/Testimonials'
import { VisitsLocationInsurance } from '../components/VisitsLocationInsurance'
import { WhatWeHelpWith } from '../components/WhatWeHelpWith'
import { useAboutPageMeta } from '../hooks/useAboutPageMeta'

export function AboutPage() {
  useAboutPageMeta()
  const [appointmentOpen, setAppointmentOpen] = useState(false)

  return (
    <>
      <AboutHero onBookAppointment={() => setAppointmentOpen(true)} />
      <MeetYourDoctor />
      <EducationTraining />
      <WhatWeHelpWith />
      <CareApproach />
      <Testimonials />
      <VisitsLocationInsurance />
      <AboutCta onBookAppointment={() => setAppointmentOpen(true)} />
      <BookAppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  )
}
