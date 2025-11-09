"use client";
import { useState } from "react";
import { Session, ExerciseBlock } from "../lib/types";
import { Storage } from "../lib/storage";
import TimerDial from "./TimerDial";

export default function ExerciseCardEditable({
  session, blockIndex, onSessionChange
}: { session: Session; blockIndex: number; onSessionChange: (s: Session) => void }) {
  const block = session.blocks[blockIndex] as ExerciseBlock;
  const [timerSetIdx, setTimerSetIdx] = useState<number | null>(null);

  const updateSet = (idx: number, patch: Partial<ExerciseBlock["sets"][number]>) => {
    const next = { ...session };
    const set = next.blocks[blockIndex] as ExerciseBlock;
    set.sets = set.sets.map(s => s.index === idx ? { ...s, ...patch } : s);
    onSessionChange(next);
  };

  const removeBlock = () => {
    const next = { ...session };
    next.blocks = next.blocks.filter((_, i) => i !== blockIndex);
    onSessionChange(next);
  };

  return (
    <div className="card space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{block.name}</h3>
        <div className="flex gap-2 text-sm">
          <span className="badge">Tempo {block.tempo}</span>
          <span className="badge">Repos {block.rest}s</span>
        </div>
      </div>

      {!!block.cues?.length && (
        <ul className="flex flex-wrap gap-2 text-muted">
          {block.cues.map(c => <li key={c} className="px-2 py-1 rounded bg-white/5">{c}</li>)}
        </ul>
      )}

      {!!block.techniques?.length && (
        <div className="flex flex-wrap gap-2">
          {block.techniques.map(t => <span key={t} className="px-2 py-1 rounded bg-accent/20 text-accent">{t}</span>)}
        </div>
      )}

      <div className="divide-y divide-white/5">
        {block.sets.map(s => (
          <div key={s.index} className="grid grid-cols-7 items-center gap-2 py-2">
            <span>S{s.index}</span>
            <input className="input" type="number" value={s.reps} onChange={e => updateSet(s.index, { reps: Number(e.target.value) })} />
            <input className="input" type="number" value={s.weight} onChange={e => updateSet(s.index, { weight: Number(e.target.value) })} />
            <select className="select" value={s.rpe ?? 8} onChange={e => updateSet(s.index, { rpe: Number(e.target.value) })}>
              {[6,7,7.5,8,8.5,9,9.5,10].map(r => <option key={r} value={r}>RPE {r}</option>)}
            </select>
            <div className="flex gap-1">
              <button className="btn" onClick={() => updateSet(s.index, { weight: s.weight + 2.5 })}>+2.5</button>
              <button className="btn" onClick={() => updateSet(s.index, { weight: Math.max(0, s.weight - 2.5) })}>-2.5</button>
            </div>
            <button className="btn-primary" onClick={() => setTimerSetIdx(s.index)}>Repos</button>
            <button className="btn-success" onClick={() => {
              Storage.markCompleted(session.id, `${block.id}:${s.index}`);
              Storage.saveLog({
                sessionId: session.id, blockId: block.id, exerciseName: block.name,
                muscles: block.muscles || [], weight: s.weight, reps: s.reps, rpe: s.rpe, timestamp: Date.now(),
                techniques: block.techniques
              });
            }}>
              ✓ Check
            </button>
            {timerSetIdx === s.index && (
              <div className="col-span-7">
                <TimerDial seconds={block.rest} label={`${block.name} — Série ${s.index}`} onEnd={() => setTimerSetIdx(null)} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button className="btn" onClick={removeBlock}>Supprimer l’exercice</button>
      </div>
    </div>
  );
}
