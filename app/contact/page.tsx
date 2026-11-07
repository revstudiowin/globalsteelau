import type { Metadata } from 'next';
import { QuoteForm } from '../ui';

export const metadata: Metadata = {
  title: 'Contact & Request a Steel Quote | Global Steel Australia',
  description: 'Request a fast quote for reinforcing steel bar, mesh, and accessories. Australian Indigenous-owned steel supplier delivering nationwide.',
};

export default function Contact() {
  const faqs = [
    {
      q: 'Are your steel products ACRS certified?',
      a: 'Yes. Global Steel supplies certified reinforcing steel compliant with Australian standards AS/NZS 4671. Mill test certificates and traceability records are provided with your orders.',
    },
    {
      q: 'Can you provide custom cut and bent reinforcement?',
      a: 'Yes. We process steel bar to project specific bar bending schedules, including stirrups, column cages, corner bars, and specialized bends through our partner network.',
    },
    {
      q: 'How does delivery and site access work?',
      a: 'We coordinate Hiab and flatbed deliveries directly to your job site or yard across Australia. Simply specify crane requirements or access restrictions when submitting your quote.',
    },
    {
      q: 'What is the usual quote turnaround time?',
      a: 'Standard schedules and stock enquiries are typically quoted within 2 to 4 business hours. Complex structural bending schedules are processed promptly by our estimating team.',
    },
    {
      q: 'Do you supply residential concreters as well as commercial builders?',
      a: 'Yes. We supply projects of all scales—from individual house slabs, footings, and swimming pools to major commercial, industrial, and infrastructure civil developments.',
    },
  ];

  return (
    <>
      {/* Intro Header */}
      <section className="page-intro wrap">
        <span className="eyebrow">Contact / Request a Quote</span>
        <h1>
          Every strong build
          <br />
          starts with a <span>conversation.</span>
        </h1>
        <p>
          Need pricing, bar schedules, or custom lead times? Share your project details
          below, and our team will prepare a transparent, competitive quote.
        </p>
      </section>

      {/* Main Contact & Quote Layout */}
      <section className="contact-layout wrap" id="quote">
        <aside>
          <span className="eyebrow">Direct Contact</span>
          <h2>Let’s talk steel.</h2>

          <div className="contact-method">
            <span>Direct Phone</span>
            <a href="tel:+61422136011">+61 422 136 011 ↗</a>
            <small>Monday–Friday, 8:00 am – 5:00 pm AEST</small>
          </div>

          <div className="contact-method">
            <span>Email Enquiries</span>
            <a href="mailto:globalsteelaus@gmail.com">globalsteelaus@gmail.com ↗</a>
            <small>Send engineering drawings & schedules</small>
          </div>

          <div className="contact-method">
            <span>Coverage</span>
            <p style={{ fontSize: 13, color: 'var(--ink)', margin: '4px 0 0', fontWeight: 500 }}>
              Australia-wide supply to metro & regional jobsites
            </p>
          </div>

          <div
            style={{
              marginTop: 32,
              padding: 24,
              background: 'var(--paper)',
              border: '1px solid var(--line)',
            }}
          >
            <strong style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 8, color: 'var(--ink)' }}>
              Tips for a Faster Quote
            </strong>
            <ul style={{ paddingLeft: 18, margin: 0, fontSize: 12, lineHeight: 1.7, color: 'var(--muted)' }}>
              <li>Specify bar diameters (e.g. N12, N16) & mesh types (e.g. SL72)</li>
              <li>Include approximate delivery suburb/postcode</li>
              <li>Attach bar bending schedule or site drawings if available</li>
            </ul>
          </div>
        </aside>

        <div>
          <h2>Tell us about your project.</h2>
          <QuoteForm />
        </div>
      </section>

      {/* Practical FAQs */}
      <section className="faq wrap">
        <span className="eyebrow">Frequently Asked Questions</span>
        <h2>A few practical details.</h2>
        {faqs.map(({ q, a }) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
