import glucoseMeterImage from '../features/about/assets/type-1-diabetes.jpg'
import insulinAndMonitorImage from '../features/about/assets/type-2-diabetes.jpg'

type ServiceBase = {
  title: string
  description: string
  href?: string
}

export type RelatedServiceIcon =
  | 'Activity'
  | 'Scale'
  | 'HeartPulse'
  | 'Bone'
  | 'Brain'

export type DiabetesService = ServiceBase & {
  group: 'diabetes'
  image: string
  imageAlt: string
  whoFor: string
}

export type RelatedService = ServiceBase & {
  group: 'related'
  icon: RelatedServiceIcon
}

export type Service = DiabetesService | RelatedService

export const whatWeHelpWithCopy = {
  title: 'What we help with',
  intro:
    'Our focus is diabetes care, along with related hormone conditions that affect blood sugar and overall health.',
  diabetesHeading: 'Diabetes care',
  relatedHeading: 'Related endocrine care',
  whoForLabel: "Who it's for:",
  learnMore: 'Learn more',
} as const

export const services: Service[] = [
  {
    title: 'Type 2 diabetes',
    description:
      'Medication, nutrition and lifestyle planning to keep your blood sugar steady.',
    group: 'diabetes',
    image: glucoseMeterImage,
    imageAlt:
      'Black blood glucose meter next to a white lancing pen on a blue-grey surface',
    whoFor:
      'People newly diagnosed with type 2 diabetes, or those whose numbers need better control.',
  },
  {
    title: 'Type 1 diabetes',
    description:
      'Insulin therapy, glucose monitoring and day-to-day management support.',
    group: 'diabetes',
    image: insulinAndMonitorImage,
    imageAlt:
      'Insulin pen next to a white continuous glucose monitor sensor on a blue-grey surface',
    whoFor: 'People on insulin therapy, with or without a glucose monitor.',
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
    icon: 'Activity',
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
