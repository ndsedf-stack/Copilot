"use client";
import { useMemo, useState } from "react";
import { Storage } from "../../lib/storage";
import { volumeByMuscle, seriesForExercise, setCountPerMuscle, totalVolume } from "../../lib/analytics";
import MuscleDistributionChart from "../../components/charts/MuscleDistributionChart";
import ProgressChart from "../../components/charts/ProgressChart";
import SetCountChart from "../../components/charts/SetCountChart";
import BodyMap from "../../components/charts/BodyMap";
import WorkoutCalendar from "../../components/charts/WorkoutCalendar";

const muscleOptions = ["Quadriceps","Fessiers","Ischio-jambiers","Dos","Trapèzes","Biceps","Triceps","Épaules"];

export default function StatsPage() {
  const logs = Storage.getLogs();
  const [period, setPeriod] = useState<"7j"|"30j"|"3m"|"1an"|"all">("all");
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  const filteredLogs = useMemo(() => {
    const now = Date.now();
    const ranges: Record<string, number> = { "7j": 7, "30j": 30, "3m": 90, "1an": 365 };
    const days = ranges[period] || Infinity;
    return logs.filter(l => (now - l.timestamp) <= (days * 24 * 3600 * 1000));
  }, [logs, period]);

  const muscleFilteredLogs = useMemo(() => {
    if (!selectedMuscles.length) return filteredLogs;
    return filteredLogs.filter(l => l.muscles?.some(m => selectedMuscles.includes(m)));
  }, [filteredLogs, selectedMuscles]);

  const volMuscle = volumeByMuscle(muscleFilteredLogs);
  const latSeries = seriesForExercise(muscleFilteredLogs, "Lat Pulldown");
  const setCounts = setCountPerMuscle(muscleFilteredLogs);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Stats</h2>

      <div className="card flex flex-wrap gap-2 items-center">
        <span className="text-sm text-muted">Période:</span>
        {["7j","30j","3m","1an","all"].map(p => (
          <button key={p} className={`btn ${period===p ? 'border-info text-info' : ''}`} onClick={() => setPeriod(p as any)}>{p}</button>
        ))}
        <span className="text-sm text-muted ml-2">Muscles:</span>
        <div className="flex flex-wrap gap-2">
          {muscleOptions.map(m => (
            <button key={m} className={`btn ${selectedMuscles.includes(m) ? 'border-success text-success' : ''}`} onClick={() => {
              setSelectedMuscles(sel => sel.includes(m) ? sel.filter(x => x!==m) : [...sel, m]);
            }}>{m}</button>
          ))}
        </div>
        <div className="ml-auto">
          <span className="text-sm text-muted">Volume total:</span>
          <span className="ml-2 text-lg font-bold">{totalVolume(muscleFilteredLogs)}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card"><MuscleDistributionChart data={volMuscle} /></div>
        <div className="card"><SetCountChart data={setCounts} /></div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card"><ProgressChart data={latSeries} label="Lat Pulldown" /></div>
        <div className="card"><BodyMap logs={muscleFilteredLogs} /></div>
      </div>

      <div className="card"><WorkoutCalendar logs={muscleFilteredLogs} /></div>
    </div>
  );
}
