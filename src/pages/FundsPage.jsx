import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, Plus, Wallet } from 'lucide-react';
import { useState } from 'react';
import { formatINR } from '../data/marketData';

const activity = [
  { label: 'Virtual funds added', description: 'Today, 9:30 AM · UPI (simulated)', amount: '+₹50,000', kind: 'credit' },
  { label: 'Funds used for INFY', description: 'Today, 11:34 AM · Order executed', amount: '-₹18,759', kind: 'debit' },
  { label: 'Virtual funds added', description: '28 Oct, 2026 · Bank transfer (simulated)', amount: '+₹1,00,000', kind: 'credit' },
];

export default function FundsPage() {
  const [balance, setBalance] = useState(153760);
  const [modal, setModal] = useState(null);
  const [amount, setAmount] = useState(10000);
  const submit = (event) => { event.preventDefault(); setBalance((current) => modal === 'add' ? current + Number(amount) : Math.max(0, current - Number(amount))); setModal(null); };
  return (
    <div className="page standard-page">
      <div className="page-heading"><div><p className="greeting">SIMULATED WALLET</p><h1>Funds</h1><p className="subcopy">Manage virtual funds used to explore trading workflows.</p></div><div className="fund-actions"><button type="button" className="secondary-button" onClick={() => setModal('withdraw')}><ArrowUpRight size={17} /> Withdraw</button><button type="button" className="primary-button" onClick={() => setModal('add')}><Plus size={18} /> Add funds</button></div></div>
      <section className="funds-summary"><article className="fund-hero card"><span className="eyebrow">AVAILABLE VIRTUAL BALANCE</span><strong>{formatINR(balance)}</strong><p><CircleDollarSign size={16} /> This balance is only for simulated trading.</p><div className="fund-figures"><div><span>Used for trades</span><strong>₹46,240</strong></div><div><span>Total allocated</span><strong>{formatINR(balance + 46240)}</strong></div></div></article><article className="fund-side card"><div className="fund-side-row"><span className="fund-icon mint"><Wallet size={20} /></span><div><span>Funds available</span><strong>{formatINR(balance)}</strong></div></div><div className="fund-side-row"><span className="fund-icon blue"><ArrowUpRight size={20} /></span><div><span>Used margin</span><strong>₹0</strong></div></div><div className="fund-side-row"><span className="fund-icon yellow"><CircleDollarSign size={20} /></span><div><span>Collateral</span><strong>₹0</strong></div></div></article></section>
      <section className="card transaction-card"><div className="card-title-row"><div><span className="eyebrow">MONEY MOVEMENTS</span><h2>Transaction history</h2></div><button type="button" className="filter-button">Last 30 days</button></div><div className="transactions">{activity.map((item) => <div className="transaction-row" key={item.label + item.description}><span className={`transaction-icon ${item.kind}`}>{item.kind === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</span><div><strong>{item.label}</strong><small>{item.description}</small></div><strong className={item.kind === 'credit' ? 'positive' : ''}>{item.amount}</strong></div>)}</div></section>
      {modal && <div className="modal-backdrop"><form className="fund-modal" onSubmit={submit}><button type="button" className="modal-close" onClick={() => setModal(null)}>×</button><span className="eyebrow">{modal === 'add' ? 'ADD' : 'WITHDRAW'} VIRTUAL FUNDS</span><h2>{modal === 'add' ? 'Allocate practice capital' : 'Move unused virtual funds'}</h2><p>Changing this balance has no monetary effect.</p><label>Amount<input type="number" min="100" step="100" value={amount} onChange={(event) => setAmount(event.target.value)} /></label><button className="primary-button full-width" type="submit">Confirm {modal === 'add' ? 'allocation' : 'withdrawal'}</button></form></div>}
    </div>
  );
}
