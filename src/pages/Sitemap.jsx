import { navLinks } from '../data/content';

export default function Sitemap({ setPage }) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="section-head" style={{ margin: '0 0 32px' }}>
          <span className="eyebrow">Sitemap</span>
          <h2>All Sections</h2>
        </div>
        <div className="card">
          <ol style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 10 }}>
            {navLinks.map(l => (
              <li key={l.id}>
                <button onClick={() => setPage(l.id)} style={{ background: 'none', border: 'none', color: 'var(--teal)', fontWeight: 600, fontSize: '0.95rem', padding: 0 }}>
                  {l.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
