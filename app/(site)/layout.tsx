import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getSiteData } from '@/lib/data'
// The website and the Payload admin (app/(payload)) are separate root layouts, so these
// styles never reach the admin.
import '../styles/tokens.css'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/layout.css'
import '../styles/home.css'
import '../styles/product.css'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Region Packaging', template: '%s | Region Packaging' },
  description: 'Custom printed packaging and boxes with low minimums and fast turnaround.',
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData()
  return (
    // data-scroll-behavior: Next turns smooth scrolling off while changing page, so new pages open at the top instantly.
    <html lang="en" className={archivo.variable} data-scroll-behavior="smooth">
      <body>
        <Header data={data} />
        <main>{children}</main>
        <Footer settings={data.settings} />
      </body>
    </html>
  )
}
