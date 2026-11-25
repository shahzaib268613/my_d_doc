export type ServiceGroup = 'diabetes' | 'related'

export type Service = {
  title: string
  description: string
  /** Set only when a matching in-project page already exists. */
  href?: string
  group: ServiceGroup
  /** Public path under `/images/services/` for diabetes cards. */
  image?: string
  imageAlt?: string
  /** Short “Who it’s for” line (diabetes cards). */
  whoFor?: string
  /**
   * Lucide icon name used by the About page for related endocrine items.
   * Kept as a string so this data file stays framework-agnostic.
   */
  icon?:
    | 'Activity'
    | 'Scale'
    | 'HeartPulse'
    | 'FlaskConical'
    | 'Bone'
    | 'Brain'
}

/**
 * About page care offerings. `href` is set only when a matching in-project
 * page already exists — none of these have dedicated routes yet.
 */
export const services: Service[] = [
  {
    title: 'Type 2 diabetes',
    description: 'Medication, nutrition and lifestyle planning for steadier blood sugar.',
    group: 'diabetes',
    image: '/images/services/type-2-diabetes.jpg',
    imageAlt: 'Digital blood glucose meter reading 103 mg/dL beside a white lancing device',
    whoFor: 'For people newly diagnosed, or looking for steadier blood sugar.',
  },
  {
    title: 'Type 1 diabetes',
    description: 'Insulin therapy, glucose monitoring and day-to-day management support.',
    group: 'diabetes',
    image: '/images/services/type-1-diabetes.jpg',
    imageAlt: 'Insulin pen and continuous glucose monitor sensor on a light clinical tabletop',
    whoFor: 'For people on insulin therapy, with or without a glucose monitor.',
  },
  {
    title: 'Thyroid',
    description: 'Evaluation and treatment of underactive and overactive thyroid conditions.',
    group: 'related',
    icon: 'Activity',
  },
  {
    title: 'Weight loss',
    description: 'Medical support for healthy, sustainable weight management.',
    group: 'related',
    icon: 'Scale',
  },
  {
    title: 'PCOS',
    description:
      'Care for hormonal imbalance and the symptoms linked to polycystic ovary syndrome.',
    group: 'related',
    icon: 'HeartPulse',
  },
  {
    title: 'Testosterone deficiency',
    description: 'Testing and treatment for low testosterone.',
    group: 'related',
    icon: 'FlaskConical',
  },
  {
    title: 'Osteoporosis',
    description: 'Bone health assessment and treatment to reduce fracture risk.',
    group: 'related',
    icon: 'Bone',
  },
  {
    title: 'Adrenal and pituitary disorders',
    description:
      'Diagnosis and management of hormone problems involving the adrenal and pituitary glands.',
    group: 'related',
    icon: 'Brain',
  },
]
