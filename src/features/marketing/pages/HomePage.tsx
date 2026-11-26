import type { ReactNode } from 'react'
import { Container } from '@/shared/components/ui'
import { BrandPartnerships } from '../components/sections/brand-partnerships'
import { Hero } from '../components/sections/hero'
import { LatestPostsSection } from '../components/sections/latest-posts'
import { Newsletter } from '../components/sections/newsletter'
import { SpeakingEngagements } from '../components/sections/speaking-engagements'
import { Topics } from '../components/sections/topics'
import { WhyMyDiabetesDoc } from '../components/sections/why-my-diabetes-doc'

type Props = {
  latestPosts?: ReactNode
}

export function HomePage({ latestPosts }: Props) {
  return (
    <>
      <Hero />
      <Topics />
      <WhyMyDiabetesDoc />
      <LatestPostsSection>
        {latestPosts ?? (
          <p className="text-sm text-muted-foreground">
            Latest articles will appear here.
          </p>
        )}
      </LatestPostsSection>
      <section className="relative overflow-hidden bg-surface py-14 text-foreground sm:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute -left-16 top-0 size-52 rounded-full bg-soft"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-0 size-64 rounded-full bg-primary/10"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Partner & Speak
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Partner with a trusted diabetes education voice
            </h2>
            <p className="mt-3 text-muted-foreground">
              Collaborate on brand education or book Dr. Leibowitz for keynotes, panels, and
              workshops.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <BrandPartnerships />
            <SpeakingEngagements />
          </div>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}
