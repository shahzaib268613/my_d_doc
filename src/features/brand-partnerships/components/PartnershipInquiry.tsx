import { useState, type FormEvent, type FocusEvent } from 'react'
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
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import { inquiriesApi } from '@/shared/api/inquiriesApi'
import { useToast } from '@/shared/hooks/useToast'
import { cn } from '@/shared/utils/cn'
import {
  budgetRangeOptions,
  collaborationTypeOptions,
  partnershipFaqs,
} from '../constants/content'

type FormState = {
  name: string
  company: string
  email: string
  collaborationType: string
  budgetRange: string
  timeline: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>
type TouchedFields = Partial<Record<keyof FormState, boolean>>

const emptyForm: FormState = {
  name: '',
  company: '',
  email: '',
  collaborationType: '',
  budgetRange: '',
  timeline: '',
  message: '',
}

const EMAIL_PATTERN =
  /^(?=.{3,254}$)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'.-]{1,79}$/
const collaborationValues = new Set(collaborationTypeOptions.map((item) => item.value))
const budgetValues = new Set(budgetRangeOptions.map((item) => item.value))

const fieldOrder: Array<keyof FormState> = [
  'name',
  'company',
  'email',
  'collaborationType',
  'budgetRange',
  'timeline',
  'message',
]

const fieldIds: Record<keyof FormState, string> = {
  name: 'partnership-name',
  company: 'partnership-company',
  email: 'partnership-email',
  collaborationType: 'partnership-collaboration',
  budgetRange: 'partnership-budget',
  timeline: 'partnership-timeline',
  message: 'partnership-message',
}

function validateField(key: keyof FormState, form: FormState): string | undefined {
  const value = form[key].trim()

  switch (key) {
    case 'name':
      if (!value) return 'Full name is required'
      if (value.length < 2) return 'Enter at least 2 characters'
      if (!NAME_PATTERN.test(value)) return 'Use letters, spaces, apostrophes, or hyphens only'
      return undefined
    case 'company':
      if (!value) return 'Company name is required'
      if (value.length < 2) return 'Enter at least 2 characters'
      if (value.length > 120) return 'Company name is too long'
      return undefined
    case 'email':
      if (!value) return 'Work email is required'
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address'
      return undefined
    case 'collaborationType':
      if (!value) return 'Select a collaboration type'
      if (!collaborationValues.has(value as (typeof collaborationTypeOptions)[number]['value'])) {
        return 'Select a valid collaboration type'
      }
      return undefined
    case 'budgetRange':
      if (!value) return 'Select a budget range'
      if (!budgetValues.has(value as (typeof budgetRangeOptions)[number]['value'])) {
        return 'Select a valid budget range'
      }
      return undefined
    case 'timeline':
      if (!value) return 'Timeline is required'
      if (value.length < 3) return 'Enter a clearer timeline (at least 3 characters)'
      if (value.length > 120) return 'Timeline is too long'
      return undefined
    case 'message':
      if (!value) return 'Message is required'
      if (value.length < 20) return 'Please share at least 20 characters about your inquiry'
      if (value.length > 2000) return 'Message is too long (max 2,000 characters)'
      return undefined
    default:
      return undefined
  }
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {}
  for (const key of fieldOrder) {
    const error = validateField(key, form)
    if (error) errors[key] = error
  }
  return errors
}

function RequiredMark() {
  return (
    <span className="text-danger" aria-hidden="true">
      {' '}
      *
    </span>
  )
}

export function PartnershipInquiry() {
  const { toast } = useToast()
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    const nextForm = { ...form, [key]: value }
    setForm(nextForm)

    if (touched[key] || errors[key]) {
      const fieldError = validateField(key, nextForm)
      setErrors((current) => {
        const next = { ...current }
        if (fieldError) next[key] = fieldError
        else delete next[key]
        return next
      })
    }
  }

  function handleBlur(key: keyof FormState) {
    return (_event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTouched((current) => ({ ...current, [key]: true }))
      const fieldError = validateField(key, form)
      setErrors((current) => {
        const next = { ...current }
        if (fieldError) next[key] = fieldError
        else delete next[key]
        return next
      })
    }
  }

  function focusFirstError(nextErrors: FormErrors) {
    const firstKey = fieldOrder.find((key) => nextErrors[key])
    if (!firstKey) return
    const node = document.getElementById(fieldIds[firstKey])
    node?.focus()
    node?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextTouched = Object.fromEntries(fieldOrder.map((key) => [key, true])) as TouchedFields
    setTouched(nextTouched)

    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }

    setSubmitting(true)

    try {
      await inquiriesApi.submitPartnership({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        collaborationType: form.collaborationType,
        budgetRange: form.budgetRange,
        timeline: form.timeline.trim(),
        message: form.message.trim(),
      })
      setSubmitted(true)
      setForm(emptyForm)
      setErrors({})
      setTouched({})
    } catch (error) {
      toast(getApiErrorMessage(error, 'Could not send your inquiry. Please try again.'), 'danger')
    } finally {
      setSubmitting(false)
    }
  }

  function inputClass(hasError: boolean) {
    return cn(
      'mt-1.5',
      hasError && 'border-danger focus:border-danger aria-[invalid=true]:border-danger',
    )
  }

  return (
    <Section id="inquiry" className="bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <Reveal>
            <header className="mb-6 sm:mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                Inquire
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Start a Partnership Inquiry
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Tell us about your brand and collaboration goals. Required fields are marked with *.
              </p>
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
                      Inquiry received
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      Thanks for your interest. This is a frontend confirmation only until the
                      backend endpoint is connected. We will follow up once submissions are wired.
                    </p>
                    <ReusableButton
                      type="button"
                      variant="outline"
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit another inquiry
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
                    <Label htmlFor="partnership-name">
                      Name
                      <RequiredMark />
                    </Label>
                    <Input
                      id="partnership-name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => setField('name', event.target.value)}
                      onBlur={handleBlur('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-required="true"
                      aria-describedby={errors.name ? 'partnership-name-error' : undefined}
                      className={inputClass(Boolean(errors.name))}
                    />
                    {errors.name ? (
                      <p
                        id="partnership-name-error"
                        className="mt-1.5 text-sm text-danger"
                        role="alert"
                      >
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="partnership-company">
                      Company
                      <RequiredMark />
                    </Label>
                    <Input
                      id="partnership-company"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(event) => setField('company', event.target.value)}
                      onBlur={handleBlur('company')}
                      aria-invalid={Boolean(errors.company)}
                      aria-required="true"
                      aria-describedby={errors.company ? 'partnership-company-error' : undefined}
                      className={inputClass(Boolean(errors.company))}
                    />
                    {errors.company ? (
                      <p
                        id="partnership-company-error"
                        className="mt-1.5 text-sm text-danger"
                        role="alert"
                      >
                        {errors.company}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="partnership-email">
                      Email
                      <RequiredMark />
                    </Label>
                    <Input
                      id="partnership-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={(event) => setField('email', event.target.value)}
                      onBlur={handleBlur('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-required="true"
                      aria-describedby={errors.email ? 'partnership-email-error' : undefined}
                      className={inputClass(Boolean(errors.email))}
                    />
                    {errors.email ? (
                      <p
                        id="partnership-email-error"
                        className="mt-1.5 text-sm text-danger"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <Label htmlFor="partnership-collaboration">
                      Collaboration type
                      <RequiredMark />
                    </Label>
                    <div className="mt-1.5">
                      <FilterSelect
                        id="partnership-collaboration"
                        label="Collaboration type"
                        hideLabel
                        fullWidth
                        variant="outlined"
                        placeholder="Select a type"
                        value={form.collaborationType}
                        options={[...collaborationTypeOptions]}
                        onChange={(value) => {
                          setTouched((current) => ({ ...current, collaborationType: true }))
                          setField('collaborationType', value)
                        }}
                        error={errors.collaborationType}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="partnership-budget">
                      Budget range
                      <RequiredMark />
                    </Label>
                    <div className="mt-1.5">
                      <FilterSelect
                        id="partnership-budget"
                        label="Budget range"
                        hideLabel
                        fullWidth
                        variant="outlined"
                        placeholder="Select a range"
                        value={form.budgetRange}
                        options={[...budgetRangeOptions]}
                        onChange={(value) => {
                          setTouched((current) => ({ ...current, budgetRange: true }))
                          setField('budgetRange', value)
                        }}
                        error={errors.budgetRange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="partnership-timeline">
                      Timeline
                      <RequiredMark />
                    </Label>
                    <Input
                      id="partnership-timeline"
                      placeholder="e.g. Q2 campaign, next 60 days"
                      value={form.timeline}
                      onChange={(event) => setField('timeline', event.target.value)}
                      onBlur={handleBlur('timeline')}
                      aria-invalid={Boolean(errors.timeline)}
                      aria-required="true"
                      aria-describedby={errors.timeline ? 'partnership-timeline-error' : undefined}
                      className={inputClass(Boolean(errors.timeline))}
                    />
                    {errors.timeline ? (
                      <p
                        id="partnership-timeline-error"
                        className="mt-1.5 text-sm text-danger"
                        role="alert"
                      >
                        {errors.timeline}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="partnership-message">
                      Message
                      <RequiredMark />
                    </Label>
                    <Textarea
                      id="partnership-message"
                      rows={5}
                      value={form.message}
                      onChange={(event) => setField('message', event.target.value)}
                      onBlur={handleBlur('message')}
                      aria-invalid={Boolean(errors.message)}
                      aria-required="true"
                      aria-describedby={errors.message ? 'partnership-message-error' : undefined}
                      className={inputClass(Boolean(errors.message))}
                    />
                    <div className="mt-1.5 flex items-start justify-between gap-3">
                      {errors.message ? (
                        <p
                          id="partnership-message-error"
                          className="text-sm text-danger"
                          role="alert"
                        >
                          {errors.message}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Minimum 20 characters</p>
                      )}
                      <p className="shrink-0 text-xs text-muted-foreground">
                        {form.message.trim().length}/2000
                      </p>
                    </div>
                  </div>
                </div>

                <ReusableButton
                  type="submit"
                  variant="navy"
                  size="lg"
                  className="mt-6 w-full sm:w-auto"
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : 'Submit Inquiry'}
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
                  Partnership questions
                </h3>
              </header>
              <FaqCardAccordion faqs={partnershipFaqs} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
