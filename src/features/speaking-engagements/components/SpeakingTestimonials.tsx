import { Star } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { speakingTestimonials } from '../constants/content'

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className="size-4 fill-accent text-accent"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function SpeakingTestimonials() {
  return (
    <Section className="bg-background">
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Testimonials
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Words From Patients
            </h2>
          </header>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {speakingTestimonials.map((item, index) => (
            <li key={`${item.attribution}-${item.source}`} className="min-w-0">
              <Reveal delayMs={(index % 2) * 70}>
                <figure className="flex h-full flex-col rounded-2xl border border-border/90 bg-surface p-6 shadow-sm sm:p-7">
                  <StarRating />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                    <p>“{item.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-5">
                    <p className="text-sm font-semibold text-foreground">{item.attribution}</p>
                    <p className="text-xs text-muted-foreground">{item.source}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
