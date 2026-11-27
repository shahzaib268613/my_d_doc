import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import {
  Container,
  FaqCardAccordion,
  FilterSelect,
  Input,
  Label,
  Reveal,
  ReusableButton,
  Section,
  Textarea,
} from '@/shared/components/ui'
import {
  eventTypeOptions,
  formatOptions,
  speakingFaqs,
  speakingInvite,
} from '../constants/content'

type FormState = {
  name: string
  organization: string
  email: string
  eventType: string
  eventDate: string
  audienceSize: string
  format: string
  location: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const emptyForm: FormState = {
  name: '',
  organization: '',
  email: '',
  eventType: '',
  eventDate: '',
  audienceSize: '',
  format: '',
  location: '',
  message: '',
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.organization.trim()) errors.organization = 'Organization is required'
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address'
  }
  if (!form.eventType) errors.eventType = 'Select an event type'
  if (!form.eventDate) errors.eventDate = 'Event date is required'
  if (!form.audienceSize.trim()) errors.audienceSize = 'Audience size is required'
  if (!form.format) errors.format = 'Select a format'
  if (!form.location.trim()) errors.location = 'Location is required'
  if (!form.message.trim()) errors.message = 'Message is required'
  return errors
}

export function SpeakingInvite() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    // TODO: Replace with a real speaking invitation API / backend endpoint.
    await new Promise((resolve) => window.setTimeout(resolve, 700))

    setSubmitting(false)
    setSubmitted(true)
    setForm(emptyForm)
  }

  return (
    <Section id="invite" className="bg-surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <Reveal>
            <header className="mb-6 sm:mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                Invite
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {speakingInvite.heading}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">{speakingInvite.description}</p>
            </header>

            {submitted ? (
              <div
                className="rounded-2xl border border-border/90 bg-background p-6 shadow-sm sm:p-8"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-6 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      Invitation received
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      Thanks for reaching out. This is a frontend confirmation only until the
                      backend endpoint is connected. We will follow up once submissions are wired.
                    </p>
                    <ReusableButton
                      type="button"
                      variant="outline"
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit another invitation
                    </ReusableButton>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-border/90 bg-background p-6 shadow-sm sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="invite-name">Name</Label>
                    <Input
                      id="invite-name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => setField('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'invite-name-error' : undefined}
                      className="mt-1.5"
                    />
                    {errors.name ? (
                      <p id="invite-name-error" className="mt-1.5 text-sm text-danger" role="alert">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="invite-organization">Organization</Label>
                    <Input
                      id="invite-organization"
                      autoComplete="organization"
                      value={form.organization}
                      onChange={(event) => setField('organization', event.target.value)}
                      aria-invalid={Boolean(errors.organization)}
                      aria-describedby={
                        errors.organization ? 'invite-organization-error' : undefined
                      }
                      className="mt-1.5"
                    />
                    {errors.organization ? (
                      <p
                        id="invite-organization-error"
                        className="mt-1.5 text-sm text-danger"
                        role="alert"
                      >
                        {errors.organization}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="invite-email">Email</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => setField('email', event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'invite-email-error' : undefined}
                      className="mt-1.5"
                    />
                    {errors.email ? (
                      <p id="invite-email-error" className="mt-1.5 text-sm text-danger" role="alert">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <Label htmlFor="invite-event-type">Event type</Label>
                    <div className="mt-1.5">
                      <FilterSelect
                        id="invite-event-type"
                        label="Event type"
                        hideLabel
                        fullWidth
                        variant="outlined"
                        placeholder="Select event type"
                        value={form.eventType}
                        options={[...eventTypeOptions]}
                        onChange={(value) => setField('eventType', value)}
                        error={errors.eventType}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="invite-date">Event date</Label>
                    <Input
                      id="invite-date"
                      type="date"
                      value={form.eventDate}
                      onChange={(event) => setField('eventDate', event.target.value)}
                      aria-invalid={Boolean(errors.eventDate)}
                      aria-describedby={errors.eventDate ? 'invite-date-error' : undefined}
                      className="mt-1.5"
                    />
                    {errors.eventDate ? (
                      <p id="invite-date-error" className="mt-1.5 text-sm text-danger" role="alert">
                        {errors.eventDate}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <Label htmlFor="invite-audience">Audience size</Label>
                    <Input
                      id="invite-audience"
                      placeholder="e.g. 40 clinicians"
                      value={form.audienceSize}
                      onChange={(event) => setField('audienceSize', event.target.value)}
                      aria-invalid={Boolean(errors.audienceSize)}
                      aria-describedby={
                        errors.audienceSize ? 'invite-audience-error' : undefined
                      }
                      className="mt-1.5"
                    />
                    {errors.audienceSize ? (
                      <p
                        id="invite-audience-error"
                        className="mt-1.5 text-sm text-danger"
                        role="alert"
                      >
                        {errors.audienceSize}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <Label htmlFor="invite-format">Format</Label>
                    <div className="mt-1.5">
                      <FilterSelect
                        id="invite-format"
                        label="Format"
                        hideLabel
                        fullWidth
                        variant="outlined"
                        placeholder="In-person or virtual"
                        value={form.format}
                        options={[...formatOptions]}
                        onChange={(value) => setField('format', value)}
                        error={errors.format}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="invite-location">Location</Label>
                    <Input
                      id="invite-location"
                      placeholder="City, venue, or virtual platform"
                      value={form.location}
                      onChange={(event) => setField('location', event.target.value)}
                      aria-invalid={Boolean(errors.location)}
                      aria-describedby={errors.location ? 'invite-location-error' : undefined}
                      className="mt-1.5"
                    />
                    {errors.location ? (
                      <p
                        id="invite-location-error"
                        className="mt-1.5 text-sm text-danger"
                        role="alert"
                      >
                        {errors.location}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="invite-message">Message</Label>
                    <Textarea
                      id="invite-message"
                      rows={5}
                      value={form.message}
                      onChange={(event) => setField('message', event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'invite-message-error' : undefined}
                      className="mt-1.5"
                    />
                    {errors.message ? (
                      <p
                        id="invite-message-error"
                        className="mt-1.5 text-sm text-danger"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <ReusableButton
                  type="submit"
                  variant="navy"
                  size="lg"
                  className="mt-6 w-full sm:w-auto"
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : speakingInvite.submitLabel}
                </ReusableButton>
              </form>
            )}
          </Reveal>

          <Reveal delayMs={70}>
            <div>
              <header className="mb-6 sm:mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                  FAQ
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Speaking questions
                </h3>
              </header>
              <FaqCardAccordion faqs={speakingFaqs} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
