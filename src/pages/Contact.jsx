import { useState } from 'react';
import { Mail, Phone, Share2, Globe, CheckCircle2 } from 'lucide-react';
import { contactInfo } from '../data/content';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.message.trim()) errs.message = 'Message cannot be empty.';
    setErrors(errs);
    if (Object.keys(errs).length) { setSent(false); return; }
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="section-head" style={{ margin: '0 0 32px' }}>
          <span className="eyebrow">Contact</span>
          <h2>Contact Us</h2>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3 style={{ fontSize: '1rem' }}>Reach Out</h3>
            <p style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.9rem' }}><Mail size={15} /> {contactInfo.email}</p>
            <p style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.9rem' }}><Phone size={15} /> {contactInfo.phone}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <a href={contactInfo.socials[0].url} aria-label="Facebook" style={{ color: 'var(--teal)' }}><Share2 size={20} /></a>
              <a href={contactInfo.socials[1].url} aria-label="LinkedIn" style={{ color: 'var(--teal)' }}><Globe size={20} /></a>
            </div>
          </div>

          <div className="card">
            {sent && (
              <p style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--teal-dark)', background: 'var(--teal-light)', padding: '10px 14px', borderRadius: 10, fontSize: '0.85rem', marginBottom: 14 }}>
                <CheckCircle2 size={15} /> Message validated — not actually sent (no backend in this demo).
              </p>
            )}
            <form onSubmit={submit}>
              <div className="field">
                <label htmlFor="cname">Name</label>
                <input id="cname" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div className="field">
                <label htmlFor="cemail">Email</label>
                <input id="cemail" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div className="field">
                <label htmlFor="cmsg">Message</label>
                <textarea id="cmsg" rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                {errors.message && <p className="error-text">{errors.message}</p>}
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
