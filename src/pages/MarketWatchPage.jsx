import { Plus, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StockBadge from '../components/StockBadge';
import { stocks } from '../data/marketData';
import usePersistentState from '../hooks/usePersistentState';

const savedDefault = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK'];

export default function MarketWatchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('search') || '');
  const [watchlist, setWatchlist] = usePersistentState('northstar-watchlist', savedDefault);
  const [pickerOpen, setPickerOpen] = useState(false);
  const visible = useMemo(() => stocks.filter((stock) => stock.name.toLowerCase().includes(query.toLowerCase()) || stock.symbol.toLowerCase().includes(query.toLowerCase())), [query]);
  const watchStocks = stocks.filter((stock) => watchlist.includes(stock.symbol));
  const toggleStock = (symbol) => {
    setWatchlist((current) => current.includes(symbol) ? current.filter((item) => item !== symbol) : [...current, symbol]);
  };
  return (
    <div className="page standard-page">
      <div className="page-heading"><div><p className="greeting">TRACK WHAT MATTERS</p><h1>Market watch</h1><p className="subcopy">A focused view of instruments you want to follow.</p></div><button className="primary-button" type="button" onClick={() => setPickerOpen(true)}><Plus size={18} /> Add instrument</button></div>
      <section className="watch-toolbar card">
        <div className="watch-tabs"><span className="selected">Main watchlist <b>{watchlist.length}</b></span></div>
        <div className="table-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this watchlist" /></div>
      </section>
      <section className="market-table card">
        <div className="market-table-head"><span>INSTRUMENT</span><span>LTP</span><span>CHANGE</span><span>DAY RANGE</span><span>VOLUME</span><span /></div>
        {watchStocks.filter((stock) => visible.includes(stock)).map((stock) => <div className="market-table-row" key={stock.symbol}><button className="stock-cell" type="button" onClick={() => navigate(`/stock/${stock.symbol}`)}><StockBadge symbol={stock.symbol} color={stock.color} /><span><strong>{stock.symbol}</strong><small>{stock.name} · NSE</small></span></button><strong>₹{stock.price.toLocaleString('en-IN')}</strong><span className={stock.change >= 0 ? 'positive' : 'negative'}>{stock.change >= 0 ? '+' : ''}{stock.change}%</span><span className="range-cell"><i style={{ left: `${Math.max(10, Math.min(90, ((stock.price - stock.low) / (stock.high - stock.low)) * 100))}%` }} /><small>₹{stock.low} — ₹{stock.high}</small></span><span>{stock.volume}</span><button type="button" onClick={() => toggleStock(stock.symbol)} className="row-action" aria-label={`Remove ${stock.symbol}`}><X size={17} /></button></div>)}
        {!watchStocks.filter((stock) => visible.includes(stock)).length && <div className="empty-state"><Search size={22} /><strong>No instruments found</strong><span>Try another search or add an instrument.</span></div>}
      </section>
      <p className="page-footnote">Market prices shown are simulated and delayed. They are not suitable for making real investment decisions.</p>
      {pickerOpen && <div className="modal-backdrop"><section className="picker-modal" role="dialog" aria-modal="true"><button className="modal-close" type="button" onClick={() => setPickerOpen(false)} aria-label="Close"><X size={20} /></button><h2>Add to watchlist</h2><p>Choose an instrument to track in your main list.</p><div className="table-search"><Search size={17} /><input autoFocus placeholder="Search instruments" value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="picker-stocks">{visible.map((stock) => <button type="button" key={stock.symbol} onClick={() => toggleStock(stock.symbol)}><StockBadge symbol={stock.symbol} color={stock.color} /><span><strong>{stock.symbol}</strong><small>{stock.name}</small></span>{watchlist.includes(stock.symbol) ? <span className="added-tag">Added</span> : <Plus size={18} />}</button>)}</div></section></div>}
    </div>
  );
}
