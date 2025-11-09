import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function SetCountChart({ data }: { data: { muscle: string; sets: number }[] }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="muscle" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sets" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
