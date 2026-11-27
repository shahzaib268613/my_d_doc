import { AudienceReach } from '../components/AudienceReach'
import { AwardsRecognition } from '../components/AwardsRecognition'
import { CollaborateWays } from '../components/CollaborateWays'
import { HowItWorks } from '../components/HowItWorks'
import { PartnershipHero } from '../components/PartnershipHero'
import { PartnershipInquiry } from '../components/PartnershipInquiry'
import { TrustStats } from '../components/TrustStats'
import { WhyPartner } from '../components/WhyPartner'
import { useBrandPartnershipsPageMeta } from '../hooks/useBrandPartnershipsPageMeta'

export function BrandPartnershipsPage() {
  useBrandPartnershipsPageMeta()

  return (
    <>
      <div className="flex min-h-[calc(100dvh-5rem)] flex-col">
        <PartnershipHero />
        <AwardsRecognition />
      </div>
      <TrustStats />
      <WhyPartner />
      <CollaborateWays />
      <AudienceReach />
      <HowItWorks />
      <PartnershipInquiry />
    </>
  )
}
