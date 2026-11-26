import { ReusableButton, Container, Section } from '@/shared/components/ui'

type Props = {
  title?: string
}

export function ComingSoonPage({ title = 'Coming soon' }: Props) {
  return (
    <Section>
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          My Diabetes Doc
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">
          This page is not built yet. Please check back later, or return home for diabetes
          education and the latest articles.
        </p>
        <div className="mt-8 flex justify-center">
          <ReusableButton href="/">Back to home</ReusableButton>
        </div>
      </Container>
    </Section>
  )
}
