"use client";

import StatCount from "@/components/charts/StatCount";
import ProgressBar from "@/components/charts/ProgressBar";

export interface IAppTable {
  date: string;
  guest_number: number;
}

export default function AppTablePage() {
  const guestCounts: IAppTable[] = [
    { date: "2025-11-01", guest_number: 12 },
    { date: "2025-11-02", guest_number: 8 },
    { date: "2025-11-03", guest_number: 10 },
  ];

  const progressData = [
    { label: "Réservations", value: 70 },
    { label: "Confirmées", value: 50 },
    { label: "Annulées", value: 20 },
  ];

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Tableau des réservations</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <StatCount data={guestCounts} />
        </div>
        <div className="card">
          <ProgressBar data={progressData} />
        </div>
      </div>
    </div>
  );
}
