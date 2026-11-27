import { Phone } from 'lucide-react'
import { clinicConfig } from '@/shared/config/clinic'
import { ReusableButton, Container, Reveal, Section } from '@/shared/components/ui'
import { aboutCta, aboutHero } from '../constants/content'

type Props = {
  onBookAppointment: () => void
}

export function AboutHero({ onBookAppointment }: Props) {
  return (
    <Section className="relative overflow-hidden bg-[image:var(--gradient-hero)]">
      <div
        className="pointer-events-none absolute -right-16 top-8 size-56 rounded-full bg-primary/10"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {aboutHero.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {aboutHero.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ReusableButton
                type="button"
                size="lg"
                className="rounded-lg"
                onClick={onBookAppointment}
              >
                {aboutCta.bookLabel}
              </ReusableButton>
              <ReusableButton
                href={clinicConfig.phones.appointments.href}
                variant="outline"
                size="lg"
                className="rounded-lg"
              >
                <Phone className="size-4 text-primary" aria-hidden="true" />
                {aboutCta.callLabel}
              </ReusableButton>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">{aboutHero.facts}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
