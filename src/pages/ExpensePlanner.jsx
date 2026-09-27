import { useState } from 'react';
import { Plus, Trash2, Pencil, Check, AlertCircle, Download } from 'lucide-react';
import { expenseCategories } from '../data/content';

const emptyForm = { date: '', category: expenseCategories[0], description: '', amount: '' };

const formatCurrency = (value) => new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
}).format(Number(value) || 0);

export default function ExpensePlanner() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const [downloadMessage, setDownloadMessage] = useState('');
  const [downloadState, setDownloadState] = useState('');

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

  const downloadPlan = () => {
    if (!entries.length) {
      setDownloadState('error');
      setDownloadMessage('Add at least one expense before downloading your plan.');
      return;
    }

    const generatedAt = new Date().toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const rows = entries.map((en, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${en.date || '—'}</td>
        <td>${en.category}</td>
        <td>${en.description}</td>
        <td>${formatCurrency(en.amount)}</td>
      </tr>
    `).join('');

    const startedBalance = !isNaN(sampleBalance) ? formatCurrency(sampleBalance) : 'Not provided';
    const remainingText = remaining === null ? 'Not provided' : `${formatCurrency(remaining)}${remaining < 0 ? ' (over budget)' : ''}`;

    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Expense Plan</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #202033;
            background: #f8f7ff;
            margin: 0;
            padding: 32px;
          }
          .container {
            max-width: 820px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e8e4f2;
            border-radius: 18px;
            box-shadow: 0 18px 40px rgba(108, 77, 230, 0.08);
            overflow: hidden;
          }
          .header {
            padding: 28px 32px 20px;
            background: linear-gradient(135deg, #6C4DE6, #8B72F2);
            color: #ffffff;
          }
          .header h1 {
            margin: 0 0 8px;
            font-size: 30px;
          }
          .header p {
            margin: 0;
            opacity: 0.9;
          }
          .content {
            padding: 24px 32px 32px;
          }
          .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }
          .summary-box {
            background: #f3f0ff;
            padding: 16px 18px;
            border-radius: 12px;
            border: 1px solid #e8e4f2;
          }
          .summary-box span {
            display: block;
            color: #6F6B7D;
            font-size: 12px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            margin-bottom: 6px;
          }
          .summary-box strong {
            font-size: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
          }
          th, td {
            border-bottom: 1px solid #e8e4f2;
            padding: 12px 10px;
            text-align: left;
            font-size: 14px;
          }
          th {
            color: #6F6B7D;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          .total-row {
            margin-top: 18px;
            font-size: 15px;
            font-weight: 700;
            color: #202033;
          }
          .footer-note {
            margin-top: 20px;
            color: #6F6B7D;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Expense Plan</h1>
            <p>Generated on ${generatedAt}</p>
          </div>
          <div class="content">
            <div class="summary">
              <div class="summary-box">
                <span>Total expenses</span>
                <strong>${formatCurrency(total)}</strong>
              </div>
              <div class="summary-box">
                <span>Starting balance</span>
                <strong>${startedBalance}</strong>
              </div>
              <div class="summary-box">
                <span>Remaining balance</span>
                <strong>${remainingText}</strong>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${rows || '<tr><td colspan="5">No expenses added yet.</td></tr>'}
              </tbody>
            </table>

            <div class="total-row">Total planned expenses: ${formatCurrency(total)}</div>
            <div class="footer-note">BudgetBasics Expense Planner — This document includes the user's actual plan information entered during the session.</div>
          </div>
        </div>
      </body>
      </html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense-plan-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setDownloadState('success');
    setDownloadMessage('Expense plan download started successfully.');
  };

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
                      <td style={{ textAlign: 'right' }}>{formatCurrency(en.amount)}</td>
                      <td style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => edit(en)} aria-label={`Edit ${en.description}`} style={{ background: 'none', border: 'none', color: 'var(--teal)' }}><Pencil size={15} /></button>
                        <button onClick={() => remove(en.id)} aria-label={`Remove ${en.description}`} style={{ background: 'none', border: 'none', color: 'var(--danger)' }}><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginTop: 18 }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Total planned expenses: <strong style={{ color: 'var(--text)' }}>{formatCurrency(total)}</strong></p>
              <button type="button" className="btn btn-primary" onClick={downloadPlan}>
                <Download size={16} /> Download Expense Plan
              </button>
            </div>

            {downloadMessage && (
              <p style={{
                marginTop: 12,
                marginBottom: 0,
                fontSize: '0.82rem',
                color: downloadState === 'error' ? 'var(--danger)' : 'var(--primary-dark)',
              }}>
                {downloadMessage}
              </p>
            )}
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
