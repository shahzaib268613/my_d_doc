import type { PostFaq } from '@/features/blog/types/Post'

export const speakingEngagementsMeta = {
  title: 'Speaking Engagements | My Diabetes Doc',
  description:
    'Invite Dr. Jonas Leibowitz, MD, to lecture on endocrine care, diabetes education, medications, and new technologies for medical professionals and communities.',
} as const

export const speakingHero = {
  eyebrow: 'Speaking & Education',
  title: 'Dr. Jonas Leibowitz: Educator, Clinician & Speaker',
  description:
    'Lectures across the region teaching medical professionals and communities about endocrine care, new medications and technologies.',
  primaryCta: 'Invite Dr. Leibowitz to Speak',
  secondaryCta: 'Explore Speaking Topics',
  badges: ['Regional Lecturer', 'Mount Sinai Trained'] as const,
} as const

export const speakerIntroduction = {
  heading: 'About the Speaker',
  biography:
    'Dr. Leibowitz is an endocrinologist who lectures regionally to teach other medical professionals how and when to prescribe medication, and who keeps up with new technologies and medications.',
  credentialsHeading: 'Credentials & Background',
  credentials: [
    'Sophie Davis School of Biomedical Education',
    'Mount Sinai Medical Center (Internship and Residency)',
  ],
} as const

export const speakingTopics = [
  {
    title: 'Osteoporosis: Protecting Bone Health Over Time',
    description: 'Prevention, screening, and treatment approaches for stronger bones.',
    icon: 'bone' as const,
  },
  {
    title: 'Thyroid Disorders: What Patients Should Ask',
    description: 'Clear answers on symptoms, labs, and everyday thyroid management.',
    icon: 'activity' as const,
  },
  {
    title: 'Weight Loss: Metabolic Health That Lasts',
    description: 'Practical education on sustainable weight and metabolic care.',
    icon: 'scale' as const,
  },
  {
    title: 'PCOS: Understanding Hormones and Options',
    description: 'Accessible guidance on PCOS symptoms, evaluation, and care paths.',
    icon: 'heart' as const,
  },
  {
    title: 'Testosterone Deficiency: Facts Beyond the Hype',
    description: 'Evidence-based discussion of evaluation and treatment decisions.',
    icon: 'droplets' as const,
  },
  {
    title: 'Adrenal & Pituitary Disorders: Complex Made Clear',
    description: 'Approachable overviews of adrenal and pituitary conditions.',
    icon: 'brain' as const,
  },
  {
    title: 'Type 1 Diabetes: Technology and Day-to-Day Care',
    description: 'Education for clinicians, patients, and caregivers on type 1 care.',
    icon: 'syringe' as const,
  },
  {
    title: 'Type 2 Diabetes: Medications and Modern Tools',
    description: 'How newer therapies and technologies support better outcomes.',
    icon: 'heartPulse' as const,
  },
] as const

export const formatsAndAudiences = [
  {
    title: 'Medical Professionals',
    description: 'CME-style lectures and clinical education for physicians and care teams.',
    icon: 'stethoscope' as const,
  },
  {
    title: 'Patient Communities',
    description: 'Clear health education for patients, caregivers, and support groups.',
    icon: 'users' as const,
  },
  {
    title: 'Corporate and Wellness Events',
    description: 'Workplace and community sessions focused on endocrine wellness.',
    icon: 'building' as const,
  },
  {
    title: 'Webinars and Panels',
    description: 'Virtual talks and panel discussions for wider audience reach.',
    icon: 'monitor' as const,
  },
] as const

export type PastEngagement = {
  eventName: string
  venue: string
  date: string
  image?: string
}

/**
 * Past speaking engagements / gallery.
 * TODO: Replace with client-provided event photos, venues, and dates.
 * When empty, the Past Engagements section is not rendered.
 */
export const pastEngagements: PastEngagement[] = []

export const speakingTestimonials = [
  {
    quote: 'Not only is he knowledgeable but he goes above and beyond.',
    attribution: 'Trisha B.',
    source: 'Google',
  },
  {
    quote:
      "Dr. Leibowitz is a wonder doctor. He doesn't talk down to you and really cares.",
    attribution: 'Verified Patient',
    source: 'Google',
  },
  {
    quote:
      'Great doctor. Takes his time to make sure you understand everything and is very calm.',
    attribution: 'Verified Patient',
    source: 'Healthgrades',
  },
  {
    quote: 'Dr. Leibowitz is very thorough and explains so you can understand.',
    attribution: 'Heidi B.',
    source: 'Google',
  },
] as const

export const speakingInvite = {
  heading: 'Invite Dr. Leibowitz to Speak',
  description:
    'Share your event details and we will follow up about availability, format, and topic fit.',
  submitLabel: 'Send Speaking Invitation',
} as const

export const eventTypeOptions = [
  { value: 'cme-lecture', label: 'CME / Clinical Lecture' },
  { value: 'patient-community', label: 'Patient Community Event' },
  { value: 'corporate-wellness', label: 'Corporate / Wellness Event' },
  { value: 'webinar-panel', label: 'Webinar / Panel' },
  { value: 'grand-rounds', label: 'Grand Rounds' },
  { value: 'other', label: 'Other' },
] as const

export const formatOptions = [
  { value: 'in-person', label: 'In-person' },
  { value: 'virtual', label: 'Virtual' },
] as const

export const speakingFaqs: PostFaq[] = [
  {
    question: 'How much lead time do you need?',
    answer:
      'Whenever possible, reach out several weeks in advance so we can align on topic, format, and scheduling. Shorter timelines may still work depending on availability.',
  },
  {
    question: 'Do you offer virtual and in-person speaking?',
    answer:
      'Yes. Dr. Leibowitz presents both in person and virtually. Share your preferred format in the invitation form so we can plan AV and logistics accordingly.',
  },
  {
    question: 'How are honorarium and fees handled?',
    answer:
      'Speaking fees depend on event type, length, travel, and preparation needs. Include your budget range or constraints in the message and we can discuss details during follow-up.',
  },
  {
    question: 'Can topics be customized?',
    answer:
      'Yes. Talks can be tailored for medical professionals, patient communities, or wellness audiences using the endocrine topics listed on this page.',
  },
  {
    question: 'What AV support is typically needed?',
    answer:
      'Most sessions need a microphone, screen or projector for slides, and reliable audio for virtual or hybrid events. Share your room setup and we will confirm requirements.',
  },
]
