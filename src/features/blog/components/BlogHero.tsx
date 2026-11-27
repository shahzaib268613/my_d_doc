import blogHeroVisual from '../assets/blog-hero-medical.jpg'
import { Container } from '@/shared/components/ui'

/**
 * Soft sky-blue (--soft) fades across the photo so it doesn't read as a
 * separate cropped panel.
 */
const SEAMLESS_OVERLAY =
  'linear-gradient(90deg, var(--soft) 0%, var(--soft) 42%, color-mix(in srgb, var(--soft) 88%, transparent) 52%, color-mix(in srgb, var(--soft) 45%, transparent) 64%, color-mix(in srgb, var(--soft) 12%, transparent) 78%, transparent 92%)'

/** Softens the photo's left edge into the sky-blue field. */
const IMAGE_MASK =
  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 22%, rgba(0,0,0,0.65) 40%, #000 58%, #000 100%)'

/** Full-bleed Blog listing hero — sky-blue blend into medical image. */
export function BlogHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-soft">
      <div className="relative min-h-[20rem] sm:min-h-[22rem] lg:min-h-[24rem]">
        <img
          src={blogHeroVisual}
          alt=""
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-contain object-right sm:w-[70%] md:w-[62%] lg:w-[58%]"
          style={{
            WebkitMaskImage: IMAGE_MASK,
            maskImage: IMAGE_MASK,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: SEAMLESS_OVERLAY }}
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="flex min-h-[20rem] max-w-xl flex-col justify-center py-10 sm:min-h-[22rem] sm:py-12 md:max-w-[52%] lg:min-h-[24rem] lg:max-w-[48%] lg:py-14">
            <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-surface/80 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-primary shadow-sm">
              Our Blog
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-inverse sm:text-4xl md:text-[2.5rem] md:leading-tight">
              Blog
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Practical diabetes education on nutrition, movement, monitoring, and everyday
              self-care.
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}
