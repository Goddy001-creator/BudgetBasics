import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function FiftyThirtyTwenty() {
  const [income, setIncome] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const val = parseFloat(income);
    if (income.trim() === '' || isNaN(val)) {
      setError('Please enter a valid number.');
      setResult(null);
      return;
    }
    if (val <= 0) {
      setError('Income must be greater than zero.');
      setResult(null);
      return;
    }
    setError('');
    setResult({
      needs: val * 0.5,
      wants: val * 0.3,
      savings: val * 0.2,
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Module 3</span>
          <h2>The 50-30-20 Rule</h2>
          <p>A widely-used educational guideline: 50% needs, 30% wants, 20% savings.</p>
        </div>

        <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
          <form onSubmit={calculate}>
            <div className="field">
              <label htmlFor="income">Sample monthly income (₦)</label>
              <input id="income" type="number" min="0" step="any" value={income}
                onChange={e => setIncome(e.target.value)} placeholder="e.g. 150000" />
              {error && <p className="error-text" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={14} />{error}</p>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Calculate Split</button>
          </form>

          {result && (
            <div style={{ marginTop: 24 }}>
              {[
                ['Needs (50%)', result.needs, 'var(--teal)'],
                ['Wants (30%)', result.wants, 'var(--gold)'],
                ['Savings (20%)', result.savings, 'var(--savings)'],
              ].map(([label, amt, color]) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{label}</span>
                    <span>₦{amt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${label.includes('Needs') ? 50 : label.includes('Wants') ? 30 : 20}%`, background: color }} /></div>
                </div>
              ))}
              <p style={{ fontSize: '0.8rem', marginTop: 8, fontStyle: 'italic' }}>
                This is an educational estimate for learning purposes only — adjust the split to fit your real situation.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
