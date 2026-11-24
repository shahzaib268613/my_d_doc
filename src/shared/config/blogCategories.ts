export type BlogCategoryIcon =
  | 'droplet'
  | 'utensils'
  | 'activity'
  | 'pill'
  | 'shield'
  | 'heart'

export type BlogCategory = {
  title: string
  slug: string
  description: string
  icon: BlogCategoryIcon
}

/** Canonical diabetes education categories shared by Topics + Blog filtering. */
export const blogCategories: BlogCategory[] = [
  {
    title: 'Blood Sugar Management',
    slug: 'blood-sugar-management',
    description:
      'Learn how to monitor glucose, spot patterns, and build steady day-to-day control.',
    icon: 'droplet',
  },
  {
    title: 'Nutrition & Meal Planning',
    slug: 'nutrition-meal-planning',
    description:
      'Practical food choices, plate methods, and snacks that support healthier glucose responses.',
    icon: 'utensils',
  },
  {
    title: 'Exercise & Physical Activity',
    slug: 'exercise-physical-activity',
    description:
      'Movement ideas that fit real schedules—from short walks to sustainable activity routines.',
    icon: 'activity',
  },
  {
    title: 'Medications & Treatments',
    slug: 'medications-treatments',
    description:
      'Clear guidance on therapies, appointment prep, and partnering with your care team.',
    icon: 'pill',
  },
  {
    title: 'Complications & Prevention',
    slug: 'complications-prevention',
    description:
      'Protect long-term health with habits that help prevent and catch complications early.',
    icon: 'shield',
  },
  {
    title: 'Living Well With Diabetes',
    slug: 'living-well-with-diabetes',
    description:
      'Sleep, stress, hydration, and everyday routines that support sustainable self-care.',
    icon: 'heart',
  },
]

export function getBlogCategoryBySlug(slug: string | null | undefined) {
  if (!slug) return undefined
  return blogCategories.find((category) => category.slug === slug)
}

export function getBlogCategoryByTitle(title: string | null | undefined) {
  if (!title) return undefined
  return blogCategories.find((category) => category.title === title)
}
