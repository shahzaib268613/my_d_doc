import {
  CollaborateV2,
  HeroV2,
  HighlightsV2,
  LatestBlogV2,
  NewsletterV2,
  TopicsV2,
} from '../components/home-v2'

/** Alternate homepage design for client comparison (`/v2`). */
export function HomePage2() {
  return (
    <>
      <HeroV2 />
      <HighlightsV2 />
      <TopicsV2 navyButtons />
      <LatestBlogV2 />
      <CollaborateV2 />
      <NewsletterV2 />
    </>
  )
}
