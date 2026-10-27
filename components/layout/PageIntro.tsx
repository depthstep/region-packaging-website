import Link from 'next/link'

/** Beige title band for the simple utility pages (quote, products, blog, resources). */
export function PageIntro({ title, text, crumb }: { title: string; text?: string; crumb?: string }) {
  return (
    <section className="page-intro">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <span aria-current="page">{crumb ?? title}</span>
        </nav>
        <h1>{title}</h1>
        {text && <p className="page-intro__text">{text}</p>}
      </div>
    </section>
  )
}
