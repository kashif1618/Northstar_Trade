export default function StockBadge({ symbol, color = '#3868c9' }) {
  const initials = symbol.length > 4 ? symbol.slice(0, 2) : symbol.slice(0, 1);
  return <span className="stock-badge" style={{ background: color }}>{initials}</span>;
}
