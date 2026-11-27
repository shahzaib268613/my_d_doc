import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type FocusEvent,
} from 'react'
import { createPortal } from 'react-dom'
import {
  CalendarDays,
  CheckCircle2,
  Heart,
  ShieldCheck,
  X,
} from 'lucide-react'
import logoUrl from '@/shared/assets/logo.jpg'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import { inquiriesApi } from '@/shared/api/inquiriesApi'
import {
  FilterSelect,
  IconButton,
  Input,
  Label,
  ReusableButton,
  Textarea,
} from '@/shared/components/ui'
import { useToast } from '@/shared/hooks/useToast'
import { cn } from '@/shared/utils/cn'
import {
  appointmentModalCopy,
  preferredTimeOptions,
} from '../constants/appointmentModal'

type Props = {
  open: boolean
  onClose: () => void
}

type FormState = {
  fullName: string
  email: string
  phone: string
  date: string
  preferredTime: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>
type TouchedFields = Partial<Record<keyof FormState, boolean>>

const emptyForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  date: '',
  preferredTime: '',
  message: '',
}

const EMAIL_PATTERN =
  /^(?=.{3,254}$)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'.-]{1,79}$/
const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15

const preferredTimeValues = new Set(preferredTimeOptions.map((item) => item.value))

const fieldOrder: Array<keyof FormState> = [
  'fullName',
  'email',
  'phone',
  'date',
  'preferredTime',
  'message',
]

const benefitIcons = [CalendarDays, ShieldCheck, Heart] as const

const fieldLabelClass = 'mb-1.5 text-[0.8125rem] font-semibold text-[#1b2f43]'
const controlBaseClass =
  'mt-0 h-10 rounded-lg border-[#c9dceb] bg-white px-3 text-[0.9375rem] text-[#1b2f43] placeholder:text-[#98a8b8] focus:border-primary'

function todayLocalIsoDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function validateField(key: keyof FormState, form: FormState): string | undefined {
  const value = form[key].trim()
  const minDate = todayLocalIsoDate()

  switch (key) {
    case 'fullName':
      if (!value) return 'Full name is required'
      if (value.length < 2) return 'Enter at least 2 characters'
      if (!NAME_PATTERN.test(value)) return 'Use letters, spaces, apostrophes, or hyphens only'
      return undefined
    case 'email':
      if (!value) return 'Email address is required'
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address'
      return undefined
    case 'phone': {
      if (!value) return 'Phone number is required'
      const digits = digitsOnly(value)
      if (digits.length < PHONE_DIGITS_MIN || digits.length > PHONE_DIGITS_MAX) {
        return 'Enter a valid phone number'
      }
      if (!/^[+\d][\d\s().-]{6,24}$/.test(value)) {
        return 'Use a valid phone format'
      }
      return undefined
    }
    case 'date':
      if (!value) return 'Appointment date is required'
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Enter a valid date'
      if (value < minDate) return 'Choose today or a future date'
      return undefined
    case 'preferredTime':
      if (!value) return 'Preferred time is required'
      if (!preferredTimeValues.has(value as (typeof preferredTimeOptions)[number]['value'])) {
        return 'Select a valid preferred time'
      }
      return undefined
    case 'message':
      if (!value) return undefined
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
    <span className="text-[#e11d48]" aria-hidden="true">
      {' '}
      *
    </span>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1 text-xs text-[#e11d48]" role="alert">
      {message}
    </p>
  )
}

export function BookAppointmentModal({ open, onClose }: Props) {
  const { toast } = useToast()
  const titleId = useId()
  const descriptionId = useId()
  const formIds = {
    fullName: useId(),
    email: useId(),
    phone: useId(),
    date: useId(),
    preferredTime: useId(),
    message: useId(),
  }
  const errorIds = {
    fullName: useId(),
    email: useId(),
    phone: useId(),
    date: useId(),
    preferredTime: useId(),
    message: useId(),
  }

  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const minDate = todayLocalIsoDate()

  useEffect(() => {
    if (!open) return

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-appointment-close]')?.focus()
    }, 0)

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocusedRef.current?.focus()
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) return
    setForm(emptyForm)
    setErrors({})
    setTouched({})
    setSubmitting(false)
    setSubmitted(false)
  }, [open])

  if (!open || typeof document === 'undefined') return null

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
    const node = document.getElementById(formIds[firstKey])
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
      await inquiriesApi.submitAppointment({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        date: form.date,
        preferredTime: form.preferredTime,
        message: form.message.trim(),
      })
      setSubmitted(true)
      setForm(emptyForm)
      setErrors({})
      setTouched({})
    } catch (error) {
      toast(
        getApiErrorMessage(error, 'Could not submit your appointment request. Please try again.'),
        'danger',
      )
    } finally {
      setSubmitting(false)
    }
  }

  function controlClass(hasError: boolean) {
    return cn(
      controlBaseClass,
      hasError && 'border-[#e11d48] focus:border-[#e11d48] aria-[invalid=true]:border-[#e11d48]',
    )
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-5">
      <div
        className="absolute inset-0 bg-[color-mix(in_srgb,#24384c_48%,transparent)] backdrop-blur-[3px]"
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          'relative z-10 flex w-full max-w-[890px] flex-col overflow-hidden bg-white shadow-[0_24px_64px_rgba(27,47,67,0.28)]',
          'max-h-[100dvh] rounded-t-[18px] sm:max-h-[min(560px,92dvh)] sm:rounded-[18px]',
          'pb-[env(safe-area-inset-bottom)]',
        )}
      >
        <IconButton
          label="Close"
          data-appointment-close=""
          className="absolute right-2.5 top-2.5 z-20 cursor-pointer bg-white/90 text-[#1b2f43]/80 shadow-sm transition-colors duration-[var(--duration-fast)] hover:bg-soft hover:text-inverse sm:right-3.5 sm:top-3.5"
          onClick={onClose}
        >
          <X className="size-5" aria-hidden="true" strokeWidth={2.1} />
        </IconButton>

        <div className="grid min-h-0 w-full flex-1 overflow-y-auto overscroll-contain lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:overflow-hidden">
          {/* LEFT PANEL ~40% */}
          <aside className="relative overflow-hidden border-b border-[#d4e5f2] bg-[linear-gradient(180deg,#f6fbfe_0%,#eaf4fb_55%,#dceef8_100%)] px-5 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-7 lg:h-full lg:overflow-hidden lg:border-b-0 lg:border-r lg:border-[#d4e5f2] lg:px-8 lg:py-8">
            <div
              className="pointer-events-none absolute -left-20 top-28 h-64 w-64 rounded-full bg-[#c5dff0]/55 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-[#b7d7ed]/45 blur-3xl"
              aria-hidden="true"
            />
            <svg
              className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-36 w-full text-[#cfe3f2]/80 sm:block"
              viewBox="0 0 360 140"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 88C54 58 96 118 156 96C214 74 250 34 360 52V140H0V88Z"
                fill="currentColor"
              />
              <path
                d="M0 108C70 86 118 128 180 112C248 94 292 68 360 82V140H0V108Z"
                fill="color-mix(in srgb, #a9cfe8 55%, transparent)"
              />
            </svg>

            <div className="relative z-[1] pr-8">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img
                  src={logoUrl}
                  alt=""
                  width={52}
                  height={52}
                  className="size-10 rounded-full object-cover shadow-sm ring-2 ring-white sm:size-[52px]"
                />
                <span className="font-display text-base font-bold tracking-tight text-[#1b2f43] sm:text-[1.05rem]">
                  {appointmentModalCopy.brand}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3 sm:mt-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[0.68rem] sm:tracking-[0.18em]">
                  {appointmentModalCopy.eyebrow}
                </p>
                <span className="h-px w-8 bg-primary/50 sm:w-9" aria-hidden="true" />
              </div>

              <h2
                id={titleId}
                className="mt-2 font-display text-[1.45rem] font-bold leading-[1.15] tracking-tight text-[#1b2f43] sm:mt-2.5 sm:text-[1.7rem] lg:text-[1.85rem]"
              >
                {appointmentModalCopy.headingLine1}
                <br />
                {appointmentModalCopy.headingLine2}
              </h2>

              <p
                id={descriptionId}
                className="mt-2.5 max-w-none text-[0.8125rem] leading-relaxed text-[#5f7082] sm:mt-3 sm:max-w-[18.5rem] sm:text-[0.875rem]"
              >
                {appointmentModalCopy.description}
              </p>

              <ul className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:space-y-0 sm:gap-4 lg:block lg:space-y-4 lg:gap-0">
                {appointmentModalCopy.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index] ?? CalendarDays
                  return (
                    <li key={benefit.title} className="flex items-start gap-2.5 sm:gap-3">
                      <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e8f3fb] text-primary ring-1 ring-[#d2e6f4] sm:size-8">
                        <Icon className="size-3.5 sm:size-4" aria-hidden="true" strokeWidth={1.85} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.85rem] font-semibold text-[#1b2f43] sm:text-[0.9rem]">
                          {benefit.title}
                        </p>
                        <p className="mt-0.5 text-[0.75rem] leading-relaxed text-[#6b7c8d] sm:text-[0.78rem]">
                          {benefit.detail}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          {/* RIGHT PANEL ~60% */}
          <div className="relative flex min-h-0 flex-col bg-white px-5 py-5 sm:px-7 sm:py-6 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:px-8 lg:py-7">
            {submitted ? (
              <div className="flex flex-1 flex-col justify-center py-6 pr-6 sm:pr-8">
                <div className="inline-flex size-12 items-center justify-center rounded-full bg-[#e8f3fb] text-primary">
                  <CheckCircle2 className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-[#1b2f43] sm:text-2xl">
                  {appointmentModalCopy.successTitle}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5f7082]">
                  {appointmentModalCopy.successMessage}
                </p>
                <div className="mt-8">
                  <ReusableButton
                    type="button"
                    variant="navy"
                    className="h-11 w-full rounded-lg px-5 sm:w-auto"
                    onClick={onClose}
                  >
                    {appointmentModalCopy.successCloseLabel}
                  </ReusableButton>
                </div>
              </div>
            ) : (
              <form
                className="flex min-h-0 flex-1 flex-col"
                onSubmit={handleSubmit}
                noValidate
              >
                <header className="mb-4 max-w-none pr-8 sm:max-w-[92%]">
                  <h3 className="font-display text-[1.3rem] font-bold tracking-tight text-[#1b2f43] sm:text-[1.55rem]">
                    {appointmentModalCopy.formTitle}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] text-[#6b7c8d]">
                    {appointmentModalCopy.formIntro}
                  </p>
                </header>

                <div className="grid grid-cols-1 gap-x-3.5 gap-y-3 sm:grid-cols-2">
                  <div className="min-w-0">
                    <Label htmlFor={formIds.fullName} className={fieldLabelClass}>
                      Full Name
                      <RequiredMark />
                    </Label>
                    <Input
                      id={formIds.fullName}
                      name="fullName"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(event) => setField('fullName', event.target.value)}
                      onBlur={handleBlur('fullName')}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? errorIds.fullName : undefined}
                      className={controlClass(Boolean(errors.fullName))}
                      placeholder={appointmentModalCopy.placeholders.fullName}
                      disabled={submitting}
                    />
                    <FieldError id={errorIds.fullName} message={errors.fullName} />
                  </div>

                  <div className="min-w-0">
                    <Label htmlFor={formIds.email} className={fieldLabelClass}>
                      Email Address
                      <RequiredMark />
                    </Label>
                    <Input
                      id={formIds.email}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={(event) => setField('email', event.target.value)}
                      onBlur={handleBlur('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? errorIds.email : undefined}
                      className={controlClass(Boolean(errors.email))}
                      placeholder={appointmentModalCopy.placeholders.email}
                      disabled={submitting}
                    />
                    <FieldError id={errorIds.email} message={errors.email} />
                  </div>

                  <div className="min-w-0">
                    <Label htmlFor={formIds.phone} className={fieldLabelClass}>
                      Phone Number
                      <RequiredMark />
                    </Label>
                    <Input
                      id={formIds.phone}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(event) => setField('phone', event.target.value)}
                      onBlur={handleBlur('phone')}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? errorIds.phone : undefined}
                      className={controlClass(Boolean(errors.phone))}
                      placeholder={appointmentModalCopy.placeholders.phone}
                      disabled={submitting}
                    />
                    <FieldError id={errorIds.phone} message={errors.phone} />
                  </div>

                  <div className="min-w-0">
                    <Label htmlFor={formIds.date} className={fieldLabelClass}>
                      Appointment Date
                      <RequiredMark />
                    </Label>
                    <div className="relative min-w-0">
                      {!form.date ? (
                        <span className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-[0.875rem] text-[#98a8b8] sm:text-[0.9375rem]">
                          {appointmentModalCopy.placeholders.date}
                        </span>
                      ) : null}
                      <Input
                        id={formIds.date}
                        name="date"
                        type="date"
                        min={minDate}
                        value={form.date}
                        onChange={(event) => setField('date', event.target.value)}
                        onBlur={handleBlur('date')}
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={errors.date ? errorIds.date : undefined}
                        className={cn(
                          controlClass(Boolean(errors.date)),
                          'relative z-[2] w-full min-w-0 max-w-full pr-3',
                          !form.date &&
                            '[&::-webkit-datetime-edit]:text-transparent [&::-webkit-datetime-edit-fields-wrapper]:text-transparent',
                        )}
                        disabled={submitting}
                      />
                    </div>
                    <FieldError id={errorIds.date} message={errors.date} />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor={formIds.preferredTime} className={fieldLabelClass}>
                      Preferred Time
                      <RequiredMark />
                    </Label>
                    <FilterSelect
                      id={formIds.preferredTime}
                      label="Preferred Time"
                      hideLabel
                      value={form.preferredTime}
                      options={[...preferredTimeOptions]}
                      onChange={(value) => {
                        setTouched((current) => ({ ...current, preferredTime: true }))
                        setField('preferredTime', value)
                      }}
                      placeholder={appointmentModalCopy.placeholders.preferredTime}
                      fullWidth
                      disabled={submitting}
                      error={errors.preferredTime}
                      className="mt-0 [&_button]:h-10 [&_button]:min-h-10 [&_button]:rounded-lg [&_button]:border-[#c9dceb] [&_button]:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor={formIds.message} className={fieldLabelClass}>
                      Your Message{' '}
                      <span className="font-medium text-[#7a8b9b]">(Optional)</span>
                    </Label>
                    <Textarea
                      id={formIds.message}
                      name="message"
                      value={form.message}
                      onChange={(event) => setField('message', event.target.value)}
                      onBlur={handleBlur('message')}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? errorIds.message : undefined}
                      className={cn(
                        'mt-0 min-h-[70px] rounded-lg border-[#c9dceb] bg-white px-3 py-2 text-[0.9375rem] text-[#1b2f43] placeholder:text-[#98a8b8] focus:border-primary',
                        errors.message && 'border-[#e11d48] focus:border-[#e11d48]',
                      )}
                      placeholder={appointmentModalCopy.placeholders.message}
                      disabled={submitting}
                      rows={3}
                    />
                    <FieldError id={errorIds.message} message={errors.message} />
                  </div>
                </div>

                <div className="sticky bottom-0 mt-auto bg-white pt-4 sm:static">
                  <div className="mb-3.5 h-px w-full bg-[#d7e7f3]" aria-hidden="true" />
                  <div className="flex flex-col-reverse gap-2.5 pb-1 sm:flex-row sm:justify-end sm:gap-3 sm:pb-0">
                    <ReusableButton
                      type="button"
                      variant="outline"
                      className="h-11 w-full rounded-lg border-[#7eb6d8] px-5 font-semibold text-[#1b2f43] shadow-none hover:border-primary hover:bg-[#f3f9fd] sm:h-10 sm:w-auto"
                      onClick={onClose}
                      disabled={submitting}
                    >
                      {appointmentModalCopy.cancelLabel}
                    </ReusableButton>
                    <ReusableButton
                      type="submit"
                      variant="navy"
                      className="h-11 w-full rounded-lg px-5 shadow-[0_8px_18px_rgba(27,47,67,0.22)] sm:h-10 sm:w-auto"
                      disabled={submitting}
                    >
                      <CalendarDays className="size-4" aria-hidden="true" />
                      {submitting
                        ? appointmentModalCopy.submittingLabel
                        : appointmentModalCopy.submitLabel}
                    </ReusableButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
