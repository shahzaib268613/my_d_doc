import type { ReactNode } from 'react'
import { Container } from '@/shared/components/ui'
import { BrandPartnerships } from '../components/sections/brand-partnerships'
import { Hero } from '../components/sections/hero'
import { LatestPostsSection } from '../components/sections/latest-posts'
import { Newsletter } from '../components/sections/newsletter'
import { SpeakingEngagements } from '../components/sections/speaking-engagements'
import { TopicsV2 } from '../components/home-v2'
import { WhyMyDiabetesDoc } from '../components/sections/why-my-diabetes-doc'

type Props = {
  latestPosts?: ReactNode
}

/** Homepage v4 — glass floating navbar + highlights marquee (former v1 experiment). */
export function HomePage4({ latestPosts }: Props) {
  return (
    <div className="marketing-v4">
      <Hero theme="navy" overlayNav highlightsMarquee />
      <TopicsV2 navyButtons />
      <WhyMyDiabetesDoc />
      <LatestPostsSection>
        {latestPosts ?? (
          <p className="text-sm text-muted-foreground">
            Latest articles will appear here.
          </p>
        )}
      </LatestPostsSection>
      <section className="relative overflow-hidden bg-[#eaf0f8] py-14 text-[#021b44] sm:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute -left-20 -top-10 size-64 rounded-full bg-[#021b44]/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -right-10 size-72 rounded-full bg-[#021b44]/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#061d46]/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2f7fb0]">
              Partner & Speak
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#021b44] sm:text-4xl">
              Partner with a trusted diabetes education voice
            </h2>
            <p className="mt-3 text-[#021b44]/70">
              Collaborate on brand education or book Dr. Leibowitz for keynotes, panels, and
              workshops.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <BrandPartnerships navy />
            <SpeakingEngagements navy />
          </div>
        </Container>
      </section>
      <Newsletter />
    </div>
  )
}
