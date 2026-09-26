import { useState } from 'react';
import { ChevronDown, TriangleAlert, CircleCheck } from 'lucide-react';
import { moneyMistakes } from '../data/content';

export default function MoneyMistakes() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Module 6</span>
          <h2>Common Money Mistakes</h2>
          <p>Recognize these patterns before they become habits.</p>
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto', display: 'grid', gap: 12 }}>
          {moneyMistakes.map((m, idx) => {
            const open = openIdx === idx;
            return (
              <div key={m.title} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <button onClick={() => setOpenIdx(open ? -1 : idx)} aria-expanded={open}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'none', border: 'none', padding: '18px 20px', textAlign: 'left',
                  }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, color: 'var(--text)' }}>
                    <TriangleAlert size={17} color="var(--gold-dark)" /> {m.title}
                  </span>
                  <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {open && (
                  <div style={{ padding: '0 20px 20px' }}>
                    <p style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--text)' }}>Scenario: </strong>{m.scenario}</p>
                    <p style={{ fontSize: '0.9rem', display: 'flex', gap: 8, alignItems: 'flex-start', color: 'var(--teal-dark)' }}>
                      <CircleCheck size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span><strong>Fix: </strong>{m.fix}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
