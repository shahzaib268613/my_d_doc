import heroBg from '@/features/marketing/assets/hero-bg.png'
import heroBgDark from '@/features/marketing/assets/hero-bg-dark.png'
import doctorPortrait from '@/features/marketing/assets/doctor-portrait.png'
import doctorPortraitV2 from '@/features/marketing/assets/doctor-portrait-v2.png'
import nutritionPlateImage from '../assets/nutrition-plate.svg'
import nutritionMealPrepImage from '../assets/nutrition-meal-prep.svg'
import type { Post } from '../types/Post'

/** Temporary marketing placeholders until real published blogs exist. */
const nutritionGuideBody = `
<p>Eating well with diabetes does not have to mean following a rigid menu or giving up the foods you enjoy. A useful starting point is to notice how meals fit into your day, choose a mix of foods that feels satisfying, and make changes that you can keep up over time. Nutrition needs vary with health history, medications, culture, budget, schedule, and personal preference, so there is no single plate that works for everyone.</p>
<p>This guide offers general ideas for building balanced meals and planning ahead. It is educational information, not an individual meal prescription. If you use insulin or medicines that can cause low blood sugar, discuss major food or schedule changes with your healthcare team before making them.</p>

<h2>Start with a flexible, balanced plate</h2>
<p>A plate picture can be a simple visual prompt, not a rule. Many people find it helpful to include vegetables, a source of protein, and a carbohydrate-containing food at meals. The amounts and combinations can change from one meal to the next. Appetite, activity, traditions, access to food, and medical needs all matter.</p>
<figure>
  <img src="${nutritionPlateImage}" alt="Illustration of a balanced plate with vegetables, protein, and a grain portion" width="1200" height="800" loading="lazy" />
  <figcaption>A flexible plate can include colorful vegetables, protein, and satisfying carbohydrates.</figcaption>
</figure>
<p>Non-starchy vegetables can add color, texture, and variety. Examples include leafy greens, peppers, tomatoes, mushrooms, broccoli, green beans, and cabbage. Fresh, frozen, and canned options can all be useful. If you use canned vegetables, compare labels and choose lower-sodium options when that is helpful for your health goals.</p>
<p>Protein foods may include beans, lentils, eggs, fish, tofu, poultry, yogurt, nuts, or other foods that fit your preferences. Carbohydrate foods can include grains, fruit, milk or yogurt, beans, and starchy vegetables. These foods are not automatically “good” or “bad”; pairing choices in a way that feels satisfying and noticing your own patterns can be more useful than judging one ingredient in isolation.</p>

<h3>Make the meal satisfying</h3>
<p>Try to include foods you enjoy and can access regularly. A meal that is practical and satisfying is easier to repeat than one built around ingredients, cooking time, or costs that do not fit your life. If you are changing a familiar recipe, adjust one part at a time—such as adding a vegetable, trying a different grain, or including a protein you like—rather than rebuilding the whole meal at once.</p>
<ul>
  <li><strong>Add color:</strong> choose a vegetable or fruit that is convenient and appealing.</li>
  <li><strong>Include staying power:</strong> consider protein, fiber-rich foods, or healthy fats as part of a meal.</li>
  <li><strong>Keep familiar favorites:</strong> adapt portions or pairings in ways that feel realistic instead of banning foods.</li>
  <li><strong>Plan for enjoyment:</strong> flavor, texture, and cultural meaning are part of nourishment too.</li>
</ul>

<h2>Plan around your real routine</h2>
<p>Meal planning does not require preparing every meal in advance. A small amount of preparation can make busy days easier: keep a few flexible ingredients available, prepare one component ahead, or decide on a backup meal for nights when cooking is not practical. The goal is to make the next helpful choice easier, not to create another task that must be completed perfectly.</p>
<figure>
  <img src="${nutritionMealPrepImage}" alt="Illustration of meal-prep containers with vegetables, grains, and protein" width="1200" height="800" loading="lazy" />
  <figcaption>Simple prepared ingredients can be combined in different ways during the week.</figcaption>
</figure>
<p>Some people like to plan a few meals; others prefer to stock ingredients and decide day by day. Both approaches can work. A short list of reliable options can be especially useful when your schedule changes or energy is low.</p>
<ol>
  <li>Choose two or three meals you already enjoy and can make with available ingredients.</li>
  <li>Check what is already in your kitchen before shopping, then add a few versatile items.</li>
  <li>Prepare only what will save time for you, such as washing produce, cooking a grain, or portioning snacks.</li>
  <li>Keep a convenient backup, such as frozen vegetables, canned beans, eggs, or another shelf-stable staple.</li>
</ol>
<p>Batch cooking can help, but it is not required. If leftovers are not appealing or storage is limited, preparing one ingredient at a time may be a better fit. Food safety also matters: refrigerate perishable foods promptly and follow local food-safety guidance for storage and reheating.</p>

<h2>Notice patterns without judging yourself</h2>
<p>If you monitor blood glucose, your readings can provide context about how meals, timing, stress, sleep, activity, and medicines relate to your day. One reading does not tell the whole story. Patterns over time are usually more useful than trying to explain every number or reacting to a single result.</p>
<p>When you review a pattern, consider writing down what was happening around the reading: the approximate meal, timing, activity, sleep, illness, or a medication change. You do not need to record every detail. A short note that helps you and your clinician understand the context may be enough.</p>
<blockquote>
  <p>Use a food or glucose log as a tool for curiosity and conversation—not as a scorecard or a reason to blame yourself.</p>
</blockquote>
<p>Here are examples of questions you might bring to an appointment. They are conversation starters, not targets or instructions:</p>
<table>
  <thead>
    <tr><th>What you notice</th><th>Question to discuss</th><th>Helpful context</th></tr>
  </thead>
  <tbody>
    <tr><td>A recurring change after a meal</td><td>Could timing, ingredients, or medication be contributing?</td><td>Meal time, medicines, and readings</td></tr>
    <tr><td>Hunger soon after eating</td><td>Could a different combination feel more satisfying?</td><td>Meal size, schedule, and preferences</td></tr>
    <tr><td>Difficulty planning meals</td><td>What low-effort options fit my routine and budget?</td><td>Work hours, kitchen access, and food availability</td></tr>
  </tbody>
</table>

<h2>Adapt meals to different situations</h2>
<h3>At home</h3>
<p>Keep a short list of quick combinations that use foods you already buy. For example, a soup or stew can be paired with vegetables or another side; a grain bowl can combine leftovers with beans, eggs, fish, tofu, or vegetables; and breakfast foods can work at any time of day. These are starting points to adapt, not a prescribed menu.</p>
<p>If cooking is difficult, consider no-cook combinations, frozen produce, pre-washed vegetables, or prepared foods that fit your needs. Read labels when useful, but remember that a label is one source of information—not a judgment about whether a food belongs in your diet.</p>
<h3>When eating away from home</h3>
<p>Restaurant meals and shared meals are part of everyday life. If it helps, you can look at a menu ahead of time, ask for a modification, or save part of a meal for later. You can also simply choose what sounds enjoyable and return to your usual routine at the next meal. No single meal determines your overall health.</p>
<h3>When appetite, budget, or time is limited</h3>
<p>There may be days when a full meal plan is not possible. Low-cost staples such as oats, rice, beans, lentils, eggs, frozen vegetables, and canned foods can provide flexible building blocks, depending on what is available to you. Community food programs, a social worker, or a registered dietitian may be able to help if food access is a concern.</p>

<h2>Make changes with support</h2>
<p>Start with one small change that feels worthwhile to you. You might add a familiar vegetable to a meal, keep an easy breakfast option available, or ask your care team to review a pattern you have noticed. Give yourself time to see whether the change is practical and helpful. If it is not, adjusting the approach is a normal part of learning.</p>
<p>A registered dietitian or diabetes care and education specialist can help tailor nutrition advice to your medicines, health goals, culture, and preferences. Contact your clinician before making major changes if you take insulin or other glucose-lowering medication, have frequent low readings, are pregnant, have kidney or digestive conditions, or have a history of disordered eating.</p>
<p>The most useful eating plan is one that supports your health and fits your life. Aim for curiosity, flexibility, and support—not perfection.</p>
`

export const dummyPosts: Post[] = [
  {
    id: 'dummy-11',
    title: 'Nutrition for Diabetes: A Practical Guide to Balanced Meals and Flexible Planning',
    slug: 'nutrition-balanced-meals-flexible-planning',
    excerpt:
      'A detailed, flexible guide to building satisfying meals, planning around real routines, and noticing food and glucose patterns without rigid rules.',
    body: nutritionGuideBody,
    category: 'Nutrition & Meal Planning',
    coverImageUrl: null,
    status: 'published',
    publishedAt: '2026-11-25T10:00:00.000Z',
    readingTimeMinutes: 8,
  },
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
