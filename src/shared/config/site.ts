export type SocialPlatform =
  | 'youtube'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'x'
  | 'linkedin'

export type SocialLink = {
  platform: SocialPlatform
  label: string
  href: string | null
}

const youtubeUrl = 'https://www.youtube.com/@MyDiabetesDoc'

export const siteConfig = {
  name: 'My Diabetes Doc',
  tagline: 'Diabetes education and medical media',
  description:
    'Dr. Jonas Leibowitz is an endocrinologist with over 30 years of clinical experience, sharing practical diabetes education for patients, caregivers, clinicians, and brands.',
  contactEmail: 'hello@mydiabetesdoc.com',
  newsletterEmail: 'hello@mydiabetesdoc.com',
  youtubeUrl,
  doctor: {
    name: 'Dr. Jonas Leibowitz',
    title: 'Endocrinologist',
    credentials: '30+ years of clinical experience',
  },
  socialLinks: [
    {
      platform: 'youtube',
      label: 'YouTube',
      href: youtubeUrl,
    },
    {
      platform: 'instagram',
      label: 'Instagram',
      href: null, // TODO(content)
    },
    {
      platform: 'facebook',
      label: 'Facebook',
      href: null, // TODO(content)
    },
    {
      platform: 'tiktok',
      label: 'TikTok',
      href: null, // TODO(content)
    },
    {
      platform: 'x',
      label: 'X',
      href: null, // TODO(content)
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      href: null, // TODO(content)
    },
  ] satisfies readonly SocialLink[],
} as const

export function getConfiguredSocialLinks(): Array<SocialLink & { href: string }> {
  return siteConfig.socialLinks.flatMap((link) =>
    link.href ? [{ ...link, href: link.href }] : [],
  )
}
