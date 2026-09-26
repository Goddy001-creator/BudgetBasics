import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { chatbotFAQ, suggestedPrompts, chatbotFallback, chatbotDisclaimer } from '../data/content';

function getAnswer(question) {
  const q = question.toLowerCase();
  for (const entry of chatbotFAQ) {
    if (entry.keywords.some(k => q.includes(k))) return entry.answer;
  }
  return chatbotFallback;
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I can answer basic budgeting questions. Try one of the prompts below, or ask your own.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    const answer = getAnswer(q);
    setMessages(m => [...m, { role: 'user', text: q }, { role: 'bot', text: answer }]);
    setInput('');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Module 8</span>
          <h2>AI Chatbot Assistant</h2>
          <p>{chatbotDisclaimer}</p>
        </div>

        <div className="card" style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 480 }}>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 4 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: m.role === 'user' ? 'var(--gold)' : 'var(--teal)', color: m.role === 'user' ? 'var(--dark)' : 'white',
                }}>{m.role === 'user' ? <User size={14} /> : <Bot size={14} />}</span>
                <div style={{
                  background: m.role === 'user' ? 'var(--teal-light)' : 'var(--bg)', padding: '10px 14px', borderRadius: 12,
                  fontSize: '0.88rem', maxWidth: '80%', color: 'var(--text)',
                }}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '12px 0' }}>
            {suggestedPrompts.map(p => (
              <button key={p} onClick={() => send(p)} style={{
                fontSize: '0.78rem', padding: '6px 12px', borderRadius: 999,
                border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--teal-dark)',
              }}>{p}</button>
            ))}
          </div>

          <form onSubmit={e => { e.preventDefault(); send(); }} style={{ display: 'flex', gap: 8 }}>
            <label htmlFor="chatinput" className="sr-only">Ask a budgeting question</label>
            <input id="chatinput" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a budgeting question..." />
            <button type="submit" className="btn btn-primary" aria-label="Ask"><Send size={16} /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
