import { useState } from 'react';
import { Plus, Trash2, Pencil, Check, AlertCircle } from 'lucide-react';
import { expenseCategories } from '../data/content';

const emptyForm = { date: '', category: expenseCategories[0], description: '', amount: '' };

export default function ExpensePlanner() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!form.date || !form.description.trim() || form.amount === '' || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
      setError('Fill in date, description, and a valid amount greater than 0.');
      return;
    }
    setError('');
    if (editingId) {
      setEntries(es => es.map(en => en.id === editingId ? { ...form, id: editingId, amount: parseFloat(form.amount) } : en));
      setEditingId(null);
    } else {
      setEntries(es => [...es, { ...form, id: Date.now(), amount: parseFloat(form.amount) }]);
    }
    setForm(emptyForm);
  };

  const edit = (entry) => {
    setForm({ date: entry.date, category: entry.category, description: entry.description, amount: String(entry.amount) });
    setEditingId(entry.id);
  };

  const remove = (id) => {
    setEntries(es => es.filter(e => e.id !== id));
    if (editingId === id) { setEditingId(null); setForm(emptyForm); }
  };

  const total = entries.reduce((s, e) => s + e.amount, 0);
  const sampleBalance = parseFloat(balance);
  const remaining = !isNaN(sampleBalance) ? sampleBalance - total : null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Module 5</span>
          <h2>Expense Planner (Demo)</h2>
          <p>Add sample expenses for this session — nothing is saved after you leave the page.</p>
        </div>

        <div className="card" style={{ maxWidth: 720, margin: '0 auto 32px' }}>
          <form onSubmit={submit}>
            <div className="grid grid-2">
              <div className="field">
                <label htmlFor="edate">Date</label>
                <input id="edate" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div className="field">
                <label htmlFor="ecat">Category</label>
                <select id="ecat" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {expenseCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-2">
              <div className="field">
                <label htmlFor="edesc">Description</label>
                <input id="edesc" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Lunch with friends" />
              </div>
              <div className="field">
                <label htmlFor="eamt">Amount (₦)</label>
                <input id="eamt" type="number" min="0" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="e.g. 2500" />
              </div>
            </div>
            {error && <p className="error-text" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={14} />{error}</p>}
            <button type="submit" className="btn btn-primary">
              {editingId ? <><Check size={16} /> Update Entry</> : <><Plus size={16} /> Add Entry</>}
            </button>
          </form>
        </div>

        {entries.length > 0 && (
          <div className="card" style={{ marginBottom: 32 }}>
            <div className="scroll-x">
              <table>
                <thead><tr><th>Date</th><th>Category</th><th>Description</th><th style={{ textAlign: 'right' }}>Amount</th><th></th></tr></thead>
                <tbody>
                  {entries.map(en => (
                    <tr key={en.id}>
                      <td>{en.date}</td>
                      <td>{en.category}</td>
                      <td>{en.description}</td>
                      <td style={{ textAlign: 'right' }}>₦{en.amount.toLocaleString()}</td>
                      <td style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => edit(en)} aria-label={`Edit ${en.description}`} style={{ background: 'none', border: 'none', color: 'var(--teal)' }}><Pencil size={15} /></button>
                        <button onClick={() => remove(en.id)} aria-label={`Remove ${en.description}`} style={{ background: 'none', border: 'none', color: 'var(--danger)' }}><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: 12, fontSize: '0.9rem' }}>Total planned expenses: <strong style={{ color: 'var(--text)' }}>₦{total.toLocaleString()}</strong></p>
          </div>
        )}

        <div className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
          <label htmlFor="sbal">Sample starting balance (₦)</label>
          <input id="sbal" type="number" min="0" value={balance} onChange={e => setBalance(e.target.value)} placeholder="e.g. 100000" />
          {remaining !== null && (
            <p style={{ marginTop: 10, fontSize: '0.9rem' }}>
              Remaining sample balance: <strong style={{ color: remaining < 0 ? 'var(--danger)' : 'var(--text)' }}>₦{remaining.toLocaleString()}</strong>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
