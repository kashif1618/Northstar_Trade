import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatINR } from '../data/marketData';

export default function TradeModal({ stock, side = 'buy', onClose, onComplete }) {
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('Market');
  const [message, setMessage] = useState('');
  const amount = stock.price * quantity;

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const submit = (event) => {
    event.preventDefault();
    if (!quantity || quantity < 1) return setMessage('Enter a quantity of at least 1.');
    setMessage(`${side === 'buy' ? 'Buy' : 'Sell'} order placed for ${quantity} share${quantity > 1 ? 's' : ''}.`);
    onComplete?.(stock, side, quantity);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="trade-modal" role="dialog" aria-modal="true" aria-label={`${side} ${stock.symbol}`}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className={`trade-heading ${side}`}><span>{side === 'buy' ? 'Buy' : 'Sell'}</span><strong>{stock.symbol}</strong></div>
        <p className="trade-company">{stock.name} · NSE</p>
        <form onSubmit={submit}>
          <div className="segmented-control">
            {['Market', 'Limit'].map((type) => <button type="button" className={orderType === type ? 'selected' : ''} onClick={() => setOrderType(type)} key={type}>{type}</button>)}
          </div>
          <label>Quantity<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label>
          {orderType === 'Limit' && <label>Limit price<input type="number" min="1" defaultValue={stock.price} /></label>}
          <div className="order-total"><span>Estimated value</span><strong>{formatINR(amount)}</strong></div>
          {message && <p className="order-message">{message}</p>}
          <button className={`submit-order ${side}`} type="submit">Confirm {side === 'buy' ? 'buy' : 'sell'}</button>
        </form>
        <p className="trade-disclaimer">This is a simulated order. No real funds or securities are involved.</p>
      </section>
    </div>
  );
}
