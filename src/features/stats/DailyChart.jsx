import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { formatMinutes } from '../../lib/stats'

// Uses CSS variables defined in index.css so tooltip follows the active theme
const tooltipStyle = {
  backgroundColor: 'var(--tooltip-bg)',
  border: '1px solid var(--tooltip-border)',
  borderRadius: '8px',
  color: 'var(--tooltip-color)',
  fontSize: '12px',
}

export default function DailyChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barCategoryGap="30%">
        <XAxis dataKey="label" tick={{ fill: 'var(--tooltip-muted)', fontSize: 11 }}
          axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip formatter={(v) => [formatMinutes(v), 'Süre']}
          contentStyle={tooltipStyle} cursor={{ fill: 'rgba(128,128,128,0.06)' }} />
        <Bar dataKey="minutes" fill="#10b981" radius={[4, 4, 0, 0]} minPointSize={2} />
      </BarChart>
    </ResponsiveContainer>
  )
}
