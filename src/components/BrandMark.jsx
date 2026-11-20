export default function BrandMark({ compact = false }) {
  return (
    <div className="brand">
      <span className="brand-mark"><i /><i /><i /></span>
      {!compact && <span>northstar<span className="brand-accent">.</span></span>}
    </div>
  );
}
