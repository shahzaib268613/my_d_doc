import { type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Container, Input, Label, Section } from '@/shared/components/ui'
import { ScrollToTop } from '@/shared/components/ScrollToTop'
import { setAdminSession } from '../session'

export function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ??
    '/admin'

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAdminSession()
    navigate(from.startsWith('/admin') ? from : '/admin', { replace: true })
  }

  return (
    <Section>
      <ScrollToTop />
      <Container>
        <Card className="mx-auto max-w-md">
          <h1 className="font-display text-3xl font-bold">Sign in</h1>
          <p className="mt-2 text-muted-foreground">
            Placeholder authentication for the admin dashboard.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="username" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Card>
      </Container>
    </Section>
  )
}
