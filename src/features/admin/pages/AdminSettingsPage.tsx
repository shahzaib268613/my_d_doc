import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type FocusEvent,
  type ReactNode,
} from 'react'
import {
  Eye,
  EyeOff,
  IdCard,
  KeyRound,
  Lock,
  LockKeyhole,
  Mail,
  Pencil,
  Phone,
  PhoneCall,
  Shield,
  User,
} from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { ContentContainer } from '@/features/admin/components/ContentContainer'
import { ErrorState } from '@/features/admin/components/ErrorState'
import { FormField } from '@/features/admin/components/FormField'
import { LoadingState } from '@/features/admin/components/LoadingState'
import { PageHeader } from '@/features/admin/components/PageHeader'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { useAdminProfileModal } from '@/features/admin/components/AdminProfileModalContext'
import { getAdminRouteMeta } from '@/features/admin/constants/adminRoutes'
import { Input } from '@/shared/components/ui'
import { useToast } from '@/shared/hooks/useToast'
import { cn } from '@/shared/utils/cn'

type ProfileForm = {
  fullName: string
  email: string
  phone: string
  contactEmail: string
}

type PasswordForm = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type FormErrors = Partial<Record<keyof ProfileForm, string>>
type PasswordErrors = Partial<Record<keyof PasswordForm, string>>
type TouchedFields = Partial<Record<keyof ProfileForm, boolean>>

const EMAIL_PATTERN =
  /^(?=.{3,254}$)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'.-]{1,79}$/
const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15

const fieldOrder: Array<keyof ProfileForm> = ['fullName', 'email', 'phone', 'contactEmail']

const emptyPassword: PasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function toForm(values: ProfileForm): ProfileForm {
  return {
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    contactEmail: values.contactEmail,
  }
}

function validateField(key: keyof ProfileForm, form: ProfileForm): string | undefined {
  const value = form[key].trim()

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
      if (!/^[+\d][\d\s().-]{6,24}$/.test(value)) return 'Use a valid phone format'
      return undefined
    }
    case 'contactEmail':
      if (!value) return 'Contact email is required'
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid contact email'
      return undefined
    default:
      return undefined
  }
}

function validateForm(form: ProfileForm): FormErrors {
  const errors: FormErrors = {}
  for (const key of fieldOrder) {
    const error = validateField(key, form)
    if (error) errors[key] = error
  }
  return errors
}

function isDirty(form: ProfileForm, original: ProfileForm) {
  return fieldOrder.some((key) => form[key].trim() !== original[key].trim())
}

function passwordStrength(password: string) {
  let score = 0
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1
  return Math.min(4, score)
}

function strengthLabel(score: number) {
  if (score <= 1) return 'Weak'
  if (score === 2) return 'Fair'
  if (score === 3) return 'Good'
  return 'Strong'
}

function IconInput({
  icon,
  trailing,
  className,
  ...props
}: ComponentProps<typeof Input> & {
  icon: ReactNode
  trailing?: ReactNode
}) {
  return (
    <div className="relative flex items-center">
      <span className="pointer-events-none absolute left-3.5 text-muted-foreground">{icon}</span>
      <Input
        {...props}
        className={cn(
          'h-11 min-h-11 rounded-lg border-border bg-soft pl-11 pr-4 outline-none ring-0 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20',
          trailing && 'pr-11',
          className,
        )}
      />
      {trailing ? (
        <div className="absolute right-2.5 flex items-center">{trailing}</div>
      ) : null}
    </div>
  )
}

function SectionTitle({
  icon,
  title,
}: {
  icon: ReactNode
  title: string
}) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
    </div>
  )
}

export function AdminSettingsPage() {
  const meta = getAdminRouteMeta('/admin/settings')
  const { toast } = useToast()
  const { profile, loading, saving, error, saveProfile, reload } = useAdminProfileModal()

  const [form, setForm] = useState<ProfileForm | null>(null)
  const [original, setOriginal] = useState<ProfileForm | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [isEditing, setIsEditing] = useState(false)

  const [passwordForm, setPasswordForm] = useState<PasswordForm>(emptyPassword)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    next: false,
    confirm: false,
  })
  const [passwordSaving, setPasswordSaving] = useState(false)

  const fullNameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const contactEmailId = useId()
  const currentPasswordId = useId()
  const newPasswordId = useId()
  const confirmPasswordId = useId()
  const personalSectionRef = useRef<HTMLElement>(null)

  const fieldIds: Record<keyof ProfileForm, string> = {
    fullName: fullNameId,
    email: emailId,
    phone: phoneId,
    contactEmail: contactEmailId,
  }

  useEffect(() => {
    if (!profile) return
    const next = toForm(profile)
    setForm(next)
    setOriginal(next)
    setErrors({})
    setTouched({})
    setIsEditing(false)
  }, [profile])

  const strength = useMemo(
    () => passwordStrength(passwordForm.newPassword),
    [passwordForm.newPassword],
  )

  if (loading) {
    return <LoadingState label="Loading settings" className="rounded-[14px]" />
  }

  if (error && !profile) {
    return (
      <ErrorState
        title="Unable to load settings"
        description={error}
        className="rounded-[14px]"
        action={
          <AdminButton type="button" variant="outline" onClick={() => void reload()}>
            Try again
          </AdminButton>
        }
      />
    )
  }

  if (!form || !original || !profile) {
    return <LoadingState label="Loading settings" className="rounded-[14px]" />
  }

  function setField<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    const nextForm = { ...form!, [key]: value }
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

  function handleBlur(key: keyof ProfileForm) {
    return (_event: FocusEvent<HTMLInputElement>) => {
      setTouched((current) => ({ ...current, [key]: true }))
      const fieldError = validateField(key, form!)
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
    document.getElementById(fieldIds[firstKey])?.focus()
  }

  function handleCancel() {
    if (!isEditing) return
    setForm(original)
    setErrors({})
    setTouched({})
    setIsEditing(false)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isEditing) return

    const nextTouched = Object.fromEntries(fieldOrder.map((key) => [key, true])) as TouchedFields
    setTouched(nextTouched)

    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }

    try {
      const saved = await saveProfile({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        contactEmail: form.contactEmail.trim(),
      })
      const next = toForm(saved)
      setForm(next)
      setOriginal(next)
      setErrors({})
      setTouched({})
      setIsEditing(false)
      toast('Profile updated successfully', 'success')
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Unable to save your profile. Please try again.'
      toast(message, 'danger')
    }
  }

  function handleEditProfile() {
    setIsEditing(true)
    personalSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => {
      document.getElementById(fullNameId)?.focus()
    }, 180)
  }

  function validatePasswordForm(values: PasswordForm): PasswordErrors {
    const next: PasswordErrors = {}
    if (!values.currentPassword.trim()) next.currentPassword = 'Current password is required'
    if (!values.newPassword.trim()) next.newPassword = 'New password is required'
    else if (values.newPassword.length < 8) next.newPassword = 'Use at least 8 characters'
    if (!values.confirmPassword.trim()) next.confirmPassword = 'Confirm your new password'
    else if (values.confirmPassword !== values.newPassword) {
      next.confirmPassword = 'Passwords do not match'
    }
    if (
      values.currentPassword &&
      values.newPassword &&
      values.currentPassword === values.newPassword
    ) {
      next.newPassword = 'New password must be different from current password'
    }
    return next
  }

  async function handlePasswordUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validatePasswordForm(passwordForm)
    setPasswordErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setPasswordSaving(true)
    try {
      // Frontend-ready until auth password endpoint exists.
      await new Promise((resolve) => window.setTimeout(resolve, 500))
      toast('Password update will be available once admin auth is connected.', 'info')
      setPasswordForm(emptyPassword)
      setPasswordErrors({})
    } finally {
      setPasswordSaving(false)
    }
  }

  const fieldsLocked = !isEditing || saving
  const dirty = isDirty(form, original)
  const initials = form.fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <ContentContainer narrow className="min-w-0">
      <PageHeader
        title="Settings"
        description="Manage your account credentials, contact info, and security preferences."
        breadcrumbs={meta.breadcrumbs}
      />

      <div className="space-y-5 sm:space-y-6">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div
                className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-soft text-lg font-bold text-primary shadow-inner ring-1 ring-border"
                aria-hidden="true"
              >
                {initials || <User className="size-6" />}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="truncate font-display text-xl font-bold tracking-tight text-foreground">
                    {form.fullName || 'Admin'}
                  </h2>
                  <StatusBadge label={profile.role} tone="info" />
                </div>
                <p className="mt-1.5 truncate text-sm text-muted-foreground">{form.email}</p>
              </div>
            </div>

            <AdminButton
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleEditProfile}
              disabled={isEditing || saving}
            >
              <Pencil className="size-3.5 text-primary" aria-hidden="true" />
              {isEditing ? 'Editing…' : 'Edit Profile'}
            </AdminButton>
          </div>
        </section>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit} noValidate>
          <section
            ref={personalSectionRef}
            className="scroll-mt-24 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6 lg:p-8"
          >
            <SectionTitle
              icon={<IdCard className="size-5" aria-hidden="true" />}
              title="Personal Information"
            />
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <FormField id={fullNameId} label="Full Name" required error={errors.fullName}>
                <IconInput
                  id={fullNameId}
                  name="fullName"
                  autoComplete="name"
                  icon={<User className="size-5" aria-hidden="true" />}
                  value={form.fullName}
                  onChange={(event) => setField('fullName', event.target.value)}
                  onBlur={handleBlur('fullName')}
                  aria-invalid={Boolean(errors.fullName)}
                  className={cn(errors.fullName && 'border-danger')}
                  placeholder="Enter your full name"
                  disabled={fieldsLocked}
                  readOnly={!isEditing}
                />
              </FormField>

              <FormField id={emailId} label="Email Address" required error={errors.email}>
                <IconInput
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  icon={<Mail className="size-5" aria-hidden="true" />}
                  value={form.email}
                  onChange={(event) => setField('email', event.target.value)}
                  onBlur={handleBlur('email')}
                  aria-invalid={Boolean(errors.email)}
                  className={cn(errors.email && 'border-danger')}
                  placeholder="you@domain.com"
                  disabled={fieldsLocked}
                  readOnly={!isEditing}
                />
              </FormField>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6 lg:p-8">
            <SectionTitle
              icon={<PhoneCall className="size-5" aria-hidden="true" />}
              title="Contact Information"
            />
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <FormField id={phoneId} label="Phone Number" required error={errors.phone}>
                <IconInput
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  icon={<Phone className="size-5" aria-hidden="true" />}
                  value={form.phone}
                  onChange={(event) => setField('phone', event.target.value)}
                  onBlur={handleBlur('phone')}
                  aria-invalid={Boolean(errors.phone)}
                  className={cn(errors.phone && 'border-danger')}
                  placeholder="914-650-2806"
                  disabled={fieldsLocked}
                  readOnly={!isEditing}
                />
              </FormField>

              <FormField
                id={contactEmailId}
                label="Contact Email"
                required
                error={errors.contactEmail}
              >
                <IconInput
                  id={contactEmailId}
                  name="contactEmail"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  icon={<Mail className="size-5" aria-hidden="true" />}
                  value={form.contactEmail}
                  onChange={(event) => setField('contactEmail', event.target.value)}
                  onBlur={handleBlur('contactEmail')}
                  aria-invalid={Boolean(errors.contactEmail)}
                  className={cn(errors.contactEmail && 'border-danger')}
                  placeholder="contact@mydiabetesdoc.com"
                  disabled={fieldsLocked}
                  readOnly={!isEditing}
                />
              </FormField>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end sm:gap-3">
            <AdminButton
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleCancel}
              disabled={saving || !isEditing}
            >
              Cancel
            </AdminButton>
            <AdminButton
              type="submit"
              className="w-full sm:w-auto"
              disabled={saving || !isEditing || !dirty}
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </AdminButton>
          </div>
        </form>

        <form
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6 lg:p-8"
          onSubmit={handlePasswordUpdate}
          noValidate
        >
          <SectionTitle
            icon={<Shield className="size-5" aria-hidden="true" />}
            title="Password & Security"
          />

          <div className="max-w-xl space-y-5">
            <FormField
              id={currentPasswordId}
              label="Current Password"
              required
              error={passwordErrors.currentPassword}
            >
              <IconInput
                id={currentPasswordId}
                name="currentPassword"
                autoComplete="current-password"
                type={passwordVisible.current ? 'text' : 'password'}
                icon={<Lock className="size-5" aria-hidden="true" />}
                value={passwordForm.currentPassword}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    currentPassword: event.target.value,
                  }))
                }
                className={cn(passwordErrors.currentPassword && 'border-danger')}
                placeholder="Enter current password"
                disabled={passwordSaving}
                trailing={
                  <button
                    type="button"
                    aria-label={passwordVisible.current ? 'Hide password' : 'Show password'}
                    className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() =>
                      setPasswordVisible((current) => ({
                        ...current,
                        current: !current.current,
                      }))
                    }
                  >
                    {passwordVisible.current ? (
                      <EyeOff className="size-5" aria-hidden="true" />
                    ) : (
                      <Eye className="size-5" aria-hidden="true" />
                    )}
                  </button>
                }
              />
            </FormField>

            <FormField
              id={newPasswordId}
              label="New Password"
              required
              error={passwordErrors.newPassword}
            >
              <IconInput
                id={newPasswordId}
                name="newPassword"
                autoComplete="new-password"
                type={passwordVisible.next ? 'text' : 'password'}
                icon={<KeyRound className="size-5" aria-hidden="true" />}
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    newPassword: event.target.value,
                  }))
                }
                className={cn(passwordErrors.newPassword && 'border-danger')}
                placeholder="Enter new password"
                disabled={passwordSaving}
                trailing={
                  <button
                    type="button"
                    aria-label={passwordVisible.next ? 'Hide password' : 'Show password'}
                    className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() =>
                      setPasswordVisible((current) => ({
                        ...current,
                        next: !current.next,
                      }))
                    }
                  >
                    {passwordVisible.next ? (
                      <EyeOff className="size-5" aria-hidden="true" />
                    ) : (
                      <Eye className="size-5" aria-hidden="true" />
                    )}
                  </button>
                }
              />
              {passwordForm.newPassword ? (
                <div className="space-y-2 pt-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">Complexity Assessment</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[0.6875rem] font-semibold text-primary-foreground">
                      <Shield className="size-3" aria-hidden="true" />
                      {strengthLabel(strength)}
                    </span>
                  </div>
                  <div className="grid h-1.5 grid-cols-4 gap-1.5 overflow-hidden rounded-full bg-soft">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          'rounded-full transition-colors',
                          index < strength ? 'bg-primary' : 'bg-transparent',
                        )}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </FormField>

            <FormField
              id={confirmPasswordId}
              label="Confirm New Password"
              required
              error={passwordErrors.confirmPassword}
            >
              <IconInput
                id={confirmPasswordId}
                name="confirmPassword"
                autoComplete="new-password"
                type={passwordVisible.confirm ? 'text' : 'password'}
                icon={<LockKeyhole className="size-5" aria-hidden="true" />}
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                className={cn(passwordErrors.confirmPassword && 'border-danger')}
                placeholder="Confirm new password"
                disabled={passwordSaving}
                trailing={
                  <button
                    type="button"
                    aria-label={passwordVisible.confirm ? 'Hide password' : 'Show password'}
                    className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() =>
                      setPasswordVisible((current) => ({
                        ...current,
                        confirm: !current.confirm,
                      }))
                    }
                  >
                    {passwordVisible.confirm ? (
                      <EyeOff className="size-5" aria-hidden="true" />
                    ) : (
                      <Eye className="size-5" aria-hidden="true" />
                    )}
                  </button>
                }
              />
            </FormField>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <AdminButton type="submit" className="w-full sm:w-auto" disabled={passwordSaving}>
                <Lock className="size-3.5" aria-hidden="true" />
                {passwordSaving ? 'Updating…' : 'Update Password'}
              </AdminButton>
              <p className="text-xs text-muted-foreground sm:text-right">
                Password changes will connect to admin auth in a later update.
              </p>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-center gap-2 py-2 text-center text-xs text-muted-foreground sm:text-sm">
          <Lock className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            Protected clinical workspace · Keep credentials private and up to date
          </span>
        </div>
      </div>
    </ContentContainer>
  )
}
