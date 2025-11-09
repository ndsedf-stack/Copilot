import Link from "next/link";
import { weeks, days, getSessionByWeekDay } from "../../data/hm61";

export default function SessionsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Programme HM61</h2>
      <div className="space-y-3">
        {weeks.map(week => (
          <div key={week} className="card space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Semaine {week}</h3>
              <div className="flex gap-2">
                {days.map(d => {
                  const s = getSessionByWeekDay(week!, d);
                  return (
                    <Link key={d} href={`/sessions/${week}/${d}`} className="btn">{d}{s ? "" : " (vide)"}</Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
