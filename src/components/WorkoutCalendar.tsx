export default function WorkoutCalendar({ dates }: { dates: string[] }) {
  return (
    <div className="text-sm text-gray-500">
      Jours d'entraînement : {dates.map((d) => <span key={d}>{d} • </span>)}
    </div>
  )
}
