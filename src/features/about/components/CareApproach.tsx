import { Container, Reveal, Section } from '@/shared/components/ui'
import { careApproachItems } from '../constants/content'

export function CareApproach() {
  return (
    <Section className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -left-16 top-10 size-52 rounded-full bg-soft"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our approach
          </h2>

          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {careApproachItems.map((item) => (
              <li key={item.title} className="min-w-0">
                <h3 className="font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
