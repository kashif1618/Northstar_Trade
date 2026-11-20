import { ArrowDownRight, ArrowLeft, ArrowUpRight, Bookmark, Info } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StockBadge from '../components/StockBadge';
import TradeModal from '../components/TradeModal';
import { formatINR, stocks } from '../data/marketData';

const curve = [2940, 2950, 2937, 2957, 2948, 2962, 2972, 2961, 2984, 2977, 2994, 2972, 2948].map((price, index) => ({ time: ['09:15', '09:45', '10:15', '10:45', '11:15', '11:45', '12:15', '12:45', '13:15', '13:45', '14:15', '14:45', '15:15'][index], price }));

export default function StockDetailPage() {
  const { symbol } = useParams();
  const [activeRange, setActiveRange] = useState('1D');
  const [side, setSide] = useState(null);
  const [saved, setSaved] = useState(false);
  const stock = useMemo(() => stocks.find((item) => item.symbol === symbol) || stocks[0], [symbol]);
  const positive = stock.change >= 0;
  const visibleCurve = useMemo(() => {
    const variation = { '1D': 1, '1W': 1.003, '1M': .997, '3M': 1.01, '6M': .982, '1Y': 1.045, '5Y': .88 }[activeRange];
    return curve.map((point, index) => ({ ...point, price: +(point.price * (variation + index * .0006)).toFixed(2) }));
  }, [activeRange]);
  return (
    <div className="page standard-page stock-page">
      <Link className="back-link" to="/market-watch"><ArrowLeft size={17} /> Back to market watch</Link>
      <section className="stock-hero"><div className="stock-identity"><StockBadge symbol={stock.symbol} color={stock.color} /><div><span className="eyebrow">NSE · EQUITY</span><h1>{stock.symbol}</h1><p>{stock.name}</p></div></div><div className="stock-price"><strong>₹{stock.price.toLocaleString('en-IN')}</strong><p className={positive ? 'positive' : 'negative'}>{positive ? <ArrowUpRight size={17} /> : <ArrowDownRight size={17} />}{positive ? '+' : ''}{stock.change}% <span>today</span></p></div><div className="stock-actions"><button type="button" className={`bookmark-button ${saved ? 'saved' : ''}`} onClick={() => setSaved((current) => !current)} aria-label={saved ? 'Remove from saved instruments' : 'Save instrument'}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /></button><button type="button" className="buy-button" onClick={() => setSide('buy')}>Buy</button><button type="button" className="sell-button" onClick={() => setSide('sell')}>Sell</button></div></section>
      <section className="stock-main-grid"><div className="card stock-chart-card"><div className="card-title-row"><div><span className="eyebrow">PRICE CHART · {activeRange}</span><h2>{stock.symbol} · NSE</h2></div><div className="range-tabs">{['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'].map((range) => <button key={range} type="button" className={activeRange === range ? 'selected' : ''} onClick={() => setActiveRange(range)}>{range}</button>)}</div></div><div className="stock-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={visibleCurve} margin={{ top: 18, right: 5, left: -26, bottom: 0 }}><defs><linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={positive ? '#20a876' : '#e55b57'} stopOpacity=".24" /><stop offset="100%" stopColor={positive ? '#20a876' : '#e55b57'} stopOpacity="0" /></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="3 3" /><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} /><YAxis domain={['dataMin - 8', 'dataMax + 8']} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} tickFormatter={(value) => `₹${value}`} /><Tooltip content={({ active, payload }) => active && payload?.length ? <div className="chart-tooltip"><span>{payload[0].payload.time}</span><strong>₹{payload[0].value}</strong></div> : null} /><Area type="monotone" dataKey="price" stroke={positive ? '#20a876' : '#e55b57'} strokeWidth={2.2} fill="url(#stockGradient)" /></AreaChart></ResponsiveContainer></div></div><div className="card stock-stats"><span className="eyebrow">DAY AT A GLANCE</span><div><span>Open</span><strong>₹{(stock.price * .994).toFixed(2)}</strong></div><div><span>Previous close</span><strong>₹{(stock.price / (1 + stock.change / 100)).toFixed(2)}</strong></div><div><span>Day high</span><strong>₹{stock.high}</strong></div><div><span>Day low</span><strong>₹{stock.low}</strong></div><div><span>52W high</span><strong>₹{(stock.high * 1.16).toFixed(2)}</strong></div><div><span>52W low</span><strong>₹{(stock.low * .72).toFixed(2)}</strong></div></div></section>
      <section className="stock-info-grid"><article className="card company-card"><span className="eyebrow">ABOUT THE COMPANY</span><h2>{stock.name}</h2><p>{stock.name} is included in this educational simulation to demonstrate how an instrument research page can pair market information with portfolio actions. Its displayed prices are simulated.</p><button type="button" className="text-button">View company fundamentals <Info size={16} /></button></article><article className="card position-card"><span className="eyebrow">YOUR POSITION</span><h2>48 shares</h2><div><span>Average price</span><strong>₹2,782.50</strong></div><div><span>Current value</span><strong>{formatINR(stock.price * 48)}</strong></div><div><span>Unrealised P&amp;L</span><strong className="positive">+₹7,954</strong></div></article></section>
      {side && <TradeModal stock={stock} side={side} onClose={() => setSide(null)} onComplete={() => {}} />}
    </div>
  );
}
