import { GraduationCap, School } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { speakerIntroduction } from '../constants/content'

const credentialIcons = [School, GraduationCap]

export function SpeakerIntroduction() {
  return (
    <Section className="bg-background">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Speaker
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {speakerIntroduction.heading}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {speakerIntroduction.biography}
            </p>
          </Reveal>

          <Reveal delayMs={70}>
            <aside className="rounded-2xl border border-border/90 bg-surface p-6 shadow-sm sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {speakerIntroduction.credentialsHeading}
              </h3>
              <ul className="mt-6 space-y-4">
                {speakerIntroduction.credentials.map((item, index) => {
                  const Icon = credentialIcons[index] ?? GraduationCap
                  return (
                    <li key={item} className="flex items-start gap-3">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <p className="pt-2 text-sm leading-relaxed text-foreground sm:text-base">
                        {item}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
