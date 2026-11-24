import type { ComponentType, SVGProps } from 'react'
import type { SocialLink, SocialPlatform } from '@/shared/config/site'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from '@/shared/components/icons'
import { cn } from '@/shared/utils/cn'

const iconMap: Record<SocialPlatform, ComponentType<SVGProps<SVGSVGElement>>> = {
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
}

type Props = {
  links: readonly SocialLink[]
  className?: string
  iconClassName?: string
}

export function SocialIcons({
  links,
  className,
  iconClassName = 'size-5',
}: Props) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {links.map((link) => {
        const Icon = iconMap[link.platform]
        const classNames =
          'inline-flex size-[var(--spacing-touch)] items-center justify-center rounded-md text-foreground transition-colors hover:bg-soft hover:text-primary'

        if (!link.href) {
          return (
            <span
              key={link.platform}
              aria-label={`${link.label} (coming soon)`}
              title={`${link.label} — TODO(content)`}
              className={cn(classNames, 'cursor-default opacity-70')}
            >
              <Icon className={iconClassName} />
            </span>
          )
        }

        return (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={classNames}
          >
            <Icon className={iconClassName} />
          </a>
        )
      })}
    </div>
  )
}
