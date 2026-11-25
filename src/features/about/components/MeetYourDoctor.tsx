import { Container, Reveal, Section } from '@/shared/components/ui'
import { aboutDoctor } from '../constants/content'

export function MeetYourDoctor() {
  return (
    <Section className="bg-surface">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:gap-12">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {aboutDoctor.name}
              </h2>
              <p className="mt-2 text-base font-medium text-foreground/80 sm:text-lg">
                {aboutDoctor.role}
              </p>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                {aboutDoctor.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <figure className="w-full max-w-[22rem] justify-self-center lg:max-w-none lg:justify-self-end">
              {aboutDoctor.photoUrl ? (
                <img
                  src={aboutDoctor.photoUrl}
                  alt={aboutDoctor.photoAlt}
                  className="aspect-[4/5] w-full rounded-2xl object-cover shadow-sm ring-1 ring-border"
                  width={352}
                  height={440}
                />
              ) : (
                <div
                  className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-soft font-display text-5xl font-bold tracking-wide text-primary ring-1 ring-primary/15"
                  role="img"
                  aria-label={aboutDoctor.photoAlt}
                >
                  {aboutDoctor.initials}
                </div>
              )}
            </figure>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
