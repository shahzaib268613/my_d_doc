import { Container, Reveal, Section } from '@/shared/components/ui'
import { processSteps } from '../constants/content'

export function HowItWorks() {
  return (
    <Section className="bg-[#ECF3F8]">
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Process
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
          </header>
        </Reveal>

        <ol className="relative grid gap-8 sm:grid-cols-3 sm:gap-6">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden h-px bg-border sm:block"
            aria-hidden="true"
          />
          {processSteps.map((step, index) => (
            <li key={step.title} className="relative min-w-0 text-center sm:px-2">
              <Reveal delayMs={index * 60}>
                <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-primary bg-surface font-display text-lg font-bold text-primary shadow-sm">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
