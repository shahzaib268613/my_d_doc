import { clinicConfig } from './clinic'

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
  clinic: {
    address: clinicConfig.address,
    phone: clinicConfig.phones.appointments.label,
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
      href: 'https://www.instagram.com/mydiabetesdoc/',
    },
    {
      platform: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/mydiabetesdoc/?rdid=WO2CkB2dV9ICi2Pm',
    },
    {
      platform: 'tiktok',
      label: 'TikTok',
      href: 'https://www.tiktok.com/@mydiabetesdoc?_r=1&_t=ZT-97RHmccHHHK',
    },
    {
      platform: 'x',
      label: 'X',
      href: 'https://x.com/mydiabetesdoc77?s=21',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/mydiabetesdoc',
    },
  ] satisfies readonly SocialLink[],
} as const

export function getConfiguredSocialLinks(): Array<SocialLink & { href: string }> {
  return siteConfig.socialLinks.flatMap((link) =>
    link.href ? [{ ...link, href: link.href }] : [],
  )
}
