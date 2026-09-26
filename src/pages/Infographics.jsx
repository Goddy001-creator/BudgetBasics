import { useState } from 'react';
import { infographics } from '../data/content';

const topics = ['all', 'needs-wants', 'rule', 'cycle', 'savings'];

function NeedsWantsSVG() {
  return (
    <svg viewBox="0 0 200 120" role="img" aria-label="Needs versus wants split, roughly 60 to 40">
      <rect x="0" y="0" width="120" height="120" fill="var(--teal)" />
      <rect x="120" y="0" width="80" height="120" fill="var(--gold)" />
      <text x="60" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">NEEDS</text>
      <text x="160" y="65" textAnchor="middle" fill="var(--dark)" fontSize="14" fontWeight="700">WANTS</text>
    </svg>
  );
}
function RuleSVG() {
  return (
    <svg viewBox="0 0 200 120" role="img" aria-label="50-30-20 rule pie split">
      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="20" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--teal)" strokeWidth="20" strokeDasharray="157 314" transform="rotate(-90 60 60)" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--gold)" strokeWidth="20" strokeDasharray="94 314" strokeDashoffset="-157" transform="rotate(-90 60 60)" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--savings)" strokeWidth="20" strokeDasharray="63 314" strokeDashoffset="-251" transform="rotate(-90 60 60)" />
      <text x="140" y="35" fontSize="11" fill="var(--teal)">■ Needs 50%</text>
      <text x="140" y="60" fontSize="11" fill="var(--gold-dark)">■ Wants 30%</text>
      <text x="140" y="85" fontSize="11" fill="var(--savings)">■ Savings 20%</text>
    </svg>
  );
}
function CycleSVG() {
  const steps = ['Income', 'Categorize', 'Track', 'Review', 'Adjust'];
  return (
    <svg viewBox="0 0 200 120" role="img" aria-label="Monthly budget cycle: income, categorize, track, review, adjust">
      {steps.map((s, i) => {
        const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2;
        const x = 100 + 60 * Math.cos(angle);
        const y = 60 + 45 * Math.sin(angle);
        return (
          <g key={s}>
            <circle cx={x} cy={y} r="20" fill="var(--teal)" opacity={0.15 + i * 0.15} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--teal-dark)">{s}</text>
          </g>
        );
      })}
    </svg>
  );
}
function SavingsSVG() {
  const bars = [10, 18, 26, 34, 42];
  return (
    <svg viewBox="0 0 200 120" role="img" aria-label="30-day saving challenge ramp-up bar chart">
      {bars.map((h, i) => (
        <rect key={i} x={20 + i * 36} y={110 - h * 2} width="24" height={h * 2} rx="4" fill={i % 2 === 0 ? 'var(--teal)' : 'var(--gold)'} />
      ))}
      <line x1="10" y1="110" x2="190" y2="110" stroke="var(--border)" strokeWidth="2" />
    </svg>
  );
}
const svgMap = { 'needs-wants': NeedsWantsSVG, rule: RuleSVG, cycle: CycleSVG, savings: SavingsSVG };

export default function Infographics() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? infographics : infographics.filter(i => i.topic === filter);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Module 7</span>
          <h2>Infographics & Learning Gallery</h2>
          <p>Visual explainers you can reference at a glance.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {topics.map(t => (
            <button key={t} onClick={() => setFilter(t)} className="btn"
              style={{
                padding: '8px 18px', fontSize: '0.82rem',
                background: filter === t ? 'var(--teal)' : 'var(--surface)',
                color: filter === t ? 'white' : 'var(--text-muted)',
                border: '1px solid var(--border)',
              }}>{t === 'all' ? 'All' : t.replace('-', ' ')}</button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No matching infographics found for this filter.</p>
        ) : (
          <div className="grid grid-2">
            {visible.map(info => {
              const Svg = svgMap[info.topic];
              return (
                <div key={info.id} className="card">
                  <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 12, marginBottom: 12 }}>
                    {Svg && <Svg />}
                  </div>
                  <h3 style={{ fontSize: '0.95rem' }}>{info.title}</h3>
                  <p style={{ fontSize: '0.85rem' }}>{info.caption}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
