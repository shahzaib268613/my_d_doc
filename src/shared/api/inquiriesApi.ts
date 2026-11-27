import { axiosInstance } from '@/shared/api/axiosInstance'

export type PartnershipInquiryPayload = {
  name: string
  company: string
  email: string
  collaborationType: string
  budgetRange: string
  timeline: string
  message: string
}

export type SpeakingInquiryPayload = {
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

export type AppointmentInquiryPayload = {
  fullName: string
  email: string
  phone: string
  date: string
  preferredTime: string
  message?: string
}

export const inquiriesApi = {
  async submitPartnership(payload: PartnershipInquiryPayload) {
    const { data } = await axiosInstance.post<{ ok: boolean }>(
      '/inquiries/partnership',
      payload,
    )
    return data
  },

  async submitSpeaking(payload: SpeakingInquiryPayload) {
    const { data } = await axiosInstance.post<{ ok: boolean }>(
      '/inquiries/speaking',
      payload,
    )
    return data
  },

  async submitAppointment(payload: AppointmentInquiryPayload) {
    const { data } = await axiosInstance.post<{ ok: boolean }>(
      '/inquiries/appointment',
      payload,
    )
    return data
  },
}
