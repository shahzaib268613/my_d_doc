import type { PostFaq } from '@/features/blog/types/Post'
import castleConnollyImg from '../assets/castle-connolly.png'
import medidataImg from '../assets/medidata.png'
import nyMagazineImg from '../assets/ny-magazine.png'
import nyTopDocsImg from '../assets/ny-topdocs.png'
import nymcImg from '../assets/nymc.png'
import nytImg from '../assets/nyt.png'
import westchesterMagazineImg from '../assets/westchester-magazine.png'
import whitePlainsHospitalImg from '../assets/white-plains-hospital.png'
import yonkersCouncilImg from '../assets/yonkers-council.png'

export const brandPartnershipsMeta = {
  title: 'Brand Partnerships | My Diabetes Doc',
  description:
    'Partner with Dr. Jonas Leibowitz, MD, to educate, inform, and improve hormonal and diabetes health with a trusted endocrinology voice.',
} as const

export const partnershipHero = {
  eyebrow: 'Brand Partnerships',
  title: 'Partner With a Trusted Voice in Endocrinology',
  description:
    'Collaborate with Dr. Jonas Leibowitz, MD, to educate, inform, and improve hormonal health in our community.',
  primaryCta: 'Start a Partnership Inquiry',
  secondaryCta: 'View Collaboration Options',
} as const

export const trustStats = [
  { label: '4.93/5 Rating', detail: 'Patient satisfaction', icon: 'star' as const },
  { label: '625+ Reviews', detail: 'Across care platforms', icon: 'reviews' as const },
  { label: 'Top Doctor Badge', detail: 'Recognized clinical excellence', icon: 'trophy' as const },
] as const

export const whyPartner = [
  {
    title: 'Credibility',
    description: 'A trusted endocrinologist in Yonkers, NY.',
    icon: 'badge' as const,
  },
  {
    title: 'Patient Trust',
    description: 'A loyal and engaged patient community.',
    icon: 'heart' as const,
  },
  {
    title: 'Educator and Communicator',
    description: 'Clear, responsible health education for brand audiences.',
    icon: 'message' as const,
  },
] as const

export const collaborateWays = [
  {
    title: 'Educational Content',
    description: 'Clear, evidence-based content for patients and caregivers.',
    icon: 'book' as const,
  },
  {
    title: 'Expert Commentary',
    description: 'Trusted clinical perspective for media and campaigns.',
    icon: 'message' as const,
  },
  {
    title: 'Product Education',
    description: 'Responsible education around therapies and tools.',
    icon: 'package' as const,
  },
  {
    title: 'Community Health Events',
    description: 'Local initiatives that support better endocrine health.',
    icon: 'users' as const,
  },
  {
    title: 'Telehealth Awareness',
    description: 'Practical guidance that expands access to care.',
    icon: 'monitor' as const,
  },
  {
    title: 'Sponsored Webinars',
    description: 'Brand-supported educational sessions delivered with clinical clarity.',
    icon: 'video' as const,
  },
] as const

export type AwardItem = {
  title: string
  caption?: string
  year?: string
  image: string
}

export const awards: AwardItem[] = [
  {
    title: 'Castle Connolly Top Doctors',
    caption: '5 Years Most Nominated',
    year: '2025',
    image: castleConnollyImg,
  },
  {
    title: 'NY TopDocs',
    image: nyTopDocsImg,
  },
  {
    title: 'New York Magazine',
    caption: "Rated one of New York Magazine's Best Doctors",
    image: nyMagazineImg,
  },
  {
    title: 'Westchester Magazine Top Docs',
    year: '2005-2026',
    image: westchesterMagazineImg,
  },
  {
    title: 'Medidata',
    caption: 'Certified Professional',
    image: medidataImg,
  },
  {
    title: 'White Plains Hospital',
    caption: 'Chief of Endocrinology',
    year: '2008-2012',
    image: whitePlainsHospitalImg,
  },
  {
    title: 'Yonkers City Council',
    caption: 'Certificate of Recognition',
    image: yonkersCouncilImg,
  },
  {
    title: 'New York Medical College',
    caption: 'Preceptor, Foundations of Clinical Medicine',
    year: '2016-2017',
    image: nymcImg,
  },
  {
    title: 'The New York Times',
    caption: 'Featured in',
    year: '10/7/2017',
    image: nytImg,
  },
]

export type AudienceStat = {
  label: string
  /** Target number used for the count-up animation. */
  value: number
  suffix?: string
  detail: string
  icon: 'mail' | 'users' | 'eye' | 'share'
}

/**
 * Audience metrics shown to prospective brand partners.
 * TODO: Replace dummy figures with verified newsletter, social, and blog analytics.
 * When empty, the Audience & Reach section is not rendered.
 */
export const audienceStats: AudienceStat[] = [
  {
    label: 'Newsletter Subscribers',
    value: 12500,
    suffix: '+',
    detail: 'Dummy figure — confirm list size',
    icon: 'mail',
  },
  {
    label: 'Social Followers',
    value: 48200,
    suffix: '+',
    detail: 'Dummy figure — confirm combined reach',
    icon: 'share',
  },
  {
    label: 'Monthly Blog Readers',
    value: 22100,
    suffix: '+',
    detail: 'Dummy figure — confirm analytics',
    icon: 'eye',
  },
]

export const processSteps = [
  {
    title: 'Send an inquiry',
    description: 'Share your brand goals and collaboration idea.',
  },
  {
    title: 'Discovery call',
    description: 'Align on audience, messaging, and scope.',
  },
  {
    title: 'Plan and launch the collaboration',
    description: 'Finalize deliverables and go live together.',
  },
] as const

export const collaborationTypeOptions = [
  { value: 'educational-content', label: 'Educational Content' },
  { value: 'expert-commentary', label: 'Expert Commentary' },
  { value: 'product-education', label: 'Product Education' },
  { value: 'community-health-events', label: 'Community Health Events' },
  { value: 'telehealth-awareness', label: 'Telehealth Awareness' },
  { value: 'sponsored-webinars', label: 'Sponsored Webinars' },
] as const

export const budgetRangeOptions = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-50k', label: '$15,000 – $50,000' },
  { value: '50k-plus', label: '$50,000+' },
  { value: 'to-discuss', label: 'Prefer to discuss' },
] as const

export const partnershipFaqs: PostFaq[] = [
  {
    question: 'How quickly will we hear back?',
    answer:
      'We typically review partnership inquiries within a few business days and follow up to schedule a discovery conversation when there is a potential fit.',
  },
  {
    question: 'What types of partners do you work with?',
    answer:
      'We collaborate with healthcare brands, wellness companies, patient-education platforms, and organizations that share a commitment to accurate, ethical endocrine health education.',
  },
  {
    question: 'Is partnership content medical advice?',
    answer:
      'No. Educational collaborations are for informational purposes only and are not a substitute for professional medical advice, diagnosis, or treatment. Always encourage audiences to consult their own clinicians.',
  },
  {
    question: 'Who approves final content?',
    answer:
      'All partnership materials are reviewed for clinical accuracy and alignment with our educational standards before publication or distribution.',
  },
  {
    question: 'Do you offer exclusivity?',
    answer:
      'Exclusivity depends on the collaboration scope, category, and timeline. Share your needs in the inquiry form and we can discuss options during the discovery call.',
  },
]
