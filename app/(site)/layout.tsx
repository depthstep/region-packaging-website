import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getSiteData } from '@/lib/data'
// Site styles live here (not the root layout) so they don't leak into the embedded Studio.
import '../styles/tokens.css'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/layout.css'
import '../styles/home.css'
import '../styles/product.css'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData()
  return (
    <>
      <Header data={data} />
      <main>{children}</main>
      <Footer settings={data.settings} />
    </>
  )
}
