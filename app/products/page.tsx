import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, ProductRange, QuoteBanner } from '../ui';

export const metadata: Metadata = {
  title: 'ACRS Certified Steel Products | Global Steel Australia',
  description: 'Explore the full range of ACRS certified reinforcing steel products from Global Steel Australia: Deformed steel bar, reinforcing mesh sheets, trench mesh, and construction accessories.',
};

export default function Products() {
  const steelSpecs = [
    {
      category: 'Steel Bar & Dowels',
      grades: 'Grade 500N / 250N (AS/NZS 4671)',
      sizes: '10mm, 12mm, 16mm, 20mm, 24mm, 28mm, 32mm, 36mm',
      lengths: 'Standard 6m, 9m, 12m or cut & bent to project schedule',
      finish: 'Black deformed, Plain round, Galvanised dowels',
    },
    {
      category: 'Reinforcing Mesh',
      grades: 'Grade 500L / 500N Ribbed Wire',
      sizes: 'SL62, SL72, SL82, SL92 (Square) & RL Series (Rectangular)',
      lengths: 'Truck Sheets (6.0m × 2.4m), Ute Mesh (4.0m × 2.0m)',
      finish: 'Reinforcing fabric for slabs, precast panels and driveways',
    },
    {
      category: 'Trench Mesh',
      grades: 'Grade 500L Longitudinal Ribbed Wire',
      sizes: '3-Bar (200mm wide), 4-Bar (300mm wide), 5-Bar (400mm wide)',
      lengths: 'Standard 6.0m lengths; 8mm, 11mm, 12mm main wires',
      finish: 'Ideal for footings, grade beams, and edge beam thickening',
    },
    {
      category: 'Concrete Accessories',
      grades: 'Commercial Construction Grade',
      sizes: 'Plastic & Wire Chairs 25mm to 100mm, Wagon Wheels 20-50mm',
      lengths: 'Tie wire 1.57mm coils, Bitumen expansion rolls 10m/25m',
      finish: 'Bar caps, pod void formers, duct tape, hardwood pegs',
    },
  ];

  return (
    <>
      {/* Products Intro */}
      <section className="page-intro wrap">
        <span className="eyebrow">Products / The Global Steel Range</span>
        <h1>
          Strength, in
          <br />
          <span>every form.</span>
        </h1>
        <p>
          ACRS certified steel bar, reinforcing mesh, and essential construction
          accessories. Explore the core product ranges below, or submit your site schedule
          for a fast quote.
        </p>
      </section>

      {/* Main Product Cards Grid */}
      <ProductRange intro={false} />

      {/* Technical Specifications Overview */}
      <section style={{ background: 'var(--paper)', padding: '90px 0' }}>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: 40 }}>
            <span className="eyebrow">Technical Capabilities</span>
            <h2 style={{ color: 'var(--ink)', margin: '16px 0 12px' }}>
              Standard specifications & sizes.
            </h2>
            <p style={{ maxWidth: 640 }}>
              All reinforcement is supplied in accordance with relevant Australian
              standards (AS/NZS 4671 and AS 3600). Custom dimensions and scheduling
              available upon request.
            </p>
          </div>

          <div
            style={{
              overflowX: 'auto',
              background: 'white',
              border: '1px solid var(--line)',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'white' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 600 }}>Category</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600 }}>Steel Grade</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600 }}>Available Diameters / Profiles</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600 }}>Standard Formats</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600 }}>Applications</th>
                </tr>
              </thead>
              <tbody>
                {steelSpecs.map((spec, i) => (
                  <tr
                    key={spec.category}
                    style={{
                      borderBottom: '1px solid var(--line)',
                      background: i % 2 === 0 ? 'white' : 'rgba(234, 227, 219, 0.25)',
                    }}
                  >
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--ink)' }}>
                      {spec.category}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--muted)' }}>
                      {spec.grades}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--ink)' }}>
                      {spec.sizes}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--muted)' }}>
                      {spec.lengths}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--muted)' }}>
                      {spec.finish}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3-Step Practical Process */}
      <section className="simple-section wrap" data-reveal>
        <span className="eyebrow">A Considered Approach to Supply</span>
        <h2>Start with your requirements.</h2>
        <div className="three-columns">
          <div>
            <h3>01 / Select your range</h3>
            <p>
              Browse our product categories and identify the required bar diameters, mesh
              sheet types, or site accessories for your build.
            </p>
          </div>
          <div>
            <h3>02 / Share your specification</h3>
            <p>
              Send us your engineering drawings, bar schedules, quantities, delivery
              location, and preferred timeline.
            </p>
          </div>
          <div>
            <h3>03 / Discuss your quote</h3>
            <p>
              Our team verifies availability, confirms custom cut & bend requirements, and
              provides transparent pricing with delivery scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <QuoteBanner />
    </>
  );
}
