import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { MarketingLayout } from './layouts/MarketingLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { adminRouteDefs } from '@/features/admin/constants/adminRoutes'
import { AdminPlaceholderPage } from '@/features/admin/pages/AdminPlaceholderPage'
import { NewsletterPage, UnsubscribePage } from '@/features/newsletter'
import {
  AllBlogsPage,
  BlogCategoriesPage,
  BlogDashboardPage,
  BlogDraftsPage,
  BlogListingsPage,
  EditBlogPage,
  PublishedBlogsPage,
  ScheduledBlogsPage,
} from '@/features/admin/blog'
import { LatestPosts } from '@/features/blog/components/LatestPosts'
import { AboutPage } from '@/features/about'
import { BlogPage } from '@/features/blog/pages/BlogPage'
import { BlogPostPage } from '@/features/blog/pages/BlogPostPage'
import { Container, Section, Spinner } from '@/shared/components/ui'
import { ScrollToTop } from '@/shared/components/ScrollToTop'

const HomePage = lazy(async () => {
  const module = await import('@/features/marketing/pages/HomePage')
  return { default: module.HomePage }
})

function Loading() {
  return (
    <Section>
      <Container className="flex justify-center py-16">
        <Spinner label="Loading page" />
      </Container>
    </Section>
  )
}

function NotFound() {
  return (
    <Section>
      <ScrollToTop />
      <Container>
        <h1 className="font-display text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          That page does not exist. Try returning home.
        </p>
      </Container>
    </Section>
  )
}

function adminElementForPath(path: string) {
  switch (path) {
    case 'blogs':
      return <AllBlogsPage />
    case 'blogs/listings':
      return <BlogListingsPage />
    case 'blogs/categories':
      return <BlogCategoriesPage />
    case 'blogs/drafts':
      return <BlogDraftsPage />
    case 'blogs/published':
      return <PublishedBlogsPage />
    case 'blogs/scheduled':
      return <ScheduledBlogsPage />
    case 'blogs/create':
      return <Navigate to="/admin/blogs/listings" replace />
    case 'blogs/edit/:id':
      return <EditBlogPage />
    case 'newsletter':
      return <NewsletterPage />
    case 'newsletter/subscribers':
    case 'newsletter/active':
    case 'newsletter/campaigns':
    case 'newsletter/campaigns/edit/:id':
      return <Navigate to="/admin/newsletter" replace />
    default:
      return <AdminPlaceholderPage />
  }
}

const adminChildren = adminRouteDefs.map((def) =>
  def.path === ''
    ? { index: true as const, element: <BlogDashboardPage /> }
    : { path: def.path, element: adminElementForPath(def.path) },
)

const router = createBrowserRouter([
  { path: '/sign-in', element: <Navigate to="/admin" replace /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: adminChildren,
  },
  {
    element: <MarketingLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage latestPosts={<LatestPosts />} />
          </Suspense>
        ),
      },
      { path: '/v1', element: <Navigate to="/" replace /> },
      { path: '/v2', element: <Navigate to="/" replace /> },
      { path: '/v3', element: <Navigate to="/" replace /> },
      { path: '/home2', element: <Navigate to="/" replace /> },
      { path: '/home3', element: <Navigate to="/" replace /> },
      { path: '/home4', element: <Navigate to="/" replace /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/blog/:slug', element: <BlogPostPage /> },
      { path: '/unsubscribe', element: <UnsubscribePage /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
