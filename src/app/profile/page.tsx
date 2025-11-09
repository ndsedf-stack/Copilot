"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [rpeEnabled, setRpeEnabled] = useState<boolean>(true);
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Profil & Réglages</h2>
      <div className="card flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Suivi RPE</h3>
          <p className="text-muted text-sm">Active la colonne RPE et l’analyse d’intensité.</p>
        </div>
        <button className="btn" onClick={() => setRpeEnabled(v => !v)}>
          RPE: {rpeEnabled ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
}
