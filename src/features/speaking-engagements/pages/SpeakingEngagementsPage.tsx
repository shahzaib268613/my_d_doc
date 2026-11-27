import { FormatsAndAudiences } from '../components/FormatsAndAudiences'
import { PastEngagements } from '../components/PastEngagements'
import { SpeakerIntroduction } from '../components/SpeakerIntroduction'
import { SpeakingHero } from '../components/SpeakingHero'
import { SpeakingInvite } from '../components/SpeakingInvite'
import { SpeakingTestimonials } from '../components/SpeakingTestimonials'
import { SpeakingTopics } from '../components/SpeakingTopics'
import { useSpeakingEngagementsPageMeta } from '../hooks/useSpeakingEngagementsPageMeta'

export function SpeakingEngagementsPage() {
  useSpeakingEngagementsPageMeta()

  return (
    <>
      <SpeakingHero />
      <SpeakerIntroduction />
      <SpeakingTopics />
      <FormatsAndAudiences />
      <PastEngagements />
      <SpeakingTestimonials />
      <SpeakingInvite />
    </>
  )
}
