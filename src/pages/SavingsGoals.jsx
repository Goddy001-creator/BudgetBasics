import { useState } from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';

export default function SavingsGoals() {
  const [form, setForm] = useState({ name: '', target: '', current: '', monthly: '' });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const errs = {};
    const num = (v) => v.trim() !== '' && !isNaN(parseFloat(v)) && parseFloat(v) >= 0;
    if (!form.name.trim()) errs.name = 'Enter a goal name.';
    if (!num(form.target) || parseFloat(form.target) <= 0) errs.target = 'Enter a valid target amount.';
    if (!num(form.current)) errs.current = 'Enter a valid current savings amount (0 or more).';
    if (!num(form.monthly) || parseFloat(form.monthly) <= 0) errs.monthly = 'Enter a valid monthly contribution greater than 0.';
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) { setResult(null); return; }

    const target = parseFloat(form.target);
    const current = parseFloat(form.current);
    const monthly = parseFloat(form.monthly);
    const remaining = Math.max(target - current, 0);
    const months = remaining === 0 ? 0 : Math.ceil(remaining / monthly);
    const pct = Math.min((current / target) * 100, 100);
    setResult({ remaining, months, pct });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Module 4</span>
          <h2>Savings Goals</h2>
          <p>Plan a savings target and see how long it will realistically take.</p>
        </div>

        <div className="card" style={{ maxWidth: 560, margin: '0 auto' }}>
          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="gname">Goal name</label>
              <input id="gname" value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. New laptop" />
              {errors.name && <p className="error-text"><AlertCircle size={13} style={{ verticalAlign: -2 }} /> {errors.name}</p>}
            </div>
            <div className="grid grid-2">
              <div className="field">
                <label htmlFor="target">Target amount (₦)</label>
                <input id="target" type="number" min="0" value={form.target} onChange={e => update('target', e.target.value)} placeholder="e.g. 300000" />
                {errors.target && <p className="error-text">{errors.target}</p>}
              </div>
              <div className="field">
                <label htmlFor="current">Current savings (₦)</label>
                <input id="current" type="number" min="0" value={form.current} onChange={e => update('current', e.target.value)} placeholder="e.g. 50000" />
                {errors.current && <p className="error-text">{errors.current}</p>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="monthly">Expected monthly contribution (₦)</label>
              <input id="monthly" type="number" min="0" value={form.monthly} onChange={e => update('monthly', e.target.value)} placeholder="e.g. 20000" />
              {errors.monthly && <p className="error-text">{errors.monthly}</p>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Calculate Goal</button>
          </form>

          {result && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>Progress toward "{form.name}"</span>
                <span>{result.pct.toFixed(0)}%</span>
              </div>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${result.pct}%` }} /></div>
              <p style={{ marginTop: 14, fontSize: '0.9rem' }}>
                Remaining: <strong style={{ color: 'var(--text)' }}>₦{result.remaining.toLocaleString()}</strong> ·
                {' '}Estimated time: <strong style={{ color: 'var(--text)' }}>{result.months} month{result.months === 1 ? '' : 's'}</strong>
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 12, padding: 12, background: 'var(--teal-light)', borderRadius: 10 }}>
                <Sparkles size={16} color="var(--teal-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--teal-dark)' }}>
                  {result.months <= 3 ? 'Great pace — you\'re close! Stay consistent.' : 'Consider trimming one "want" category to reach your goal faster.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
