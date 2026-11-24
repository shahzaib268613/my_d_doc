import { Mail } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { newsletterContent } from '../../constants/newsletter'
import { NewsletterForm } from '../NewsletterForm'

export function NewsletterV2() {
  return (
    <Section id="newsletter" className="scroll-mt-24 relative overflow-hidden bg-soft py-14 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute left-1/4 top-0 size-40 rounded-full bg-white/80 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 size-56 rounded-full bg-primary/10 blur-2xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-inverse text-white shadow-md">
              <Mail className="size-7" aria-hidden="true" />
            </span>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-inverse/70">
              Newsletter
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-inverse sm:text-4xl">
              {newsletterContent.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-inverse/70">
              {newsletterContent.description}
            </p>
            <NewsletterForm
              variant="band"
              className="mx-auto mt-8 max-w-xl text-left"
              buttonStyle={{ backgroundColor: '#1b2f43', color: '#ffffff' }}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
