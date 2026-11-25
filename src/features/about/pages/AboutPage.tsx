import { AboutCta } from '../components/AboutCta'
import { AboutHero } from '../components/AboutHero'
import { CareApproach } from '../components/CareApproach'
import { EducationTraining } from '../components/EducationTraining'
import { MeetYourDoctor } from '../components/MeetYourDoctor'
import { Testimonials } from '../components/Testimonials'
import { VisitsLocationInsurance } from '../components/VisitsLocationInsurance'
import { WhatWeHelpWith } from '../components/WhatWeHelpWith'
import { useAboutPageMeta } from '../hooks/useAboutPageMeta'

export function AboutPage() {
  useAboutPageMeta()

  return (
    <>
      <AboutHero />
      <MeetYourDoctor />
      <EducationTraining />
      <WhatWeHelpWith />
      <CareApproach />
      <Testimonials />
      <VisitsLocationInsurance />
      <AboutCta />
    </>
  )
}
