import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import { formatMinutes } from '../../lib/stats'

const TOOLTIP_STYLE = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '8px',
  color: '#f1f5f9',
  fontSize: '12px',
}

const ROW_HEIGHT = 40
const HEADER_HEIGHT = 10

export default function SubjectChart({ data }) {
  const height = data.length * ROW_HEIGHT + HEADER_HEIGHT

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 48, bottom: 0, left: 0 }}
        barCategoryGap="25%"
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={72}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => v.length > 9 ? v.slice(0, 8) + '…' : v}
        />
        <Tooltip
          formatter={(v) => [formatMinutes(v), 'Süre']}
          contentStyle={TOOLTIP_STYLE}
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
        />
        <Bar dataKey="minutes" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#64748b', fontSize: 11, formatter: formatMinutes }}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
