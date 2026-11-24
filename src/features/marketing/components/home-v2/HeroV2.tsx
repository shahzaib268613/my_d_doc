import { ArrowRight, FileText, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import portraitUrl from '../../assets/doctor-portrait-v2.png'
import heroBgDarkUrl from '../../assets/hero-bg-dark.png'
import { siteConfig } from '@/shared/config/site'
import { Button, Container, SocialIcons } from '@/shared/components/ui'
import { heroContent } from '../../constants/hero'

/** Dark cinematic hero for Home v2 only — does not affect v1. */
export function HeroV2() {
  return (
    <section className="relative flex h-[calc(100dvh-5rem)] max-h-[calc(100dvh-5rem)] flex-col overflow-hidden bg-inverse text-inverse-foreground">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src={heroBgDarkUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-inverse/75 via-inverse/40 to-transparent" />
      </div>

      <Container className="relative z-10 grid min-h-0 flex-1 items-center gap-8 py-6 sm:py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:py-10">
        <div className="relative z-20 max-w-xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-soft sm:text-xs">
            {heroContent.eyebrow}
          </p>

          <p className="mt-3 font-display text-xl font-semibold text-soft sm:text-2xl">
            {siteConfig.name}
          </p>
          <h1 className="mt-2 font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
            {heroContent.headline}
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base lg:text-[1.05rem]">
            {heroContent.intro}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href={siteConfig.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="rounded-lg bg-white text-inverse hover:bg-soft"
            >
              <Play className="size-4 fill-current" aria-hidden="true" />
              {heroContent.primaryCta.label}
            </Button>
            <Button
              href={heroContent.secondaryCta.to}
              variant="outline"
              size="lg"
              className="rounded-lg border-white/30 bg-transparent text-white hover:border-white/50 hover:bg-white/10"
            >
              <FileText className="size-4" aria-hidden="true" />
              {heroContent.secondaryCta.label}
            </Button>
          </div>

          <div className="mt-6">
            <p className="mb-2.5 text-sm font-semibold text-white/70">
              {heroContent.socialPrompt}
            </p>
            <SocialIcons
              links={siteConfig.socialLinks}
              className="gap-2.5 [&_a]:rounded-full [&_a]:border [&_a]:border-white/15 [&_a]:bg-white/10 [&_a]:text-white [&_a:hover]:border-white [&_a:hover]:bg-white [&_a:hover]:text-inverse [&_span]:rounded-full [&_span]:border [&_span]:border-white/15 [&_span]:bg-white/10 [&_span]:text-white"
            />
          </div>

          <Link
            to="#"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-soft no-underline transition-opacity hover:opacity-85"
          >
            Meet Dr. Leibowitz
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative z-10 flex min-h-0 w-full items-center justify-center">
          <figure className="mx-auto w-full max-w-[18rem] sm:max-w-[20rem] lg:max-w-[22rem] xl:max-w-[24rem]">
            <img
              src={portraitUrl}
              alt={`${siteConfig.doctor.name}, ${siteConfig.doctor.title}`}
              className="mx-auto h-auto max-h-[min(24rem,calc(100dvh-14rem))] w-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] lg:max-h-[min(28rem,calc(100dvh-12rem))]"
              width={520}
              height={650}
            />
            <figcaption className="mt-3 rounded-2xl border border-inverse-foreground/15 bg-inverse-foreground/[0.08] px-5 py-3.5 text-center shadow-sm backdrop-blur-sm">
              <p className="font-display text-lg font-bold text-white sm:text-xl">
                {siteConfig.doctor.name}
              </p>
              <p className="mt-1 text-sm text-white">
                {siteConfig.doctor.title} · {siteConfig.doctor.credentials}
              </p>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
