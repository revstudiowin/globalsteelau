import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, Button, QuoteBanner } from '../ui';

export const metadata: Metadata = {
  title: 'About Global Steel Australia | Indigenous-Owned Steel Supply',
  description: 'Learn about Global Steel Australia: an Australian Indigenous-owned supplier connecting builders and contractors with ACRS certified reinforcing steel products nationwide.',
};

export default function About() {
  const pillars = [
    {
      number: '01',
      title: 'Indigenous Ownership & Community',
      description:
        'Global Steel is proudly an Australian Indigenous-owned enterprise. We believe in active participation in the construction supply chain, supporting Aboriginal employment, practical trade training, and grassroots community initiatives across Australia.',
    },
    {
      number: '02',
      title: 'ACRS Quality & Traceability',
      description:
        'Compliance is non-negotiable on structural projects. We specialise in ACRS certified reinforcing steel products conforming to AS/NZS 4671. Mill test certificates and compliance documentation are provided with your orders.',
    },
    {
      number: '03',
      title: 'Custom Cutting & Bending',
      description:
        'Projects rarely fit stock lengths alone. Through our dedicated partner network, we coordinate precision cut-and-bent reinforcement, fabricated cages, dowels, and customized mesh schedules to suit your site drawings.',
    },
    {
      number: '04',
      title: 'Nationwide Partner Network',
      description:
        'From single residential slabs to major infrastructure and commercial developments, we coordinate reliable delivery schedules directly to site across regional and metropolitan Australia.',
    },
  ];

  return (
    <>
      {/* Intro Section */}
      <section className="page-intro wrap">
        <span className="eyebrow">About / Global Steel Australia</span>
        <h1>
          Strong foundations.
          <br />
          <span>Shared ambition.</span>
        </h1>
        <p>
          An Australian Indigenous-owned steel supplier supporting commercial,
          residential, and civil builders with compliant reinforcement products and
          practical sourcing.
        </p>
      </section>

      {/* Hero Visual Banner */}
      <div className="about-wide wrap">
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src="/assets/hero.webp"
            width={1920}
            height={1000}
            alt="Steel reinforcement on Australian construction site"
            fetchPriority="high"
            style={{ width: '100%', height: 'clamp(320px, 45vw, 650px)', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              background: 'white',
              padding: '10px 18px',
              fontSize: 10,
              letterSpacing: '0.16em',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--ink)',
            }}
          >
            GS / National Supply · Est. 2022
          </div>
        </div>
      </div>

      {/* Story Strip */}
      <section className="about-strip wrap" data-reveal>
        <span className="eyebrow">Our Story / Established 2022</span>
        <div>
          <h2>
            Built around
            <br />
            your build.
          </h2>
          <div>
            <p>
              Global Steel was established in 2022 to provide Australian builders,
              concreters, and civil contractors with a direct, reliable partner for
              reinforcing steel.
            </p>
            <p>
              Our comprehensive range encompasses deformed stock bar, cut and bent
              steel, pool steel, reinforcing mesh sheets, trench mesh, and essential
              concrete accessories. Every product is backed by practical advice and
              prompt logistics.
            </p>
            <div style={{ marginTop: 28 }}>
              <Button href="/products">Explore our product range</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Operational Pillars */}
      <section style={{ background: 'var(--paper)', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ marginBottom: 48 }} data-reveal>
            <span className="eyebrow">Our Principles</span>
            <h2 style={{ color: 'var(--ink)', margin: '16px 0 0' }}>
              How we support
              <br />
              <span>your project.</span>
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 36,
            }}
          >
            {pillars.map((p) => (
              <div
                key={p.number}
                data-reveal
                style={{
                  background: 'white',
                  padding: '32px 28px',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    color: 'var(--brand)',
                    fontWeight: 500,
                    marginBottom: 16,
                  }}
                >
                  {p.number}
                </span>
                <h3
                  style={{
                    fontSize: 19,
                    letterSpacing: '-0.02em',
                    marginBottom: 12,
                    color: 'var(--ink)',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--muted)' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Indigenous Ownership Focus */}
      <section className="community">
        <div className="wrap">
          <span className="eyebrow">Ownership & Social Responsibility</span>
          <h2>
            Australian.
            <br />
            Indigenous-owned.
            <br />
            <span>Looking forward.</span>
          </h2>
          <div className="three-columns">
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 12, color: 'var(--brand)' }}>
                Indigenous Participation
              </h3>
              <p>
                Indigenous ownership is at the heart of our company identity. We actively
                promote Aboriginal employment, apprentice pathways, and collaborative
                opportunities across the steel and construction trades.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 12, color: 'var(--brand)' }}>
                Community Connections
              </h3>
              <p>
                We believe prosperity should be shared. Global Steel supports local sporting
                clubs, educational initiatives, and regional community events that create
                lasting social impact.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 12, color: 'var(--brand)' }}>
                Supply Reliability
              </h3>
              <p>
                Builders choose us because we combine meaningful social values with
                dependable, on-spec delivery. We provide the materials you need to keep
                cranes moving and concrete pouring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <QuoteBanner />
    </>
  );
}
