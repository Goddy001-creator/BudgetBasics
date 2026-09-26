import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';

export default function Splash({ onFinish, duration = 1400 }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), duration);
    const removeTimer = setTimeout(() => onFinish(), duration + 400);
    return () => { clearTimeout(hideTimer); clearTimeout(removeTimer); };
  }, [duration, onFinish]);

  return (
    <div
      role="status"
      aria-label="Loading BudgetBasics"
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 14, background: 'var(--bg)',
        opacity: hiding ? 0 : 1, visibility: hiding ? 'hidden' : 'visible',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 64, height: 64, borderRadius: 16, background: 'var(--teal)', color: 'white',
        animation: 'splash-logo-in 0.5s ease',
      }}><Wallet size={30} /></span>
      <p style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.3rem', color: 'var(--text)', margin: 0 }}>
        Budget<span style={{ color: 'var(--gold-dark)' }}>Basics</span>
      </p>
    </div>
  );
}