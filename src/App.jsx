import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { TipsTicker, StatsBar, BackToTop } from './components/Widgets';
import Home from './pages/Home';
import BudgetingBasics from './pages/BudgetingBasics';
import NeedsWants from './pages/NeedsWants';
import FiftyThirtyTwenty from './pages/FiftyThirtyTwenty';
import SavingsGoals from './pages/SavingsGoals';
import ExpensePlanner from './pages/ExpensePlanner';
import MoneyMistakes from './pages/MoneyMistakes';
import Infographics from './pages/Infographics';
import Chatbot from './pages/Chatbot';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import { SearchX } from 'lucide-react';

const searchIndex = [
  { keywords: ['saving', 'savings', 'goal'], page: 'savings' },
  { keywords: ['need', 'want', 'needs', 'wants'], page: 'needs-wants' },
  { keywords: ['expense', 'planner', 'track'], page: 'planner' },
  { keywords: ['50-30-20', '50', '30', '20', 'rule', 'split'], page: 'rule' },
  { keywords: ['mistake', 'mistakes', 'impulse', 'subscription'], page: 'mistakes' },
  { keywords: ['infographic', 'visual', 'gallery'], page: 'infographics' },
  { keywords: ['chatbot', 'chat', 'ai', 'ask'], page: 'chatbot' },
  { keywords: ['budget', 'basics', 'income', 'fixed', 'variable'], page: 'basics' },
  { keywords: ['contact'], page: 'contact' },
  { keywords: ['feedback'], page: 'feedback' },
  { keywords: ['about'], page: 'about' },
];

const pageComponents = {
  home: Home,
  basics: BudgetingBasics,
  'needs-wants': NeedsWants,
  rule: FiftyThirtyTwenty,
  savings: SavingsGoals,
  planner: ExpensePlanner,
  mistakes: MoneyMistakes,
  infographics: Infographics,
  chatbot: Chatbot,
  about: About,
  feedback: Feedback,
  contact: Contact,
  sitemap: Sitemap,
};

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('bb-theme') || 'light'; } catch { return 'light'; }
  });
  const [searchMiss, setSearchMiss] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('bb-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    const match = searchIndex.find(entry => entry.keywords.some(k => q.includes(k)));
    if (match) {
      setSearchMiss(null);
      setPage(match.page);
    } else {
      setSearchMiss(query);
    }
  };

  const goto = (id) => { setSearchMiss(null); setPage(id); };
  const Page = pageComponents[page] || Home;

  return (
    <div>
      <a href="#main" className="sr-only">Skip to main content</a>
      <Nav page={page} setPage={goto} theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} onSearch={handleSearch} />
      <TipsTicker />
      <StatsBar />
      <main id="main">
        {searchMiss ? (
          <section className="section">
            <div className="container" style={{ textAlign: 'center' }}>
              <SearchX size={32} color="var(--text-muted)" />
              <h2 style={{ marginTop: 12 }}>No matching content found</h2>
              <p>We couldn't find anything for "{searchMiss}". Try: saving, needs, expenses, or goals.</p>
              <button className="btn btn-primary" onClick={() => setSearchMiss(null)}>Back to browsing</button>
            </div>
          </section>
        ) : (
          <Page setPage={goto} />
        )}
      </main>
      <Footer setPage={goto} />
      <BackToTop />
    </div>
  );
}
