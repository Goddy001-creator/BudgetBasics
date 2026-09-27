import { siteMapGroups } from '../data/content';

const ACCENTS = {
  teal: { bg: 'var(--accent-teal-bg)', border: 'var(--teal)', heading: 'var(--accent-teal-fg)' },
  gold: { bg: 'var(--accent-gold-bg)', border: 'var(--gold)', heading: 'var(--accent-gold-fg)' },
  neutral: { bg: 'var(--accent-neutral-bg)', border: 'var(--border)', heading: 'var(--accent-neutral-fg)' },
};

export default function Sitemap({ setPage }) {
  let count = 0;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="section-head" style={{ margin: '0 0 32px', textAlign: 'center' }}>
          <span className="eyebrow">Sitemap</span>
          <h2>Every page, at a glance</h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
          <div className="card" style={{ padding: '14px 32px', textAlign: 'center', background: 'var(--dark)', color: 'white', border: 'none' }}>
            <strong style={{ fontFamily: 'Manrope' }}>Home</strong>
          </div>
        </div>

        <svg className="sitemap-connector" viewBox="0 0 300 50" preserveAspectRatio="none" style={{ width: '100%', height: 50, display: 'none' }} aria-hidden="true">
          <g style={{ stroke: 'var(--text-muted)' }} strokeWidth="1.5" fill="none">
            <path d="M150,0 L150,18" />
            <path d="M50,18 L250,18" />
            <path d="M50,18 L50,40" />
            <path d="M150,18 L150,40" />
            <path d="M250,18 L250,40" />
          </g>
          <g style={{ fill: 'var(--text-muted)' }}>
            <polygon points="45,40 55,40 50,48" />
            <polygon points="145,40 155,40 150,48" />
            <polygon points="245,40 255,40 250,48" />
          </g>
        </svg>

        <div className="sitemap-groups">
          {siteMapGroups.map(group => {
            const a = ACCENTS[group.accent];
            return (
              <div key={group.id} className="card" style={{ background: a.bg, borderColor: a.border }}>
                <h3 style={{ fontSize: '1rem', color: a.heading, marginBottom: 14 }}>
                  {group.label} <span style={{ fontWeight: 500, opacity: 0.75 }}>({group.items.length})</span>
                </h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
                  {group.items.map(item => {
                    count += 1;
                    return (
                      <li key={item.id}>
                        <button onClick={() => setPage(item.id)} style={{
                          background: 'none', border: 'none', padding: 0, textAlign: 'left',
                          color: 'var(--text)', fontSize: '0.9rem', fontWeight: 600,
                        }}>
                          {count}. {item.label}
                        </button>
                        {item.note && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{item.note}</p>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .sitemap-groups { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 900px) {
          .sitemap-groups { grid-template-columns: repeat(3, 1fr); }
          .sitemap-connector { display: block !important; }
        }
      `}</style>
    </section>
  );
}