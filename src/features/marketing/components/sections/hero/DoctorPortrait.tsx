import portraitUrl from '../../../assets/doctor-portrait-v2.png'
import { siteConfig } from '@/shared/config/site'

/** Doctor image treatment matched to Home v3. */
export function DoctorPortrait() {
  return (
    <div className="relative ml-auto w-full max-w-sm lg:max-w-md">
      <figure className="relative">
        <img
          src={portraitUrl}
          alt={`${siteConfig.doctor.name}, ${siteConfig.doctor.title}`}
          className="h-auto max-h-[min(28rem,calc(100dvh-16rem))] w-full object-contain object-bottom"
          width={520}
          height={650}
        />
        <figcaption className="mt-3 rounded-2xl border border-inverse/10 bg-inverse px-5 py-3.5 text-center shadow-sm">
          <p className="font-display text-lg font-bold text-white sm:text-xl">
            {siteConfig.doctor.name}
          </p>
          <p className="mt-1 text-sm text-soft">
            {siteConfig.doctor.title} · {siteConfig.doctor.credentials}
          </p>
        </figcaption>
      </figure>
    </div>
  )
}
