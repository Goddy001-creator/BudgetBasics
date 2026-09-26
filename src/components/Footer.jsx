import { Wallet, Share2, Globe, Map } from 'lucide-react';
import { contactInfo } from '../data/content';

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: 'var(--dark)', color: '#CFE4E1', marginTop: 40 }}>
      <div className="container" style={{ padding: '48px 20px 24px', display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)' }}>
              <Wallet size={16} />
            </span>
            <strong style={{ color: 'white', fontFamily: 'Manrope' }}>BudgetBasics</strong>
          </div>
          <p style={{ color: '#9FBDB9', fontSize: '0.88rem' }}>An educational website helping students build budgeting fundamentals — NextGen BudgetBee.</p>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.9rem' }}>Explore</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            {['basics', 'needs-wants', 'rule', 'savings'].map(id => (
              <li key={id}><button onClick={() => setPage(id)} style={{ background: 'none', border: 'none', color: '#9FBDB9', fontSize: '0.88rem', padding: 0 }}>
                {id === 'basics' ? 'Budgeting Basics' : id === 'needs-wants' ? 'Needs vs Wants' : id === 'rule' ? '50-30-20 Rule' : 'Savings Goals'}
              </button></li>
            ))}
            <li><button onClick={() => setPage('sitemap')} style={{ background: 'none', border: 'none', color: '#9FBDB9', fontSize: '0.88rem', padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Map size={13} /> Sitemap
            </button></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.9rem' }}>Get Involved</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            <li><button onClick={() => setPage('about')} style={{ background: 'none', border: 'none', color: '#9FBDB9', fontSize: '0.88rem', padding: 0 }}>About Us</button></li>
            <li><button onClick={() => setPage('feedback')} style={{ background: 'none', border: 'none', color: '#9FBDB9', fontSize: '0.88rem', padding: 0 }}>Feedback</button></li>
            <li><button onClick={() => setPage('contact')} style={{ background: 'none', border: 'none', color: '#9FBDB9', fontSize: '0.88rem', padding: 0 }}>Contact Us</button></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '0.9rem' }}>Contact</h4>
          <p style={{ color: '#9FBDB9', fontSize: '0.85rem', marginBottom: 6 }}>{contactInfo.email}</p>
          <p style={{ color: '#9FBDB9', fontSize: '0.85rem', marginBottom: 12 }}>{contactInfo.phone}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href={contactInfo.socials[0].url} aria-label="Facebook" style={{ color: '#9FBDB9' }}><Share2 size={18} /></a>
            <a href={contactInfo.socials[1].url} aria-label="LinkedIn" style={{ color: '#9FBDB9' }}><Globe size={18} /></a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', padding: '16px 20px', fontSize: '0.78rem', color: '#7FA09B' }}>
        © {new Date().getFullYear()} BudgetBasics — Educational project. Not a banking or financial service.
      </div>
    </footer>
  );
}
