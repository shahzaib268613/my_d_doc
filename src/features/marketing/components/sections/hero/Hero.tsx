import { FileText, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/shared/config/site'
import { Button, Container, GridBackground, SocialIcons } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import heroBgUrl from '../../../assets/hero-bg.png'
import { heroContent } from '../../../constants/hero'
import { Highlights } from '../highlights'
import { HighlightsMarquee } from '../highlights/HighlightsMarquee'
import { DoctorPortrait } from './DoctorPortrait'

type Props = {
  /** Navy grid hero (v4). Default is the classic light hero image (v1). */
  theme?: 'classic' | 'navy'
  /** Leave room for a fixed glass navbar (v4). */
  overlayNav?: boolean
  /** Marquee trust strip (v4); default is the static grid. */
  highlightsMarquee?: boolean
}

export function Hero({
  theme = 'classic',
  overlayNav = false,
  highlightsMarquee = false,
}: Props) {
  const isNavy = theme === 'navy'
  const highlights = highlightsMarquee ? <HighlightsMarquee /> : <Highlights />

  const content = (
    <>
      <Container
        className={cn(
          'relative z-10 flex min-h-0 flex-1 flex-col justify-center',
          overlayNav
            ? 'pb-5 pt-24 sm:pb-6 sm:pt-28 lg:pb-7'
            : 'py-5 sm:py-6 lg:py-7',
        )}
      >
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-4 xl:gap-5">
          <div className="max-w-xl">
            <p
              className={cn(
                'text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm',
                isNavy ? 'text-[#2f7fb0]' : 'text-primary',
              )}
            >
              {heroContent.eyebrow}
            </p>
            <p
              className={cn(
                'mt-2.5 font-display text-sm font-semibold sm:text-base',
                isNavy ? 'text-white' : 'text-inverse',
              )}
            >
              {heroContent.brandLead}
            </p>
            <h1
              className={cn(
                'mt-2 font-display text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.65rem]',
                isNavy ? 'text-white' : 'text-foreground',
              )}
            >
              {heroContent.headline}
            </h1>
            <p
              className={cn(
                'mt-3.5 text-sm leading-relaxed sm:text-base',
                isNavy ? 'text-white/75' : 'text-foreground/80',
              )}
            >
              {heroContent.intro}
            </p>

            <div
              className={cn(
                'mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 pl-3.5',
                isNavy ? 'border-[#2f7fb0]' : 'border-primary',
              )}
            >
              <span
                className={cn(
                  'font-display text-base font-semibold',
                  isNavy ? 'text-white' : 'text-foreground',
                )}
              >
                {siteConfig.doctor.name}
              </span>
              <span
                className={cn(
                  'hidden sm:inline',
                  isNavy ? 'text-white/40' : 'text-border',
                )}
                aria-hidden="true"
              >
                ·
              </span>
              <span
                className={cn(
                  'text-sm',
                  isNavy ? 'text-white/70' : 'text-muted-foreground',
                )}
              >
                {siteConfig.doctor.title}
              </span>
              <span
                className={cn(
                  'w-full text-sm sm:w-auto',
                  isNavy ? 'text-white/70' : 'text-muted-foreground',
                )}
              >
                {siteConfig.doctor.credentials}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className={cn(
                  'rounded-lg',
                  isNavy && 'bg-white text-[#021b44] hover:bg-white/90',
                )}
              >
                <Play className="size-4 fill-current" aria-hidden="true" />
                {heroContent.primaryCta.label}
              </Button>
              <Button
                href="/blog"
                variant="outline"
                size="lg"
                className={cn(
                  'rounded-lg',
                  isNavy
                    ? 'border-white/30 bg-transparent text-white hover:border-white/50 hover:bg-white/10'
                    : 'border-primary/45 bg-surface/90 text-foreground hover:bg-soft',
                )}
              >
                <FileText
                  className={cn('size-4', isNavy ? 'text-white' : 'text-primary')}
                  aria-hidden="true"
                />
                {heroContent.secondaryCta.label}
              </Button>
            </div>

            <div className="mt-6 sm:mt-7">
              <p
                className={cn(
                  'mb-2.5 text-sm font-semibold',
                  isNavy ? 'text-white/65' : 'text-foreground/70',
                )}
              >
                {heroContent.socialPrompt}
              </p>
              <SocialIcons
                links={siteConfig.socialLinks}
                className={
                  isNavy
                    ? '[&_a]:rounded-full [&_a]:border [&_a]:border-white/20 [&_a]:bg-white/10 [&_a]:text-white [&_a]:shadow-sm [&_a:hover]:border-white [&_a:hover]:bg-white [&_a:hover]:text-[#021b44] [&_span]:rounded-full [&_span]:border [&_span]:border-white/20 [&_span]:bg-white/10 [&_span]:text-white'
                    : '[&_a]:rounded-full [&_a]:border [&_a]:border-border [&_a]:bg-surface [&_a]:text-foreground [&_a]:shadow-sm [&_a:hover]:border-primary/40 [&_a:hover]:bg-soft [&_span]:rounded-full [&_span]:border [&_span]:border-border [&_span]:bg-surface [&_span]:text-foreground [&_span]:shadow-sm'
                }
              />
            </div>
          </div>

          <div className="flex w-full justify-end">
            <DoctorPortrait />
          </div>
        </div>

        <p className="sr-only">
          Learn more on the <Link to="#">About</Link> page.
        </p>
      </Container>

      <div className="relative z-10 shrink-0">{highlights}</div>
    </>
  )

  if (isNavy) {
    return (
      <GridBackground
        variant="hero"
        glow="right"
        showWave
        className={cn('flex flex-col', overlayNav ? 'min-h-dvh' : 'min-h-[calc(100dvh-5rem)]')}
      >
        {content}
      </GridBackground>
    )
  }

  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col bg-soft">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src={heroBgUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-soft/80 via-transparent to-surface/40" />
      </div>
      {content}
    </section>
  )
}
