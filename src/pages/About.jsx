import { aboutText } from '../data/content';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="section-head" style={{ margin: '0 0 32px' }}>
          <span className="eyebrow">About</span>
          <h2>About BudgetBasics</h2>
        </div>
        <div className="card" style={{ marginBottom: 20, display: 'flex', gap: 16 }}>
          <GraduationCap size={26} color="var(--teal)" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1rem' }}>Our Mission</h3>
            <p>{aboutText.mission}</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', gap: 16 }}>
          <ShieldCheck size={26} color="var(--teal)" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1rem' }}>How This Site Works</h3>
            <p>{aboutText.creators} Everything runs client-side in your browser — no data is transmitted or stored on a server, and no real financial accounts are involved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
