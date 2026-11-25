import { Link, useLocation } from 'react-router-dom'
import logoUrl from '../../../assets/logo.jpg'
import { siteConfig } from '@/shared/config/site'
import { Container, SocialIcons } from '@/shared/components/ui'
import { newsletterContent } from '../../../constants/newsletter'
import {
  footerQuickLinks,
  footerResourceLinks,
  isNavItemEnabled,
} from '../../../constants/nav'
import { NewsletterForm } from '../../NewsletterForm'

function FooterLinkList({
  heading,
  items,
  pathname,
}: {
  heading: string
  items: Array<{ label: string; to: string }>
  pathname: string
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-white sm:text-xl">{heading}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => {
          const enabled = isNavItemEnabled(item, pathname)
          return (
            <li key={`${item.label}-${item.to}`}>
              <Link
                to={enabled ? item.to : '#'}
                onClick={(event) => {
                  if (!enabled) event.preventDefault()
                }}
                className="text-sm text-inverse-foreground/90 no-underline transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Footer() {
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[image:var(--gradient-inverse)] text-inverse-foreground">
      <div
        className="pointer-events-none absolute -left-16 top-8 size-48 rounded-full bg-primary/25 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-8 size-56 rounded-full bg-primary/20 blur-2xl"
        aria-hidden="true"
      />

      <Container className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt=""
              className="size-11 rounded-lg object-cover ring-1 ring-inverse-foreground/20"
              width={44}
              height={44}
            />
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              {siteConfig.name}
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-inverse-muted">
            Clear, practical diabetes education for patients, caregivers, clinicians, and brands—
            helping you stay informed for everyday health decisions.
          </p>
          <div className="mt-6 [&_a]:rounded-full [&_a]:bg-inverse-foreground/10 [&_a]:text-inverse-foreground [&_a:hover]:bg-primary [&_a:hover]:text-primary-foreground [&_span]:rounded-full [&_span]:bg-inverse-foreground/10 [&_span]:text-inverse-foreground">
            <SocialIcons links={siteConfig.socialLinks} />
          </div>
        </div>

        <FooterLinkList heading="Quick Links" items={footerQuickLinks} pathname={pathname} />
        <FooterLinkList heading="Resources" items={footerResourceLinks} pathname={pathname} />

        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
            {newsletterContent.heading}
          </h3>
          <p className="mt-3 text-sm text-inverse-muted">{newsletterContent.description}</p>
          <NewsletterForm
            variant="stacked"
            className="mt-5"
            buttonStyle={{
              backgroundColor: '#ffffff',
              color: '#1b2f43',
            }}
          />
        </div>
      </Container>

      <div className="relative border-t border-inverse-foreground/15">
        <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-inverse-muted/80">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-xs text-inverse-muted/70 sm:text-right">
            Educational content only—not a substitute for personalized medical advice.
          </p>
        </Container>
      </div>
    </footer>
  )
}
