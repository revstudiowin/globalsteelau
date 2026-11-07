import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ranges } from '../../data';
import { Arrow, Button, QuoteBanner } from '../../ui';

export function generateStaticParams() {
  return ranges.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = ranges.find((p) => p.slug === slug);
  return {
    title: product ? `${product.name} Supply | Global Steel Australia` : 'Products',
    description: product?.description,
  };
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = ranges.find((p) => p.slug === slug);
  if (!product) notFound();

  // Category specific spec sheets
  const categoryDetails: Record<string, { standards: string; leadTime: string; certification: string }> = {
    'steel-bar': {
      standards: 'AS/NZS 4671:2019 / Grade 500N & 250N',
      leadTime: 'Stock lengths available immediate dispatch; Cut & bend 2-4 business days',
      certification: 'ACRS Full Product Certification & Mill Test Reports',
    },
    'steel-mesh': {
      standards: 'AS/NZS 4671:2019 / Grade 500L High Ductility Ribbed Wire',
      leadTime: 'Full pack & loose sheet delivery available daily',
      certification: 'ACRS Quality Assured Manufacturing',
    },
    'accessories': {
      standards: 'AS 3600 Concrete Cover & Spacing Compliance',
      leadTime: 'Stock items dispatched same or next business day',
      certification: 'Compliant with Australian Building Code standards',
    },
  };

  const details = categoryDetails[slug] || {
    standards: 'Australian Standards Compliant',
    leadTime: 'Prompt dispatch nationwide',
    certification: 'ACRS Certified',
  };

  return (
    <>
      {/* Category Hero */}
      <section className="category-hero wrap">
        <div>
          <Link className="eyebrow breadcrumb" href="/products">
            ← All products / {product.number}
          </Link>
          <h1>
            {product.name}
            <span>.</span>
          </h1>
          <p>{product.description}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 24 }}>
            <Button href={`/contact#quote`}>
              Request quote for {product.name.toLowerCase()}
            </Button>
            <a
              href="tel:+61422136011"
              className="button secondary"
            >
              <span>Call +61 422 136 011</span> <Arrow />
            </a>
          </div>
        </div>
        <div className="category-photo">
          <img
            src={`/assets/${product.image}`}
            alt={`${product.name} detail`}
            width={1000}
            height={800}
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Quick Specs Pill Bar */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', padding: '24px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
              Applicable Standard
            </span>
            <strong style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 600 }}>
              {details.standards}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
              Quality Assurance
            </span>
            <strong style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 600 }}>
              {details.certification}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
              Dispatch & Timing
            </span>
            <strong style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 600 }}>
              {details.leadTime}
            </strong>
          </div>
        </div>
      </section>

      {/* Catalogue Grid */}
      <section className="catalogue wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Range Breakdown</span>
            <h2>Find your fit.</h2>
          </div>
          <p>
            Specific lengths, schedules, and custom bending tolerances are verified with
            your quote.
          </p>
        </div>

        <div className="catalogue-list">
          {product.items.map(([title, description], i) => (
            <article data-reveal className="catalogue-item" key={title}>
              <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <Link
                href={`/contact#quote`}
                aria-label={`Request quote for ${title}`}
                className="catalogue-link"
              >
                Get a quote <Arrow />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Other Ranges Linkage */}
      <section className="other-ranges wrap">
        <span className="eyebrow">Complete your schedule</span>
        <h2>Explore other ranges.</h2>
        {ranges
          .filter((p) => p.slug !== slug)
          .map((p) => (
            <Link href={`/products/${p.slug}`} key={p.slug}>
              <h3>{p.name}</h3>
              <Arrow />
            </Link>
          ))}
      </section>

      {/* Quote Banner */}
      <QuoteBanner />
    </>
  );
}
