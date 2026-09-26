import { useState } from 'react';
import { needsWantsItems } from '../data/content';
import { CheckCircle2, XCircle, Hourglass } from 'lucide-react';

export default function NeedsWants() {
  const [answers, setAnswers] = useState({});

  const choose = (idx, choice) => {
    setAnswers(a => ({ ...a, [idx]: choice }));
  };

  const correctCount = Object.entries(answers).filter(([idx, choice]) => choice === needsWantsItems[idx].type).length;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Module 2</span>
          <h2>Needs vs Wants</h2>
          <p>Classify each item below, then check your answer. Score: {correctCount} / {Object.keys(answers).length || 0}</p>
        </div>

        <div className="grid grid-2" style={{ marginBottom: 48 }}>
          {needsWantsItems.map((it, idx) => {
            const answered = answers[idx];
            const isCorrect = answered === it.type;
            return (
              <div key={it.item} className="card">
                <p style={{ color: 'var(--text)', fontWeight: 600, marginBottom: 12 }}>{it.item}</p>
                <div style={{ display: 'flex', gap: 8, marginBottom: answered ? 10 : 0 }}>
                  <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => choose(idx, 'need')}>Need</button>
                  <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => choose(idx, 'want')}>Want</button>
                </div>
                {answered && (
                  <p style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6, color: isCorrect ? 'var(--teal)' : 'var(--danger)' }}>
                    {isCorrect ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                    {isCorrect ? `Correct — that's a ${it.type}.` : `Not quite — this is actually a ${it.type}.`}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="card" style={{ maxWidth: 640, margin: '0 auto', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <Hourglass size={22} color="var(--gold-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontSize: '1rem' }}>The 48-Hour Rule</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Before buying anything that isn't a need, wait 48 hours. If you still want it after the wait — and it
              fits your budget — it's a more considered purchase, not an impulse one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
