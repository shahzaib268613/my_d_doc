import { ArrowUpRight, Phone } from 'lucide-react'
import { clinicConfig } from '@/shared/config/clinic'
import { ReusableButton, Container, Reveal, Section } from '@/shared/components/ui'
import { aboutCta } from '../constants/content'

type Props = {
  onBookAppointment: () => void
}

export function AboutCta({ onBookAppointment }: Props) {
  return (
    <Section>
      <Container>
        <Reveal>
          <article className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-8 text-primary-foreground shadow-lg sm:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-primary-foreground/10"
              aria-hidden="true"
            />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">{aboutCta.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
                {aboutCta.text}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ReusableButton
                  type="button"
                  size="lg"
                  className="rounded-lg bg-surface text-foreground hover:bg-soft"
                  onClick={onBookAppointment}
                >
                  {aboutCta.bookLabel}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </ReusableButton>
                <ReusableButton
                  href={clinicConfig.phones.appointments.href}
                  size="lg"
                  className="rounded-lg border border-primary-foreground/40 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {aboutCta.callLabel}
                </ReusableButton>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </Section>
  )
}
