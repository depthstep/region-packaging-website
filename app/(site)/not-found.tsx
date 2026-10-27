import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <h1>Page not found</h1>
        <p>The page you are looking for may have moved.</p>
        <div className="button-row">
          <ButtonLink href="/products">View All Products</ButtonLink>
          <ButtonLink href="/quote" variant="outline">
            Get a Quote
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
