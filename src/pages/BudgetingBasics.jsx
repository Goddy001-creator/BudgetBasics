import { useState } from 'react';
import { budgetingConcepts, sampleMonthlyBudget, knowledgeCheck } from '../data/content';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function BudgetingBasics() {
  const [selected, setSelected] = useState(null);
  const totalIncome = sampleMonthlyBudget.find(r => r.type === 'income')?.amount || 0;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Module 1</span>
          <h2>Budgeting Basics</h2>
          <p>The building blocks of any personal budget; understand these six terms first.</p>
        </div>

        <div className="grid grid-3" style={{ marginBottom: 48 }}>
          {budgetingConcepts.map(c => (
            <div key={c.id} className="card card-hover">
              <h3 style={{ fontSize: '1rem' }}>{c.title}</h3>
              <p style={{ fontSize: '0.9rem' }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 48 }}>
          <h3>Sample Student Monthly Budget</h3>
          <p style={{ fontSize: '0.85rem', marginBottom: 16 }}>Illustrative values in Naira (₦), for learning purposes only.</p>
          <div className="scroll-x">
            <table>
              <thead><tr><th>Category</th><th>Type</th><th style={{ textAlign: 'right' }}>Amount (₦)</th></tr></thead>
              <tbody>
                {sampleMonthlyBudget.map(row => (
                  <tr key={row.category}>
                    <td>{row.category}</td>
                    <td><span className={`tag tag-${row.type === 'income' ? 'savings' : row.type}`}>{row.type}</span></td>
                    <td style={{ textAlign: 'right' }}>{row.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.8rem', marginTop: 12 }}>Total income this month: <strong style={{ color: 'var(--text)' }}>₦{totalIncome.toLocaleString()}</strong></p>
        </div>

        <div className="card" style={{ maxWidth: 560, margin: '0 auto' }}>
          <h3 style={{ fontSize: '1rem' }}>Quick Knowledge Check</h3>
          <p style={{ fontSize: '0.9rem' }}>{knowledgeCheck.question}</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {knowledgeCheck.options.map((opt, idx) => (
              <button key={opt} onClick={() => setSelected(idx)} className="btn"
                style={{
                  justifyContent: 'flex-start', textAlign: 'left', border: '1.5px solid var(--border)',
                  background: selected === idx ? 'var(--teal-light)' : 'var(--surface)', color: 'var(--text)', fontWeight: 500,
                }}>
                {selected === idx && (idx === knowledgeCheck.answer ? <CheckCircle2 size={16} color="var(--teal)" /> : <XCircle size={16} color="var(--danger)" />)}
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <p style={{ fontSize: '0.85rem', marginTop: 12, color: selected === knowledgeCheck.answer ? 'var(--teal)' : 'var(--danger)' }}>
              {selected === knowledgeCheck.answer ? knowledgeCheck.feedback : 'Not quite — rent is the same amount each month, that\'s what makes it "fixed".'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
