import { ArrowDownRight, ArrowUpRight, ChevronRight, Eye, MoreHorizontal, Plus, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import Sparkline from '../components/Sparkline';
import StockBadge from '../components/StockBadge';
import { chartData, formatINR, gainers, holdings, indices, losers, sparkData, stocks } from '../data/marketData';

function PortfolioChart() {
  return (
    <div className="portfolio-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 15, right: 3, left: -23, bottom: 0 }}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#21a975" stopOpacity=".23" />
              <stop offset="100%" stopColor="#21a975" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} dy={7} />
          <YAxis domain={['dataMin - 2500', 'dataMax + 2500']} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--line)', strokeDasharray: '3 3' }} />
          <Area type="monotone" dataKey="price" stroke="#20a876" strokeWidth={2.25} fill="url(#portfolioGradient)" activeDot={{ r: 4, strokeWidth: 3, fill: '#fff', stroke: '#20a876' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return <div className="chart-tooltip"><span>{payload[0].payload.time}</span><strong>{formatINR(payload[0].value)}</strong></div>;
}

function MarketMover({ title, items, loss = false }) {
  return (
    <section className="mover-card card">
      <div className="card-title-row"><div><span className="eyebrow">{loss ? 'DOWNWARD MOMENTUM' : 'UPWARD MOMENTUM'}</span><h2>{title}</h2></div><button type="button" className="more-button"><MoreHorizontal size={20} /></button></div>
      <div className="mover-list">
        {items.map((item, index) => (
          <Link className="mover-row" to={`/stock/${item.symbol}`} key={item.symbol}>
            <span className={`mover-rank ${index === 0 ? 'gold' : ''}`}>{index + 1}</span>
            <StockBadge symbol={item.symbol} color={stocks.find((stock) => stock.symbol === item.symbol)?.color} />
            <span className="mover-name"><strong>{item.symbol}</strong><small>{item.name}</small></span>
            <span className="mover-price"><strong>{item.price}</strong><em className={loss ? 'negative' : 'positive'}>{item.change}</em></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const watchlist = stocks.slice(0, 5);
  return (
    <div className="page dashboard-page">
      <div className="page-heading">
        <div><p className="greeting">Tuesday, 4 November</p><h1>Good morning, Kashif <span>✦</span></h1><p className="subcopy">Here’s how your portfolio is performing today.</p></div>
        <button className="primary-button" type="button" onClick={() => navigate('/market-watch')}><Plus size={18} /> Add instrument</button>
      </div>

      <section className="stats-grid">
        <article className="metric-card card">
          <div className="metric-top"><span>PORTFOLIO VALUE</span><span className="metric-icon portfolio-icon"><TrendingUp size={17} /></span></div>
          <strong className="metric-value">₹9,46,240</strong>
          <p><b className="positive"><ArrowUpRight size={14} /> 4.62%</b><span> vs. ₹9,04,460 invested</span></p>
        </article>
        <article className="metric-card card">
          <div className="metric-top"><span>DAY’S P&amp;L</span><span className="metric-icon gain-icon"><ArrowUpRight size={17} /></span></div>
          <strong className="metric-value positive">+₹12,840</strong>
          <p><b className="positive"><ArrowUpRight size={14} /> 1.38%</b><span> since yesterday</span></p>
        </article>
        <article className="metric-card card">
          <div className="metric-top"><span>AVAILABLE TO TRADE</span><span className="metric-icon cash-icon">₹</span></div>
          <strong className="metric-value">₹1,53,760</strong>
          <p><span>of ₹2,00,000 virtual funds</span></p>
          <div className="balance-progress"><i /></div>
        </article>
      </section>

      <section className="card chart-card">
        <div className="card-title-row">
          <div><span className="eyebrow">YOUR PORTFOLIO</span><h2>Value over time</h2></div>
          <div className="chart-controls"><div className="range-tabs"><button type="button">1D</button><button type="button">1W</button><button type="button" className="selected">1M</button><button type="button">1Y</button><button type="button">ALL</button></div><button className="text-button" type="button" onClick={() => navigate('/portfolio')}>View portfolio <ChevronRight size={16} /></button></div>
        </div>
        <div className="chart-summary"><strong>₹9,46,240</strong><span className="positive"><ArrowUpRight size={15} /> ₹41,780 (4.62%)</span></div>
        <PortfolioChart />
      </section>

      <section className="market-section">
        <div className="section-heading"><div><span className="eyebrow">MARKET PULSE</span><h2>Indices overview</h2></div><Link to="/market-watch" className="text-button">View markets <ChevronRight size={16} /></Link></div>
        <div className="indices-grid">
          {indices.map((index, position) => <article className="index-card card" key={index.name}><div><span>{index.name}</span><strong>{index.value}</strong><p className={index.positive ? 'positive' : 'negative'}>{index.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{index.points} ({index.change})</p></div><Sparkline data={sparkData[position]} positive={index.positive} /></article>)}
        </div>
      </section>

      <section className="dashboard-lower">
        <div className="card watchlist-card">
          <div className="card-title-row"><div><span className="eyebrow">YOUR LIST</span><h2>Watchlist <span className="count-badge">{watchlist.length}</span></h2></div><Link to="/market-watch" className="text-button">Open watchlist <ChevronRight size={16} /></Link></div>
          <div className="watchlist-table">
            <div className="watch-head"><span>INSTRUMENT</span><span>LTP</span><span>CHANGE</span><span /></div>
            {watchlist.map((stock) => <button className="watch-row" type="button" onClick={() => navigate(`/stock/${stock.symbol}`)} key={stock.symbol}><span className="instrument"><StockBadge symbol={stock.symbol} color={stock.color} /><span><strong>{stock.symbol}</strong><small>NSE</small></span></span><strong>₹{stock.price.toLocaleString('en-IN')}</strong><em className={stock.change >= 0 ? 'positive' : 'negative'}>{stock.change >= 0 ? '+' : ''}{stock.change}%</em><ChevronRight size={17} /></button>)}
          </div>
        </div>
        <div className="card activity-card">
          <div className="card-title-row"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Today’s orders</h2></div><Link to="/orders" className="text-button">View all <ChevronRight size={16} /></Link></div>
          <div className="activity-list">
            <div className="activity-row"><span className="activity-dot buy">B</span><div><strong>Bought 10 INFY</strong><small>Today, 11:34 AM · Executed</small></div><span className="positive">+₹18,759</span></div>
            <div className="activity-row"><span className="activity-dot sell">S</span><div><strong>Sold 5 ITC</strong><small>Today, 10:02 AM · Executed</small></div><span>₹2,466</span></div>
            <div className="activity-row"><span className="activity-dot add"><Plus size={14} /></span><div><strong>Added virtual funds</strong><small>Yesterday, 4:20 PM</small></div><span>₹50,000</span></div>
          </div>
        </div>
      </section>

      <section className="movers-grid"><MarketMover title="Top gainers" items={gainers} /><MarketMover title="Top losers" items={losers} loss /></section>
      <div className="simulation-banner"><Eye size={17} /><span><strong>Simulation environment.</strong> Prices and account values are for educational demonstration only.</span></div>
    </div>
  );
}
