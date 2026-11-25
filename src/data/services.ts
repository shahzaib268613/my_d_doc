export type ServiceGroup = 'diabetes' | 'related'

export type Service = {
  title: string
  description: string
  href?: string
  group: ServiceGroup
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
  },
  {
    title: 'Type 1 diabetes',
    description: 'Insulin therapy, glucose monitoring and day-to-day management support.',
    group: 'diabetes',
  },
  {
    title: 'Thyroid',
    description: 'Evaluation and treatment of underactive and overactive thyroid conditions.',
    group: 'related',
  },
  {
    title: 'Weight loss',
    description: 'Medical support for healthy, sustainable weight management.',
    group: 'related',
  },
  {
    title: 'PCOS',
    description:
      'Care for hormonal imbalance and the symptoms linked to polycystic ovary syndrome.',
    group: 'related',
  },
  {
    title: 'Testosterone deficiency',
    description: 'Testing and treatment for low testosterone.',
    group: 'related',
  },
  {
    title: 'Osteoporosis',
    description: 'Bone health assessment and treatment to reduce fracture risk.',
    group: 'related',
  },
  {
    title: 'Adrenal and pituitary disorders',
    description:
      'Diagnosis and management of hormone problems involving the adrenal and pituitary glands.',
    group: 'related',
  },
]
