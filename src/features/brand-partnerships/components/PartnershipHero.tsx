import { Container, ReusableButton, Reveal, Section } from '@/shared/components/ui'
import partnershipHeroBg from '../assets/partnership-hero-bg.jpg'
import { partnershipHero } from '../constants/content'

export function PartnershipHero() {
  return (
    <Section className="relative isolate flex flex-1 flex-col justify-center overflow-hidden py-12 sm:py-14 lg:py-16">
      {/* Full-bleed abstract field */}
      <img
        src={partnershipHeroBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover object-[70%_center]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_srgb,#ECF3F8_92%,transparent)_0%,color-mix(in_srgb,#E8F2F9_72%,transparent)_42%,color-mix(in_srgb,#2F7FB0_18%,transparent)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_35%,color-mix(in_srgb,#ffffff_70%,transparent)_0%,transparent_55%)]"
        aria-hidden="true"
      />

      {/* Layered flowing shapes */}
      <div
        className="pointer-events-none absolute -right-[18%] top-[-20%] size-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#ffffff_55%,transparent)_0%,transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[35%] left-[8%] h-[22rem] w-[52rem] rounded-[100%] bg-[radial-gradient(ellipse,color-mix(in_srgb,#ffffff_65%,transparent)_0%,transparent_70%)] blur-xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-12%] right-[-8%] size-[28rem] rounded-full border border-primary/10 bg-primary/[0.06]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[46%] top-[18%] size-40 rounded-full border border-white/50 bg-white/20 backdrop-blur-[1px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {partnershipHero.eyebrow}
            </p>

            <div
              className="mt-5 h-px w-16 bg-gradient-to-r from-primary via-primary/50 to-transparent"
              aria-hidden="true"
            />

            <h1 className="mt-6 max-w-[16ch] font-display text-[2.6rem] font-bold leading-[1.08] tracking-tight text-inverse sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              {partnershipHero.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
              {partnershipHero.description}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <ReusableButton
                href="#inquiry"
                variant="navy"
                size="lg"
                className="w-full px-7 sm:w-auto"
              >
                {partnershipHero.primaryCta}
              </ReusableButton>
              <ReusableButton
                href="#collaborate"
                variant="outline"
                size="lg"
                className="w-full border-primary/25 bg-white/70 backdrop-blur-sm sm:w-auto"
              >
                {partnershipHero.secondaryCta}
              </ReusableButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
