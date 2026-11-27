import { Eye, Mail, Share2, Users } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'
import { audienceStats, type AudienceStat } from '../constants/content'
import { useCountUp } from '../hooks/useCountUp'

const icons = {
  mail: Mail,
  users: Users,
  eye: Eye,
  share: Share2,
} as const

function formatStat(value: number, suffix?: string) {
  return `${value.toLocaleString('en-US')}${suffix ?? ''}`
}

function AudienceStatCard({
  stat,
  active,
  delayMs,
}: {
  stat: AudienceStat
  active: boolean
  delayMs: number
}) {
  const count = useCountUp(stat.value, active)
  const Icon = icons[stat.icon] ?? Users

  return (
    <Reveal delayMs={delayMs}>
      <article className="flex h-full flex-col rounded-2xl border border-border/90 bg-[#ECF3F8]/55 p-6 shadow-sm sm:p-7">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-primary">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <p className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground tabular-nums sm:text-4xl">
          {formatStat(count, stat.suffix)}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{stat.label}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
      </article>
    </Reveal>
  )
}

/**
 * Audience metrics for brand partners.
 * Dummy stats animate upward when the section enters the viewport.
 * TODO: Replace with verified newsletter, social, and blog analytics.
 */
export function AudienceReach() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.25,
    rootMargin: '0px 0px -8% 0px',
  })

  if (audienceStats.length === 0) return null

  return (
    <Section className="bg-white">
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Reach
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Audience &amp; Reach
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Sample reach metrics that animate as you scroll — replace with verified figures
              before launch.
            </p>
          </header>
        </Reveal>

        <div
          ref={ref}
          className={`grid gap-4 sm:grid-cols-2 lg:gap-5 ${
            audienceStats.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
          }`}
        >
          {audienceStats.map((stat, index) => (
            <AudienceStatCard
              key={stat.label}
              stat={stat}
              active={visible}
              delayMs={index * 60}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
