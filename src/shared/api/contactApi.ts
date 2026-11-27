import { axiosInstance } from '@/shared/api/axiosInstance'
import { clinicConfig } from '@/shared/config/clinic'
import { siteConfig } from '@/shared/config/site'

export type PublicContact = {
  fullName: string
  email: string
  phone: string
}

export function toTelHref(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned ? `tel:${cleaned}` : '#'
}

export const fallbackPublicContact: PublicContact = {
  fullName: siteConfig.doctor.name,
  email: siteConfig.contactEmail,
  phone: clinicConfig.phones.appointments.label,
}

export const contactApi = {
  async getPublicContact() {
    const { data } = await axiosInstance.get<PublicContact>('/contact')
    return {
      fullName: data.fullName?.trim() || fallbackPublicContact.fullName,
      email: data.email?.trim() || fallbackPublicContact.email,
      phone: data.phone?.trim() || fallbackPublicContact.phone,
    }
  },
}
