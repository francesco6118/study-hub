import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import { formatMinutes } from '../../lib/stats'

const tooltipStyle = {
  backgroundColor: 'var(--tooltip-bg)',
  border: '1px solid var(--tooltip-border)',
  borderRadius: '8px',
  color: 'var(--tooltip-color)',
  fontSize: '12px',
}

const ROW_HEIGHT = 40

export default function SubjectChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={data.length * ROW_HEIGHT + 10}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 52, bottom: 0, left: 0 }} barCategoryGap="25%">
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" width={72}
          tick={{ fill: 'var(--tooltip-muted)', fontSize: 12 }}
          axisLine={false} tickLine={false}
          tickFormatter={v => v.length > 9 ? v.slice(0, 8) + '…' : v} />
        <Tooltip formatter={(v) => [formatMinutes(v), 'Süre']}
          contentStyle={tooltipStyle} cursor={{ fill: 'rgba(128,128,128,0.06)' }} />
        <Bar dataKey="minutes" radius={[0, 4, 4, 0]}
          label={{ position: 'right', fill: 'var(--tooltip-muted)', fontSize: 11, formatter: formatMinutes }}>
          {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
