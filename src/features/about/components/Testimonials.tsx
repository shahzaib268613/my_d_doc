import { Star } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { Container, Reveal, Section } from '@/shared/components/ui'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: rating }, (_, index) => (
        <Star
          key={index}
          className="size-4 fill-accent text-accent"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/** Patient quotes for marketing pages. Renders nothing when the data array is empty. */
export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <Section className="bg-surface">
      <Container>
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What patients say
          </h2>

          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {testimonials.map((item) => (
              <li key={`${item.name}-${item.text}`} className="min-w-0">
                <figure>
                  <StarRating rating={item.rating} />
                  <blockquote className="mt-3 text-base leading-relaxed text-muted-foreground">
                    <p>“{item.text}”</p>
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-foreground">
                    {item.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
