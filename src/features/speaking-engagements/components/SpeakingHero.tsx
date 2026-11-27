import { GraduationCap, Mic2 } from 'lucide-react'
import { Container, ReusableButton, Reveal, Section } from '@/shared/components/ui'
import { siteConfig } from '@/shared/config/site'
import doctorPortrait from '@/features/about/assets/doctor.png'
import { speakingHero } from '../constants/content'

const badgeIcons = [Mic2, GraduationCap]

export function SpeakingHero() {
  return (
    <Section className="relative overflow-hidden bg-[image:var(--gradient-hero)] pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
      <div
        className="pointer-events-none absolute -left-20 top-16 size-56 rounded-full bg-soft"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-8 size-64 rounded-full bg-primary/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[18%] top-12 hidden size-24 rounded-full border border-primary/20 lg:block"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,22rem)] lg:gap-12">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              {speakingHero.eyebrow}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.15rem] lg:leading-[1.1]">
              {speakingHero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {speakingHero.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {speakingHero.badges.map((badge, index) => {
                const Icon = badgeIcons[index] ?? Mic2
                return (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-3.5 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm"
                  >
                    <Icon className="size-3.5 text-primary" aria-hidden="true" />
                    {badge}
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ReusableButton
                href="#invite"
                variant="navy"
                size="lg"
                className="w-full sm:w-auto"
              >
                {speakingHero.primaryCta}
              </ReusableButton>
              <ReusableButton
                href="#topics"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {speakingHero.secondaryCta}
              </ReusableButton>
            </div>
          </Reveal>

          <Reveal delayMs={80} className="justify-self-center lg:justify-self-end">
            <figure className="relative w-full max-w-[19rem] sm:max-w-[21rem]">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-soft/80"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border/80 bg-background shadow-md">
                <img
                  src={doctorPortrait}
                  alt={`${siteConfig.doctor.name}, ${siteConfig.doctor.title}`}
                  width={420}
                  height={520}
                  className="aspect-[4/5] w-full object-cover object-[center_18%]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                    {siteConfig.doctor.name}
                  </p>
                  <p className="mt-1 text-base font-medium text-foreground/80 sm:text-lg">
                    {siteConfig.doctor.title}
                  </p>
                </figcaption>
              </div>
              <span
                className="absolute -left-3 top-8 inline-flex size-11 items-center justify-center rounded-full bg-inverse text-inverse-foreground shadow-md ring-4 ring-soft"
                aria-hidden="true"
              >
                <Mic2 className="size-5" strokeWidth={1.75} />
              </span>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
