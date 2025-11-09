"use client";
import { useEffect, useMemo, useState } from "react";

export default function TimerDial({ seconds=60, label, onEnd }: { seconds?: number; label?: string; onEnd?: () => void }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (left <= 0 && running) {
      setRunning(false); setLeft(0);
      new Audio("/ding.mp3")?.play();
      if ("vibrate" in navigator) navigator.vibrate(200);
      onEnd?.();
    }
  }, [left, running, onEnd]);

  const circumference = 2 * Math.PI * 45;
  const progress = Math.max(0, Math.min(1, left / seconds));
  const offset = circumference * (1 - progress);
  const mm = String(Math.floor(left / 60)).padStart(2,"0");
  const ss = String(left % 60).padStart(2,"0");

  const addTime = (d: number) => setLeft(l => Math.max(0, Math.min(seconds*3, l + d)));

  return (
    <div className="space-y-2">
      {label && <p className="text-sm text-muted">{label}</p>}
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="rotate-[-90deg]">
          <circle cx="50" cy="50" r="45" stroke="#232733" strokeWidth="8" fill="none"/>
          <circle cx="50" cy="50" r="45" stroke="#0A84FF" strokeWidth="8"
                  strokeDasharray={circumference} strokeDashoffset={offset} fill="none"/>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{mm}:{ss}</span>
      </div>
      <div className="flex gap-2">
        <button className="btn" onClick={() => addTime(-15)}>-15s</button>
        <button className="btn" onClick={() => addTime(+15)}>+15s</button>
        <button className="btn" onClick={() => setLeft(0)}>Passer</button>
        <button className="btn" onClick={() => setRunning(r => !r)}>{running ? 'Pause' : 'Start'}</button>
        <button className="btn" onClick={() => { setRunning(false); setLeft(seconds); }}>Reset</button>
      </div>
    </div>
  );
}
