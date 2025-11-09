"use client";

import MuscleDistributionChart from "@/components/charts/MuscleDistributionChart";
import ProgressChart from "@/components/charts/ProgressChart";
import SetCountChart from "@/components/charts/SetCountChart";
import BodyMap from "@/components/charts/BodyMap";
import WorkoutCalendar from "@/components/charts/WorkoutCalendar";

export default function StatsPage() {
  // Exemple de données fictives
  const volMuscle: Record<string, number> = {
    chest: 120,
    back: 90,
    legs: 150,
    arms: 80,
  };

  const setCounts = [
    { date: "2025-11-01", sets: 12 },
    { date: "2025-11-02", sets: 8 },
    { date: "2025-11-03", sets: 10 },
  ];

  const progressData = [
    { date: "2025-11-01", weight: 70 },
    { date: "2025-11-08", weight: 71 },
    { date: "2025-11-15", weight: 72 },
  ];

  const calendarData = [
    { date: "2025-11-01", workout: "Push" },
    { date: "2025-11-02", workout: "Pull" },
    { date: "2025-11-03", workout: "Legs" },
  ];

  const muscleData = Object.entries(volMuscle).map(([muscle, volume]) => ({
    muscle,
    volume,
  }));

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Statistiques</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <MuscleDistributionChart data={muscleData} />
        </div>
        <div className="card">
          <SetCountChart data={setCounts} />
        </div>
        <div className="card">
          <ProgressChart data={progressData} />
        </div>
        <div className="card">
          <WorkoutCalendar data={calendarData} />
        </div>
        <div className="card">
          <BodyMap activeMuscles={Object.keys(volMuscle)} />
        </div>
      </div>
    </div>
  );
}
