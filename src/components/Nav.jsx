import { useEffect, useRef, useState } from 'react';
import { Wallet, Menu, X, Moon, Sun, Search, ChevronDown } from 'lucide-react';
import { navLinks, navGroups } from '../data/content';

export default function Nav({ page, setPage, theme, toggleTheme, onSearch }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [query, setQuery] = useState('');
  const groupsRef = useRef(null);

  const go = (id) => { setPage(id); setOpen(false); setOpenGroup(null); };

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  useEffect(() => {
    const onClickAway = (e) => {
      if (groupsRef.current && !groupsRef.current.contains(e.target)) setOpenGroup(null);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpenGroup(null); };
    document.addEventListener('mousedown', onClickAway);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickAway);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--surface)', borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, gap: 12 }}>
        <button onClick={() => go('home')} aria-label="BudgetBasics home" style={{
          display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', padding: 0, flexShrink: 0,
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 10, background: 'var(--teal)', color: 'white', flexShrink: 0,
          }}><Wallet size={18} /></span>
          <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', whiteSpace: 'nowrap' }}>
            Budget<span style={{ color: 'var(--gold-dark)' }}>Basics</span>
          </span>
        </button>

        <nav aria-label="Primary" ref={groupsRef} style={{ display: 'none', gap: 6 }} className="nav-desktop">
          {navGroups.map(group => {
            const isActive = group.items.some(i => i.id === page);
            const isOpen = openGroup === group.id;
            return (
              <div key={group.id} style={{ position: 'relative' }}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroup(g => (g === group.id ? null : group.id))}
                  className="nav-group-btn"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: isOpen ? 'var(--teal-light)' : 'none', border: 'none',
                    padding: '8px 10px', borderRadius: 8, fontSize: '0.88rem',
                    fontWeight: 600, color: isActive ? 'var(--teal)' : 'var(--text-muted)',
                    whiteSpace: 'nowrap', transition: 'background 0.15s ease, color 0.15s ease',
                  }}>
                  {group.label}
                  <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
                </button>
                {isOpen && (
                  <div role="menu" style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: 6,
                    background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
                    boxShadow: 'var(--shadow)', padding: 6, minWidth: 200, zIndex: 60,
                  }}>
                    {group.items.map(item => (
                      <button key={item.id} role="menuitem" onClick={() => go(item.id)} className="nav-menu-item" style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        background: page === item.id ? 'var(--teal-light)' : 'none',
                        border: 'none', padding: '9px 10px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600,
                        color: page === item.id ? 'var(--teal-dark)' : 'var(--text)',
                        transition: 'background 0.15s ease, color 0.15s ease',
                      }}>{item.label}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <form onSubmit={submitSearch} role="search" style={{ display: 'none' }} className="nav-search">
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 10, top: 9, color: 'var(--text-muted)' }} />
              <input aria-label="Search learning content" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search topics..." style={{ paddingLeft: 32, width: 160, fontSize: '0.85rem', padding: '8px 10px 8px 32px' }} />
            </div>
          </form>
          <button onClick={toggleTheme} aria-label="Toggle dark mode" style={{
            background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, width: 38, height: 38,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', flexShrink: 0,
          }}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open} style={{
            background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, width: 38, height: 38,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', flexShrink: 0,
          }} className="nav-burger">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: 16 }}>
          <form onSubmit={submitSearch} role="search" style={{ marginBottom: 12 }}>
            <input aria-label="Search learning content" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search topics (e.g. saving, needs, goals)..." />
          </form>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                textAlign: 'left', background: page === l.id ? 'var(--teal-light)' : 'none', border: 'none',
                padding: '10px 12px', borderRadius: 8, fontWeight: 600,
                color: page === l.id ? 'var(--teal-dark)' : 'var(--text)',
              }}>{l.label}</button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .nav-group-btn:hover { background: var(--teal-light) !important; color: var(--teal) !important; }
        .nav-menu-item:hover { background: var(--teal-light) !important; color: var(--teal-dark) !important; }
        @media (min-width: 860px) {
          .nav-desktop { display: flex !important; }
          .nav-search { display: block !important; }
          .nav-burger { display: none !important; }
        }
      `}</style>
    </header>
  );
}