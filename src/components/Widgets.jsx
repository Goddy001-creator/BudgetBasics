import { useEffect, useState } from 'react';
import { ArrowUp, Users, Clock, Sparkles } from 'lucide-react';
import { quickTips } from '../data/content';

export function TipsTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % quickTips.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background: 'var(--teal-dark)', color: 'white', padding: '10px 0', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem' }}>
        <Sparkles size={15} style={{ flexShrink: 0, color: 'var(--gold)' }} />
        <span key={i} style={{ animation: 'fadeIn 0.4s ease' }}>{quickTips[i]}</span>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }`}</style>
    </div>
  );
}

export function StatsBar() {
  const [now, setNow] = useState(new Date());
  const [visitors] = useState(() => {
    const base = 1200 + Math.floor(Math.random() * 300);
    return base;
  });
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', padding: '14px 20px' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Users size={14} /> {visitors.toLocaleString()} learners so far
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Clock size={14} /> {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {now.toLocaleTimeString()}
      </span>
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
