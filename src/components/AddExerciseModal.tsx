"use client";
import { exerciseLibrary } from "../data/library";
import { Session, ExerciseBlock } from "../lib/types";

export default function AddExerciseModal({
  session, onClose, onSessionChange
}: { session: Session; onClose: () => void; onSessionChange: (s: Session) => void }) {
  const addExercise = (name: string, muscles: string[]) => {
    const next: Session = { ...session };
    const newBlock: ExerciseBlock = {
      type: "exercise", id: `${name.toLowerCase().replace(/\s+/g,'_')}_${Date.now()}`,
      name, muscles, tempo: "2-0-2", rest: 75, cues: [], techniques: [],
      sets: [{ index: 1, reps: 10, weight: 20 }]
    };
    next.blocks = [...next.blocks, newBlock];
    onSessionChange(next);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card w-full max-w-md space-y-3">
        <h3 className="text-lg font-semibold">Ajouter un exercice</h3>
        <div className="space-y-2 max-h-64 overflow-auto">
          {exerciseLibrary.map(e => (
            <button key={e.id} className="btn w-full justify-start" onClick={() => addExercise(e.name, e.muscles)}>
              {e.name} — <span className="text-muted text-sm">{e.muscles.join(", ")}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="btn" onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
}
