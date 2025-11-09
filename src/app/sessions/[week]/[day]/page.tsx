"use client";
import { useMemo, useState } from "react";
import { getSessionByWeekDay } from "../../../../data/hm61";
import { Session } from "../../../../lib/types";
import SessionProgressBar from "../../../../components/SessionProgressBar";
import ExerciseCardEditable from "../../../../components/ExerciseCardEditable";
import SupersetCardEditable from "../../../../components/SupersetCardEditable";
import AddExerciseModal from "../../../../components/AddExerciseModal";
import { Storage } from "../../../../lib/storage";

export default function SessionDetail({ params }: { params: { week: string; day: string }}) {
  const sessionInit = getSessionByWeekDay(Number(params.week), params.day);
  const [session, setSession] = useState<Session | undefined>(sessionInit);
  const [showAdd, setShowAdd] = useState(false);

  const completed = useMemo(() => Storage.getCompleted(session?.id || ""), [session?.id]);
  const totalSets = useMemo(() => {
    if (!session) return 0;
    return session.blocks.reduce((acc, b) =>
      acc + (b.type === "exercise" ? b.sets.length : b.exercises.reduce((a, e) => a + e.sets.length, 0)), 0);
  }, [session]);
  const pct = totalSets ? Math.round((completed.size / totalSets) * 100) : 0;

  if (!session) return <p className="text-muted">Séance introuvable.</p>;

  const updateSession = (next: Session) => {
    setSession(next);
    Storage.saveMutableSession(next.id, next); // persiste modifications
  };

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">{session.title}</h2>
        <p className="text-muted">{session.notes}</p>
        <SessionProgressBar value={pct} />
      </header>

      <div className="space-y-4">
        {session.blocks.map((b, i) =>
          b.type === "exercise"
            ? <ExerciseCardEditable key={b.id} session={session} blockIndex={i} onSessionChange={updateSession} />
            : <SupersetCardEditable key={b.id} session={session} blockIndex={i} onSessionChange={updateSession} />
        )}
      </div>

      <div className="flex items-center gap-2">
        <button className="btn" onClick={() => setShowAdd(true)}>+ Ajouter un exercice</button>
      </div>

      {showAdd && <AddExerciseModal session={session} onClose={() => setShowAdd(false)} onSessionChange={updateSession} />}
    </div>
  );
}
