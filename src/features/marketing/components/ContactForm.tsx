import { useState, type FormEvent } from 'react'
import { Button, Input, Label, Textarea } from '@/shared/components/ui'
import { siteConfig } from '@/shared/config/site'

export function ContactForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = encodeURIComponent('Website inquiry')
    const body = encodeURIComponent(`From: ${email}\n\n${message}`)
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <form className="max-w-lg space-y-4" onSubmit={submit}>
      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" required value={message} onChange={(event) => setMessage(event.target.value)} />
      </div>
      <Button type="submit">Send inquiry</Button>
      <p className="text-xs text-muted-foreground">This will open your email app.</p>
    </form>
  )
}
