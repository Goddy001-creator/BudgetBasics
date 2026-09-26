import { useEffect, useState } from 'react';
import { ArrowUp, Clock, Sparkles } from 'lucide-react';
import { quickTips } from '../data/content';

export function TipsTicker() {
  const [i, setI] = useState(0);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % quickTips.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'sticky', top: 68, zIndex: 40,
      background: 'var(--teal-dark)', color: 'white', padding: '10px 0',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontSize: '0.85rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1, overflow: 'hidden' }}>
          <Sparkles size={15} style={{ flexShrink: 0, color: 'var(--gold)' }} />
          <span key={i} style={{
            animation: 'fadeIn 0.4s ease', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{quickTips[i]}</span>
        </span>
        <span className="ticker-clock" style={{
          display: 'none', alignItems: 'center', gap: 6, background: 'transparent', flexShrink: 0,
        }}>
          <Clock size={14} />
          {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {now.toLocaleTimeString()}
        </span>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
        @media (min-width: 640px) { .ticker-clock { display: inline-flex !important; } }
      `}</style>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 40, width: 44, height: 44, borderRadius: '50%',
      background: 'var(--teal)', color: 'white', border: 'none', boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}><ArrowUp size={18} /></button>
  );
}
