import { Container, Reveal, Section } from '@/shared/components/ui'
import educationTrainingImage from '../assets/edu_training.jpg'
import { educationFacts } from '../constants/content'

export function EducationTraining() {
  return (
    <Section className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -right-12 top-12 size-48 rounded-full bg-primary/10"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Education and training
          </h2>
        </Reveal>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,30rem)] lg:gap-12">
          <ol className="max-w-3xl space-y-0 border-l border-border pl-6 sm:pl-8">
            {educationFacts.map((fact, index) => (
              <li key={fact} className="relative pb-6 last:pb-0">
                <span
                  className="absolute -left-[1.625rem] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-background sm:-left-[2.125rem]"
                  aria-hidden="true"
                />
                <Reveal delayMs={index * 60}>
                  <p className="text-base leading-relaxed text-foreground sm:text-lg">{fact}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="w-full max-w-[30rem] justify-self-center lg:justify-self-end">
            <img
              src={educationTrainingImage}
              alt="A stack of books with eyeglasses on top"
              width={600}
              height={400}
              className="aspect-[3/2] w-full rounded-xl object-cover"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
