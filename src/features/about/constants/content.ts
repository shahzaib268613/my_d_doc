export const aboutMeta = {
  title: 'About | My Diabetes Doc',
  description:
    'Meet the doctor behind My Diabetes Doc. Expert care for type 1 and type 2 diabetes, thyroid, weight, PCOS and other endocrine conditions.',
} as const

export const aboutHero = {
  headline: 'About My Diabetes Doc',
  intro: 'Focused, personal diabetes care from an experienced endocrinologist.',
  facts: 'Endocrinologist · Telehealth available · Accepting new patients',
} as const

export const aboutDoctor = {
  name: 'Dr. Jonas Leibowitz, MD',
  role: 'Endocrinologist and founder of My Diabetes Doc',
  initials: 'JL',
  // Set when the client provides a portrait; null shows the initials fallback.
  photoUrl: null as string | null,
  photoAlt: 'Dr. Jonas Leibowitz, MD',
  paragraphs: [
    'Living with diabetes means making decisions every day, and good care should make those decisions clearer, not harder.',
    'Dr. Leibowitz is a long-time endocrinologist who has treated complex hormonal and metabolic conditions for years. My Diabetes Doc brings that experience into a practice focused on helping people understand their condition and manage it with confidence.',
    'He and his team support patients from diagnosis through to a treatment plan that fits their life.',
  ],
} as const

export const educationFacts = [
  'Graduate of Sophie Davis School of Biomedical Education, New York',
  'Internship and residency at The Mount Sinai Medical Center',
  'Keeps up with new diabetes technologies and medications',
  'Lectures regionally to teach other medical professionals how and when to prescribe medication',
] as const

export const careApproachItems = [
  {
    title: 'Clear explanations',
    description:
      'We explain your tests, medicines and numbers so you know what they mean.',
  },
  {
    title: 'Plans that fit your life',
    description: 'Your routine, food and goals shape the treatment.',
  },
  {
    title: 'Ongoing support',
    description: 'Regular follow-up keeps your care on track.',
  },
] as const

export const aboutCta = {
  heading: 'Ready to take control of your diabetes?',
  text: 'New patients are welcome. Choose an in-person or telehealth visit.',
  bookLabel: 'Book an appointment',
  callLabel: 'Call us',
} as const
