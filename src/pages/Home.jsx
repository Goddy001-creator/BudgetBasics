import { ArrowRight, Wallet, PiggyBank, Target, ShieldCheck, MessageCircle } from 'lucide-react';

const features = [
  { icon: PiggyBank, title: 'Budgeting Basics', desc: 'Learn income, expenses, needs, wants, and savings through simple guides.', page: 'basics' },
  { icon: Target, title: 'Savings Goals', desc: 'Set a goal and see exactly how many months it takes to reach it.', page: 'savings' },
  { icon: ShieldCheck, title: 'Avoid Money Mistakes', desc: 'Spot common student spending traps before they happen.', page: 'mistakes' },
  { icon: MessageCircle, title: 'Ask the AI Chatbot', desc: 'Get instant answers to basic budgeting questions, any time.', page: 'chatbot' },
];

export default function Home({ setPage }) {
  return (
    <>
      <section className="section" style={{ paddingTop: 40, paddingBottom: 56 }}>
        <div className="container" style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
            background: 'var(--teal-light)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '16px 20px',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(135deg, #6C4DE6, #8B72F2)', color: '#ffffff', flexShrink: 0,
              boxShadow: '0 8px 20px rgba(108, 77, 230, 0.35)',
            }}><Wallet size={22} /></span>
            <div>
              <p style={{ fontWeight: 800, fontFamily: 'Manrope', fontSize: '1.05rem', color: 'var(--text)', margin: 0 }}>
                Welcome to Budget<span style={{ color: 'var(--gold-dark)' }}>Basics</span>
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                Smart budgeting, made simple for students.
              </p>
            </div>
          </div>
        </div>
        <div className="container hero-grid">
          <div>
            <span className="tag tag-want" style={{ marginBottom: 16, display: 'inline-block' }}>NextGen BudgetBee · Web Innovation Unleashed</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Learn to budget like it actually matters — because it does.
            </h1>
            <p style={{ fontSize: '1.05rem', maxWidth: 480 }}>
              BudgetBasics teaches students the fundamentals of personal budgeting through clear guides, interactive
              calculators, and an AI chatbot — no banking, no forms, just financial confidence.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => setPage('basics')}>Start Learning <ArrowRight size={16} /></button>
              <button className="btn btn-outline" onClick={() => setPage('rule')}>Try the 50-30-20 Calculator</button>
            </div>
          </div>
          <div className="card" style={{ background: 'var(--teal)', color: 'white', border: 'none' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', marginBottom: 4 }}>Sample student split</p>
            <h3 style={{ color: 'white', marginBottom: 16 }}>₦150,000 monthly income</h3>
            {[
              ['Needs', 50, '#ffffff', '#ffffff'],
              ['Wants', 30, '#E85AC8', '#ffffff'],
              ['Savings', 20, '#8FE3C7', '#1F1A38']
            ].map(([label, pct, color, textColor]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 4, color: '#ffffff' }}>
                  <span>{label}</span><span>{pct}%</span>
                </div>
                <div style={{ height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.2)' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: color, color: textColor }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What you'll find here</span>
            <h2>Everything a student needs to start budgeting</h2>
          </div>
          <div className="grid grid-4">
            {features.map(f => (
              <button key={f.title} onClick={() => setPage(f.page)} className="card card-link" style={{ textAlign: 'left', border: 'none', display: 'block' }}>
                <f.icon size={22} color="var(--teal)" />
                <h3 style={{ fontSize: '1rem', marginTop: 12 }}>{f.title}</h3>
                <p style={{ fontSize: '0.88rem' }}>{f.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
