import { Clock3, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { clinicConfig } from '@/shared/config/clinic'
import { Container, Reveal, Section } from '@/shared/components/ui'

export function VisitsLocationInsurance() {
  return (
    <Section className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-56 rounded-full bg-primary/10"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Visits, location and insurance
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
            <article className="rounded-2xl border border-border/90 bg-surface p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-soft text-primary ring-1 ring-primary/10">
                  <MapPin className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">Location</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {clinicConfig.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </article>

            <article className="rounded-2xl border border-border/90 bg-surface p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-soft text-primary ring-1 ring-primary/10">
                  <Phone className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">Phone</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  Appointments:{' '}
                  <a
                    href={clinicConfig.phones.appointments.href}
                    className="font-semibold text-primary no-underline hover:underline"
                  >
                    {clinicConfig.phones.appointments.label}
                  </a>
                </li>
                <li>
                  General:{' '}
                  <a
                    href={clinicConfig.phones.general.href}
                    className="font-semibold text-primary no-underline hover:underline"
                  >
                    {clinicConfig.phones.general.label}
                  </a>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-border/90 bg-surface p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-soft text-primary ring-1 ring-primary/10">
                  <Clock3 className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">Hours</h3>
              </div>
              <ul className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {clinicConfig.hours.map((item) => (
                  <li key={item.day} className="contents">
                    <span className="font-medium text-foreground">{item.day}</span>
                    <span className="text-right tabular-nums">{item.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {clinicConfig.telehealth}
              </p>
            </article>

            <article className="rounded-2xl border border-border/90 bg-surface p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-soft text-primary ring-1 ring-primary/10">
                  <ShieldCheck className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">Insurance</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {clinicConfig.insurance.map((plan) => (
                  <li
                    key={plan}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    {plan}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Most major plans accepted. Call us if you don&apos;t see yours.
              </p>
            </article>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
