export type CategoryStatus = 'active' | 'inactive'

export type ManagedBlogCategory = {
  id: string
  name: string
  slug: string
  description: string
  status: CategoryStatus
  createdAt: string
  updatedAt: string
}

export type CategoryWriteInput = {
  name: string
  status: CategoryStatus
  description?: string
}
