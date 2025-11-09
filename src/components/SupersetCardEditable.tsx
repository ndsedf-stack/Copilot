"use client";
import { useState } from "react";
import { Session, SupersetBlock } from "../lib/types";
import { Storage } from "../lib/storage";
import TimerDial from "./TimerDial";
import SessionProgressBar from "./SessionProgressBar";

export default function SupersetCardEditable({
  session, blockIndex, onSessionChange
}: { session: any; blockIndex: number; onSessionChange: (s: any) => void }) {
  const block = session.blocks[blockIndex] as SupersetBlock;
  const [showTimer, setShowTimer] = useState(false);

  const updateSet = (exId: string, idx: number, patch: any) => {
    const next = { ...session };
    const b = next.blocks[blockIndex] as SupersetBlock;
    b.exercises = b.exercises.map(ex => ex.id === exId ? {
      ...ex, sets: ex.sets.map(s => s.index === idx ? { ...s, ...patch } : s)
    } : ex);
    onSessionChange(next);
  };

  const duoTotal = block.exercises.reduce((a,e) => a + e.sets.length, 0);
  const duoDone = 0; // on pourrait lire Storage.getCompleted pour le duo
  const duoPct = duoTotal ? Math.round((duoDone/duoTotal)*100) : 0;

  return (
    <div className="card border-2 border-primary/40 bg-gradient-to-br from-card to-[#1a1d27] space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{block.name}</h3>
        <div className="flex gap-2 text-sm">
          <span className="badge">Tempo {block.tempo}</span>
          <span className="badge">Repos duo {block.rest}s</span>
        </div>
      </div>

      {!!block.techniques?.length && (
        <div className="flex flex-wrap gap-2">
          {block.techniques.map(t => <span key={t} className="px-2 py-1 rounded bg-accent/20 text-accent">{t}</span>)}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3 mt-2">
        {block.exercises.map(ex => (
          <div key={ex.id} className="rounded-lg p-3 bg-white/5">
            <h4 className="font-semibold mb-2">{ex.name}</h4>
            <ul className="flex flex-wrap gap-2 text-muted mb-2">
              {ex.cues?.map(c => <li key={c} className="px-2 py-1 rounded bg-white/5">{c}</li>)}
            </ul>
            <div className="divide-y divide-white/5">
              {ex.sets.map(s => (
                <div className="grid grid-cols-6 items-center gap-2 py-2" key={s.index}>
                  <span>S{s.index}</span>
                  <input className="input" type="number" value={s.reps} onChange={e => updateSet(ex.id, s.index, { reps: Number(e.target.value) })} />
                  <input className="input" type="number" value={s.weight} onChange={e => updateSet(ex.id, s.index, { weight: Number(e.target.value) })} />
                  <select className="select" value={s.rpe ?? 8} onChange={e => updateSet(ex.id, s.index, { rpe: Number(e.target.value) })}>
                    {[6,7,7.5,8,8.5,9,9.5,10].map(r => <option key={r} value={r}>RPE {r}</option>)}
                  </select>
                  <button className="btn-success" onClick={() => {
                    Storage.markCompleted(session.id, `${block.id}:${ex.id}:${s.index}`);
                    Storage.saveLog({
                      sessionId: session.id, blockId: `${block.id}:${ex.id}`, exerciseName: ex.name,
                      muscles: ex.muscles || [], weight: s.weight, reps: s.reps, rpe: s.rpe, timestamp: Date.now(),
                      techniques: block.techniques
                    });
                  }}>✓ Check</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SessionProgressBar value={duoPct} />
      <button className="btn-primary mt-2" onClick={() => setShowTimer(true)}>Repos superset</button>
      {showTimer && <TimerDial seconds={block.rest} label={`${block.name}`} onEnd={() => setShowTimer(false)} />}
    </div>
  );
}
