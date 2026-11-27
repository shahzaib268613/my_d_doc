import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type FocusEvent,
} from 'react'
import { Pencil, User, X } from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { ErrorState } from '@/features/admin/components/ErrorState'
import { FormField } from '@/features/admin/components/FormField'
import { LoadingState } from '@/features/admin/components/LoadingState'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import type { AdminProfile } from '@/features/admin/profile/types'
import { IconButton, Input } from '@/shared/components/ui'
import { useToast } from '@/shared/hooks/useToast'
import { cn } from '@/shared/utils/cn'

type Props = {
  open: boolean
  onClose: () => void
  profile: AdminProfile | null
  loading: boolean
  saving: boolean
  error: string | null
  saveProfile: (next: Omit<AdminProfile, 'role'>) => Promise<AdminProfile>
  reload: () => void
}

type ProfileForm = {
  fullName: string
  email: string
  phone: string
  username: string
}

type FormErrors = Partial<Record<keyof ProfileForm, string>>
type TouchedFields = Partial<Record<keyof ProfileForm, boolean>>

const EMAIL_PATTERN =
  /^(?=.{3,254}$)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'.-]{1,79}$/
const USERNAME_PATTERN = /^[A-Za-z0-9._-]{3,32}$/
const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15

const fieldOrder: Array<keyof ProfileForm> = ['fullName', 'email', 'phone', 'username']

const inputClassName =
  'rounded-lg border-border outline-none ring-0 focus:border-border focus:outline-none focus:ring-0'

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function toForm(values: ProfileForm): ProfileForm {
  return {
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    username: values.username,
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
    case 'username':
      if (!value) return 'Username is required'
      if (!USERNAME_PATTERN.test(value)) {
        return 'Use 3–32 characters: letters, numbers, dots, underscores, or hyphens'
      }
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

export function AdminProfileModal({
  open,
  onClose,
  profile,
  loading,
  saving,
  error,
  saveProfile,
  reload,
}: Props) {
  const titleId = useId()
  const { toast } = useToast()

  const [form, setForm] = useState<ProfileForm | null>(null)
  const [original, setOriginal] = useState<ProfileForm | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [isEditing, setIsEditing] = useState(false)

  const fullNameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const usernameId = useId()
  const personalSectionRef = useRef<HTMLElement>(null)

  const fieldIds: Record<keyof ProfileForm, string> = {
    fullName: fullNameId,
    email: emailId,
    phone: phoneId,
    username: usernameId,
  }

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open || !profile) return
    const next = toForm(profile)
    setForm(next)
    setOriginal(next)
    setErrors({})
    setTouched({})
    setIsEditing(false)
  }, [open, profile])

  if (!open) return null

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
    if (isEditing) {
      if (original) setForm(original)
      setErrors({})
      setTouched({})
      setIsEditing(false)
      return
    }
    onClose()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form || !isEditing) return

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
        username: form.username.trim(),
      })
      const next = toForm(saved)
      setForm(next)
      setOriginal(next)
      setErrors({})
      setTouched({})
      setIsEditing(false)
      toast('Profile updated successfully', 'success')
      onClose()
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

  const fieldsLocked = !isEditing || saving

  const ready = Boolean(form && original && profile)
  const dirty = ready ? isDirty(form!, original!) : false
  const initials = form
    ? form.fullName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('')
    : ''

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
        onClick={handleCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92dvh,44rem)] w-full max-w-[min(40rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-lg sm:rounded-xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-bold text-foreground">
              My Profile
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Manage your personal information and account details.
            </p>
          </div>
          <IconButton
            label="Close"
            onClick={handleCancel}
            className="shrink-0 text-muted-foreground hover:bg-soft hover:text-foreground"
          >
            <X className="size-5" />
          </IconButton>
        </div>

        {loading || !ready ? (
          <div className="p-4 sm:p-5">
            {error && !profile ? (
              <ErrorState
                title="Unable to load profile"
                description={error}
                className="rounded-[14px] border-0 bg-transparent py-8 shadow-none"
                action={
                  <AdminButton type="button" variant="outline" onClick={() => void reload()}>
                    Try again
                  </AdminButton>
                }
              />
            ) : (
              <LoadingState label="Loading profile" className="rounded-[14px] border-0 shadow-none" />
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col" noValidate>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-5">
              <section className="rounded-[14px] border border-border bg-background p-4 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div
                      className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-soft text-base font-bold text-primary ring-1 ring-border"
                      aria-hidden="true"
                    >
                      {initials || <User className="size-6" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-bold text-foreground">
                          {form!.fullName || 'Admin'}
                        </h3>
                        <StatusBadge label={profile!.role} tone="info" />
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{form!.email}</p>
                    </div>
                  </div>

                  <AdminButton
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={handleEditProfile}
                    disabled={isEditing || saving}
                  >
                    <Pencil className="size-3.5" aria-hidden="true" />
                    {isEditing ? 'Editing…' : 'Edit Profile'}
                  </AdminButton>
                </div>
              </section>

              <section
                ref={personalSectionRef}
                className="scroll-mt-4 rounded-[14px] border border-border bg-background p-4 shadow-sm"
              >
                <h3 className="text-sm font-bold text-foreground">Personal Information</h3>
                <div className="mt-4">
                  <FormField id={fullNameId} label="Full Name" required error={errors.fullName}>
                    <Input
                      id={fullNameId}
                      name="fullName"
                      autoComplete="name"
                      value={form!.fullName}
                      onChange={(event) => setField('fullName', event.target.value)}
                      onBlur={handleBlur('fullName')}
                      aria-invalid={Boolean(errors.fullName)}
                      className={cn(inputClassName, errors.fullName && 'border-danger')}
                      placeholder="Enter your full name"
                      disabled={fieldsLocked}
                      readOnly={!isEditing}
                    />
                  </FormField>
                </div>
              </section>

              <section className="rounded-[14px] border border-border bg-background p-4 shadow-sm">
                <h3 className="text-sm font-bold text-foreground">Contact Information</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <FormField id={emailId} label="Email Address" required error={errors.email}>
                    <Input
                      id={emailId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form!.email}
                      onChange={(event) => setField('email', event.target.value)}
                      onBlur={handleBlur('email')}
                      aria-invalid={Boolean(errors.email)}
                      className={cn(inputClassName, errors.email && 'border-danger')}
                      placeholder="you@domain.com"
                      disabled={fieldsLocked}
                      readOnly={!isEditing}
                    />
                  </FormField>

                  <FormField id={phoneId} label="Phone Number" required error={errors.phone}>
                    <Input
                      id={phoneId}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={form!.phone}
                      onChange={(event) => setField('phone', event.target.value)}
                      onBlur={handleBlur('phone')}
                      aria-invalid={Boolean(errors.phone)}
                      className={cn(inputClassName, errors.phone && 'border-danger')}
                      placeholder="+1 (555) 123-4567"
                      disabled={fieldsLocked}
                      readOnly={!isEditing}
                    />
                  </FormField>
                </div>
              </section>

              <section className="rounded-[14px] border border-border bg-background p-4 shadow-sm">
                <h3 className="text-sm font-bold text-foreground">Account Information</h3>
                <div className="mt-4">
                  <FormField id={usernameId} label="Username" required error={errors.username}>
                    <Input
                      id={usernameId}
                      name="username"
                      autoComplete="username"
                      value={form!.username}
                      onChange={(event) => setField('username', event.target.value)}
                      onBlur={handleBlur('username')}
                      aria-invalid={Boolean(errors.username)}
                      className={cn(inputClassName, errors.username && 'border-danger')}
                      placeholder="admin"
                      disabled={fieldsLocked}
                      readOnly={!isEditing}
                      spellCheck={false}
                    />
                  </FormField>
                </div>
              </section>
            </div>

            <div className="flex shrink-0 flex-col-reverse gap-2.5 border-t border-border px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-5">
              <AdminButton
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleCancel}
                disabled={saving}
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
        )}
      </div>
    </div>
  )
}
