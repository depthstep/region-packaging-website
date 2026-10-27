import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Region Packaging', template: '%s | Region Packaging' },
  description: 'Custom printed packaging and boxes with low minimums and fast turnaround.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: Next turns smooth scrolling off while changing page, so new pages open at the top instantly.
    <html lang="en" className={archivo.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
