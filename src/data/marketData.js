export const indices = [
  { name: 'NIFTY 50', value: '24,782.50', change: '+0.62%', positive: true, points: '+152.40' },
  { name: 'SENSEX', value: '80,412.19', change: '+0.49%', positive: true, points: '+392.12' },
  { name: 'NIFTY BANK', value: '53,914.75', change: '-0.18%', positive: false, points: '-96.20' },
];

export const stocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2948.2, change: 1.46, high: 2975.8, low: 2904.15, volume: '4.25M', color: '#4a78db' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4201.85, change: 0.82, high: 4224.7, low: 4160.1, volume: '1.72M', color: '#8762d6' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1768.45, change: -0.48, high: 1783.95, low: 1761.2, volume: '5.16M', color: '#298d74' },
  { symbol: 'INFY', name: 'Infosys', price: 1875.9, change: 2.14, high: 1889.25, low: 1839.3, volume: '6.08M', color: '#257cba' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1307.75, change: 1.08, high: 1314.85, low: 1288.25, volume: '7.31M', color: '#e85c36' },
  { symbol: 'ITC', name: 'ITC Limited', price: 493.4, change: -0.75, high: 499.8, low: 491.1, volume: '9.46M', color: '#45546f' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 1025.6, change: 1.91, high: 1035.5, low: 1002.2, volume: '10.21M', color: '#4776c5' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1774.7, change: -1.16, high: 1802.2, low: 1768.65, volume: '2.48M', color: '#c48045' },
];

export const chartData = [
  { time: '09:15', price: 920840 }, { time: '10:00', price: 925260 }, { time: '10:45', price: 922740 },
  { time: '11:30', price: 930680 }, { time: '12:15', price: 928420 }, { time: '13:00', price: 935100 },
  { time: '13:45', price: 933800 }, { time: '14:30', price: 940260 }, { time: '15:15', price: 946240 },
];

export const sparkData = [
  [{ v: 42 }, { v: 45 }, { v: 43 }, { v: 48 }, { v: 47 }, { v: 52 }, { v: 56 }],
  [{ v: 30 }, { v: 34 }, { v: 33 }, { v: 37 }, { v: 39 }, { v: 43 }, { v: 44 }],
  [{ v: 52 }, { v: 50 }, { v: 49 }, { v: 46 }, { v: 44 }, { v: 45 }, { v: 42 }],
];

export const gainers = [
  { symbol: 'INFY', name: 'Infosys Ltd.', price: '₹1,875.90', change: '+2.14%' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd.', price: '₹1,025.60', change: '+1.91%' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹2,948.20', change: '+1.46%' },
];

export const losers = [
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: '₹1,774.70', change: '-1.16%' },
  { symbol: 'ITC', name: 'ITC Limited', price: '₹493.40', change: '-0.75%' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '₹1,768.45', change: '-0.48%' },
];

export const holdings = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', qty: 48, avg: 2782.5, ltp: 2948.2, change: 5.96, color: '#4a78db' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', qty: 18, avg: 3998.1, ltp: 4201.85, change: 5.1, color: '#8762d6' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', qty: 80, avg: 1210.9, ltp: 1307.75, change: 8, color: '#e85c36' },
  { symbol: 'INFY', name: 'Infosys', qty: 30, avg: 1814.4, ltp: 1875.9, change: 3.39, color: '#257cba' },
];

export const formatINR = (value, options = {}) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0, ...options,
}).format(value);
