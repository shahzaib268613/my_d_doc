import heroBg from '@/features/marketing/assets/hero-bg.png'
import heroBgDark from '@/features/marketing/assets/hero-bg-dark.png'
import doctorPortrait from '@/features/marketing/assets/doctor-portrait.png'
import doctorPortraitV2 from '@/features/marketing/assets/doctor-portrait-v2.png'
import type { Post } from '../types/Post'

/** Temporary marketing placeholders until real published blogs exist. */
export const dummyPosts: Post[] = [
  {
    id: 'dummy-1',
    title: 'How to Read Your Blood Sugar Patterns',
    slug: 'how-to-read-blood-sugar-patterns',
    excerpt:
      'Learn what everyday glucose swings mean and how simple logging habits make trends easier to spot.',
    body: '<p>Understanding your glucose patterns helps you make calmer day-to-day decisions with your care team.</p>',
    category: 'Blood Sugar Management',
    coverImageUrl: heroBg,
    status: 'published',
    publishedAt: '2026-11-18T10:00:00.000Z',
    readingTimeMinutes: 5,
  },
  {
    id: 'dummy-2',
    title: 'Building a Diabetes-Friendly Plate',
    slug: 'building-a-diabetes-friendly-plate',
    excerpt:
      'A practical plate method for balanced meals that support steadier energy without complicated rules.',
    body: '<p>Start with non-starchy vegetables, add lean protein, then fill the remaining quarter with smart carbs.</p>',
    category: 'Nutrition & Meal Planning',
    coverImageUrl: doctorPortraitV2,
    status: 'published',
    publishedAt: '2026-11-14T10:00:00.000Z',
    readingTimeMinutes: 4,
  },
  {
    id: 'dummy-3',
    title: 'Movement That Fits Real Schedules',
    slug: 'movement-that-fits-real-schedules',
    excerpt:
      'Short walks, light strength work, and after-meal activity ideas you can keep up on busy days.',
    body: '<p>Consistent light activity often matters more than intense workouts you cannot sustain.</p>',
    category: 'Exercise & Physical Activity',
    coverImageUrl: heroBgDark,
    status: 'published',
    publishedAt: '2026-11-10T10:00:00.000Z',
    readingTimeMinutes: 4,
  },
  {
    id: 'dummy-4',
    title: 'Questions to Ask About Your Medications',
    slug: 'questions-to-ask-about-medications',
    excerpt:
      'Prepare for appointments with clear questions about timing, side effects, and what success looks like.',
    body: '<p>Bring a short list of symptoms, timing concerns, and goals so conversations stay focused.</p>',
    category: 'Medications & Treatments',
    coverImageUrl: doctorPortrait,
    status: 'published',
    publishedAt: '2026-11-06T10:00:00.000Z',
    readingTimeMinutes: 6,
  },
  {
    id: 'dummy-5',
    title: 'Protecting Long-Term Health Day by Day',
    slug: 'protecting-long-term-health-day-by-day',
    excerpt:
      'Small habits that support eyes, feet, kidneys, and heart health alongside glucose management.',
    body: '<p>Prevention is built from routine checks, foot care, blood pressure awareness, and follow-up.</p>',
    category: 'Complications & Prevention',
    coverImageUrl: heroBg,
    status: 'published',
    publishedAt: '2026-11-02T10:00:00.000Z',
    readingTimeMinutes: 5,
  },
  {
    id: 'dummy-6',
    title: 'Sleep, Stress, and Steady Routines',
    slug: 'sleep-stress-and-steady-routines',
    excerpt:
      'Simple ways to support glucose control through sleep quality, stress recovery, and daily structure.',
    body: '<p>Rest and stress recovery are part of diabetes care—not extras after the medical plan.</p>',
    category: 'Living Well With Diabetes',
    coverImageUrl: doctorPortraitV2,
    status: 'published',
    publishedAt: '2026-10-28T10:00:00.000Z',
    readingTimeMinutes: 4,
  },
  {
    id: 'dummy-7',
    title: 'What HbA1c Really Tells You',
    slug: 'what-hba1c-really-tells-you',
    excerpt:
      'A clear look at the three-month average, how it relates to daily readings, and when to discuss changes with your clinician.',
    body: '<p>HbA1c is one useful signal among several. Pair it with your meter or CGM trends for a fuller picture.</p>',
    category: 'Blood Sugar Management',
    coverImageUrl: heroBgDark,
    status: 'published',
    publishedAt: '2026-10-22T10:00:00.000Z',
    readingTimeMinutes: 5,
  },
  {
    id: 'dummy-8',
    title: 'Smart Snacks Between Meals',
    slug: 'smart-snacks-between-meals',
    excerpt:
      'Protein-forward snack ideas that help avoid sharp spikes while keeping energy steady through the afternoon.',
    body: '<p>Pair carbohydrate with protein or fat, and keep portions realistic for your day.</p>',
    category: 'Nutrition & Meal Planning',
    coverImageUrl: doctorPortrait,
    status: 'published',
    publishedAt: '2026-10-16T10:00:00.000Z',
    readingTimeMinutes: 3,
  },
  {
    id: 'dummy-9',
    title: 'Foot Checks You Can Do at Home',
    slug: 'foot-checks-you-can-do-at-home',
    excerpt:
      'A simple daily routine for spotting redness, cuts, or numbness early—before they become bigger problems.',
    body: '<p>Look between toes, check pressure points, and call your care team if something looks new or sore.</p>',
    category: 'Complications & Prevention',
    coverImageUrl: heroBg,
    status: 'published',
    publishedAt: '2026-10-10T10:00:00.000Z',
    readingTimeMinutes: 4,
  },
  {
    id: 'dummy-10',
    title: 'Talking With Family About Diabetes',
    slug: 'talking-with-family-about-diabetes',
    excerpt:
      'How to explain what support helps—and what does not—when the people around you want to be involved.',
    body: '<p>Share specific asks: meal timing, quiet encouragement, or help getting to appointments.</p>',
    category: 'Living Well With Diabetes',
    coverImageUrl: doctorPortraitV2,
    status: 'published',
    publishedAt: '2026-10-04T10:00:00.000Z',
    readingTimeMinutes: 5,
  },
]

export function getDummyPosts(limit?: number) {
  if (limit == null) return dummyPosts
  return dummyPosts.slice(0, Math.max(0, limit))
}

export function getDummyPostsByCategory(categoryTitle: string | undefined) {
  if (!categoryTitle) return dummyPosts
  return dummyPosts.filter(
    (post) => post.category.toLowerCase() === categoryTitle.toLowerCase(),
  )
}

export function getDummyPostBySlug(slug: string) {
  return dummyPosts.find((post) => post.slug === slug)
}
