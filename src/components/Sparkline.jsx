import { Area, AreaChart, ResponsiveContainer } from 'recharts';

export default function Sparkline({ data, positive = true }) {
  return (
    <div className="sparkline" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, bottom: 4, left: 0, right: 0 }}>
          <defs>
            <linearGradient id={`spark-${positive ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={positive ? '#20a876' : '#e55b57'} stopOpacity=".32" />
              <stop offset="100%" stopColor={positive ? '#20a876' : '#e55b57'} stopOpacity="0" />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={positive ? '#20a876' : '#e55b57'} strokeWidth={1.7} fill={`url(#spark-${positive ? 'up' : 'down'})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
