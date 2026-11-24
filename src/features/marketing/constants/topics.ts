import { blogCategories } from '@/shared/config/blogCategories'
import type { Topic } from '../types/Topic'

/** Topics section uses the shared blog category list (no duplicates). */
export const topics: Topic[] = blogCategories
