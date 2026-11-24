import { Mail } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { newsletterContent } from '../../../constants/newsletter'
import { NewsletterForm } from '../../NewsletterForm'

export function Newsletter() {
  return (
    <Section id="newsletter" className="scroll-mt-24 bg-soft/60 py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-inverse)] px-6 py-10 text-inverse-foreground shadow-lg sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              className="pointer-events-none absolute -left-16 top-0 size-52 rounded-full bg-primary/30 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 right-0 size-64 rounded-full bg-primary/25 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-1/4 top-6 size-24 rounded-full border border-inverse-foreground/10"
              aria-hidden="true"
            />

            <div className="relative mx-auto flex max-w-4xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <div className="min-w-0 flex-1">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md ring-1 ring-primary-foreground/20">
                  <Mail className="size-7" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
                  {newsletterContent.heading}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-inverse-muted sm:text-base">
                  {newsletterContent.description}
                </p>
              </div>
              <div className="w-full min-w-0 lg:max-w-md">
                <NewsletterForm
                  className="relative [&_label]:text-inverse-foreground [&_input]:border-0 [&_input]:bg-inverse-foreground/5 [&_input]:text-inverse-foreground [&_input]:outline-none [&_input]:placeholder:text-inverse-muted [&_input]:focus:border-0 [&_input]:focus:outline-none [&_input]:focus:ring-0 [&_input]:focus-visible:outline-none [&_input]:focus-visible:ring-0 [&_p]:text-inverse-muted"
                  variant="band"
                  buttonClassName="bg-white text-inverse hover:bg-soft"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
