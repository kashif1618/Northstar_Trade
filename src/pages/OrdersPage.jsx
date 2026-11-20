import { ChevronDown, Download } from 'lucide-react';
import { useState } from 'react';
import StockBadge from '../components/StockBadge';
import { stocks } from '../data/marketData';
import { downloadCsv } from '../utils/downloadCsv';

const orderData = [
  { symbol: 'INFY', type: 'BUY', quantity: 10, price: '₹1,875.90', status: 'Executed', time: 'Today, 11:34 AM' },
  { symbol: 'ITC', type: 'SELL', quantity: 5, price: '₹493.40', status: 'Executed', time: 'Today, 10:02 AM' },
  { symbol: 'TATAMOTORS', type: 'BUY', quantity: 15, price: '₹1,020.00', status: 'Open', time: 'Today, 09:46 AM' },
  { symbol: 'RELIANCE', type: 'BUY', quantity: 8, price: '₹2,900.00', status: 'Cancelled', time: 'Yesterday, 3:05 PM' },
];

export default function OrdersPage() {
  const [tab, setTab] = useState('All orders');
  const filtered = orderData.filter((order) => tab === 'All orders' || order.status === tab.replace(' orders', '').replace('Open', 'Open').replace('Executed', 'Executed').replace('Cancelled', 'Cancelled'));
  return (
    <div className="page standard-page">
      <div className="page-heading"><div><p className="greeting">SIMULATED ACTIVITY</p><h1>Orders</h1><p className="subcopy">Review and manage virtual orders in one place.</p></div><button className="secondary-button" type="button" onClick={() => downloadCsv('northstar-orders.csv', [['Instrument', 'Type', 'Quantity', 'Price', 'Status', 'Placed at'], ...orderData.map((item) => [item.symbol, item.type, item.quantity, item.price, item.status, item.time])])}><Download size={17} /> Download statement</button></div>
      <section className="orders-toolbar card"><div className="order-tabs">{['All orders', 'Open orders', 'Executed orders', 'Cancelled orders'].map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={tab === item ? 'selected' : ''}>{item}</button>)}</div></section>
      <section className="orders-card card"><div className="orders-head"><span>INSTRUMENT</span><span>TYPE</span><span>QTY.</span><span>PRICE</span><span>STATUS</span><span>PLACED AT</span><span /></div>{filtered.map((order) => { const stock = stocks.find((item) => item.symbol === order.symbol); return <div className="order-row" key={`${order.symbol}-${order.time}`}><span className="instrument"><StockBadge symbol={order.symbol} color={stock.color} /><span><strong>{order.symbol}</strong><small>NSE · Market</small></span></span><span className={`order-type ${order.type.toLowerCase()}`}>{order.type}</span><span>{order.quantity}</span><span>{order.price}</span><span className={`status ${order.status.toLowerCase()}`}><i />{order.status}</span><span>{order.time}</span><button type="button" className="more-button"><ChevronDown size={17} /></button></div>; })}</section>
      <p className="page-footnote">Every order shown here is simulated. Orders do not reach an exchange.</p>
    </div>
  );
}
