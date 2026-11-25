/**
 * Clinic contact details for My Diabetes Doc.
 *
 * TODO(content): confirm with client whether My Diabetes Doc uses the same
 * clinic, phone numbers, hours and insurance list as the existing practice,
 * or has new ones. Values below are the known prior-practice details for easy
 * replacement once confirmed.
 */
export const clinicConfig = {
  address: '770 McLean Ave., #B, Yonkers, NY 10704',
  addressLines: ['770 McLean Ave., #B', 'Yonkers, NY 10704'] as const,
  phones: {
    appointments: {
      label: '914-650-2806',
      href: 'tel:+19146502806',
    },
    general: {
      label: '(914) 237-3636',
      href: 'tel:+19142373636',
    },
  },
  hours: [
    { day: 'Monday', time: '8:00 am – 5:00 pm' },
    { day: 'Tuesday', time: '8:00 am – 5:00 pm' },
    { day: 'Wednesday', time: '8:00 am – 2:30 pm' },
    { day: 'Thursday', time: '9:00 am – 6:00 pm' },
    { day: 'Friday', time: '8:00 am – 1:00 pm' },
    { day: 'Saturday', time: 'Closed' },
    { day: 'Sunday', time: 'Closed' },
  ] as const,
  telehealth: 'Telehealth via phone booking, 4:00 pm to 8:00 pm',
  insurance: [
    '1199',
    'Aetna Medicare',
    'Aetna PPO',
    'Blue Cross Blue Shield',
    'Cigna',
    'GHI',
    'HIP',
    'Medicare',
    'Tricare',
    'Self Pay',
  ] as const,
  /**
   * No dedicated booking route exists yet; mailto matches ContactForm until
   * a booking/contact page is added.
   * TODO(content): point this at the real booking route when available.
   */
  bookingHref: `mailto:hello@mydiabetesdoc.com?subject=${encodeURIComponent('Book an appointment')}`,
} as const
