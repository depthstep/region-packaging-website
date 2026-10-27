import type { Metadata } from 'next'
import { PageIntro } from '@/components/layout/PageIntro'

export const metadata: Metadata = { title: 'Paper Weight Chart' }

export default function PaperWeightChartPage() {
  return (
    <>
      <PageIntro title="Paper Weight Chart" />
      <section className="section section--tight">
        <div className="container narrow">
          <p className="placeholder-text">[Placeholder] The paper weight chart has not been supplied yet.</p>
        </div>
      </section>
    </>
  )
}
