import { ArrowUpRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StockBadge from '../components/StockBadge';
import { formatINR, holdings } from '../data/marketData';
import { downloadCsv } from '../utils/downloadCsv';

export default function PortfolioPage() {
  const navigate = useNavigate();
  const totals = holdings.reduce((sum, item) => ({ investment: sum.investment + item.avg * item.qty, value: sum.value + item.ltp * item.qty }), { investment: 0, value: 0 });
  const profit = totals.value - totals.investment;
  return (
    <div className="page standard-page">
      <div className="page-heading"><div><p className="greeting">YOUR INVESTMENTS</p><h1>Portfolio</h1><p className="subcopy">A concise snapshot of your simulated long-term positions.</p></div><button className="secondary-button" type="button" onClick={() => downloadCsv('northstar-portfolio.csv', [['Instrument', 'Quantity', 'Average price', 'LTP'], ...holdings.map((item) => [item.symbol, item.qty, item.avg, item.ltp])])}><Download size={17} /> Download report</button></div>
      <section className="portfolio-hero card"><div><span className="eyebrow">CURRENT VALUE</span><strong>{formatINR(totals.value)}</strong><p><span className="positive"><ArrowUpRight size={15} /> {formatINR(profit)} ({((profit / totals.investment) * 100).toFixed(2)}%)</span> overall return</p></div><div className="portfolio-breakdown"><div><span>Invested</span><strong>{formatINR(totals.investment)}</strong></div><div><span>Today’s gain</span><strong className="positive">+₹12,840</strong></div><div><span>Holdings</span><strong>{holdings.length}</strong></div></div></section>
      <section className="holdings-card card"><div className="card-title-row"><div><span className="eyebrow">EQUITY</span><h2>Holdings <span className="count-badge">{holdings.length}</span></h2></div><span className="holding-label">All holdings</span></div><div className="holdings-table"><div className="holdings-head"><span>INSTRUMENT</span><span>QTY.</span><span>AVG. PRICE</span><span>LTP</span><span>INVESTMENT</span><span>CURRENT VALUE</span><span>P&amp;L</span></div>{holdings.map((item) => { const investment = item.qty * item.avg; const value = item.qty * item.ltp; return <button className="holding-row" type="button" onClick={() => navigate(`/stock/${item.symbol}`)} key={item.symbol}><span className="instrument"><StockBadge symbol={item.symbol} color={item.color} /><span><strong>{item.symbol}</strong><small>{item.name}</small></span></span><span>{item.qty}</span><span>₹{item.avg.toLocaleString('en-IN')}</span><span>₹{item.ltp.toLocaleString('en-IN')}</span><span>{formatINR(investment)}</span><span>{formatINR(value)}</span><span className="positive"><strong>+{formatINR(value - investment)}</strong><small>+{item.change}%</small></span></button>; })}</div></section>
    </div>
  );
}
