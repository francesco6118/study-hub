import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { formatMinutes } from '../../lib/stats'

const TOOLTIP_STYLE = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '8px',
  color: '#f1f5f9',
  fontSize: '12px',
}

export default function DailyChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barCategoryGap="30%">
        <XAxis
          dataKey="label"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip
          formatter={(v) => [formatMinutes(v), 'Süre']}
          contentStyle={TOOLTIP_STYLE}
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
        />
        <Bar dataKey="minutes" fill="#10b981" radius={[4, 4, 0, 0]} minPointSize={2} />
      </BarChart>
    </ResponsiveContainer>
  )
}
