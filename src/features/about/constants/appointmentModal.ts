export const appointmentModalCopy = {
  brand: 'My Diabetes Doc',
  eyebrow: 'Book an Appointment',
  headingLine1: 'Take the Next Step',
  headingLine2: 'in Your Diabetes Care',
  description:
    'Schedule an appointment with Dr. Jonas Leibowitz and get personalized care and expert guidance.',
  benefits: [
    { title: 'Flexible Scheduling', detail: 'Choose your preferred date & time' },
    { title: 'Expert Care', detail: 'Trusted endocrinology specialist' },
    { title: 'Better Health', detail: 'A healthier you, our priority' },
  ],
  formTitle: 'Appointment Details',
  formIntro: 'Fill in the details below to book your appointment.',
  submitLabel: 'Book Appointment',
  submittingLabel: 'Submitting…',
  cancelLabel: 'Cancel',
  successTitle: 'Request submitted',
  successMessage:
    'Thank you. Your appointment request has been submitted. This does not confirm a booked visit yet — our team will review your details and follow up to confirm availability and next steps.',
  successCloseLabel: 'Close',
  placeholders: {
    fullName: 'Enter your full name',
    email: 'you@domain.com',
    phone: '+1 (555) 123-4567',
    date: 'Select date',
    preferredTime: 'Select time',
    message: 'Any specific reason for your visit?',
  },
} as const

/** Preferred visit windows — preferences only, not confirmed availability. */
export const preferredTimeOptions = [
  { value: '09:00', label: '9:00 AM' },
  { value: '09:30', label: '9:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '13:30', label: '1:30 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '15:30', label: '3:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '16:30', label: '4:30 PM' },
] as const
