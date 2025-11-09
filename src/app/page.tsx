"use client";
import Link from "next/link";
import { Storage } from "../lib/storage";
import { sessionsCompleted, streak, totalVolume } from "../lib/analytics";
import { getAllSessions } from "../data/hm61";

export default function Home() {
  const logs = Storage.getLogs();
  const kpi = [
    { label: "Séances", value: sessionsCompleted(logs) },
    { label: "Streak", value: streak(logs) },
    { label: "Volume", value: totalVolume(logs) }
  ];
  const nextSession = getAllSessions()[0];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card space-y-3">
        <h2 className="text-2xl font-bold">Séance du jour</h2>
        <p className="text-muted">{nextSession?.title}</p>
        {!!nextSession && (
          <Link className="btn-primary inline-block" href={`/sessions/${nextSession.week}/${nextSession.day}`}>Commencer</Link>
        )}
      </div>
      <div className="card">
        <div className="flex gap-3">
          {kpi.map(k => (
            <div key={k.label} className="bg-[#232733] rounded-xl p-3">
              <h4 className="text-sm text-muted">{k.label}</h4>
              <p className="text-2xl font-bold">{k.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
