export type SetItem = { index: number; reps: number; weight: number; rpe?: number };
export type Techniques = ("Tempo" | "Rest-Pause" | "Drop Set" | "Pause Iso")[];
export type ExerciseBlock = {
  type: "exercise";
  id: string; name: string;
  muscles: string[]; tempo: string; rest: number;
  cues?: string[]; techniques?: Techniques;
  sets: SetItem[];
};
export type SupersetBlock = {
  type: "superset"; id: string; name: string; tempo: string; rest: number;
  techniques?: Techniques;
  exercises: { id: string; name: string; muscles: string[]; cues?: string[]; sets: SetItem[] }[];
};
export type Session = {
  id: string; title: string; date: string; notes?: string;
  week?: number; day?: "dimanche"|"mardi"|"jeudi"|"vendredi";
  blocks: (ExerciseBlock | SupersetBlock)[];
};
