import { useState } from 'react';
import { CheckCircle2, Star, AlertCircle } from 'lucide-react';

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', rating: 0, comments: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.rating) errs.rating = 'Please select a rating.';
    if (!form.comments.trim()) errs.comments = 'Please add a comment.';
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) { setSent(false); return; }
    setSent(true);
    setForm({ name: '', email: '', rating: 0, comments: '' });
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="section-head" style={{ margin: '0 0 32px' }}>
          <span className="eyebrow">Feedback</span>
          <h2>Tell us what you think</h2>
          <p>This form validates in your browser only — nothing is submitted, stored, or transmitted.</p>
        </div>

        <div className="card">
          {sent && (
            <p style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--teal-dark)', background: 'var(--teal-light)', padding: '10px 14px', borderRadius: 10, fontSize: '0.88rem', marginBottom: 16 }}>
              <CheckCircle2 size={16} /> Thanks — your feedback looks good! (Not actually sent anywhere.)
            </p>
          )}
          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="fname">Name</label>
              <input id="fname" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="femail">Email</label>
              <input id="femail" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="field">
              <label>Rating</label>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button type="button" key={n} onClick={() => setForm(f => ({ ...f, rating: n }))} aria-label={`${n} star`}
                    style={{ background: 'none', border: 'none', color: n <= form.rating ? 'var(--gold)' : 'var(--border)' }}>
                    <Star size={22} fill={n <= form.rating ? 'var(--gold)' : 'none'} />
                  </button>
                ))}
              </div>
              {errors.rating && <p className="error-text" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={13} />{errors.rating}</p>}
            </div>
            <div className="field">
              <label htmlFor="fcomments">Comments</label>
              <textarea id="fcomments" rows={4} value={form.comments} onChange={e => setForm(f => ({ ...f, comments: e.target.value }))} />
              {errors.comments && <p className="error-text">{errors.comments}</p>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Submit Feedback</button>
          </form>
        </div>
      </div>
    </section>
  );
}
