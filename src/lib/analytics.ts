import { LogEntry } from "./storage";

export function sessionsCompleted(logs: LogEntry[]) {
  return new Set(logs.map(l => l.sessionId)).size;
}
export function streak(logs: LogEntry[]) {
  const days = new Set(logs.map(l => new Date(l.timestamp).toISOString().slice(0,10)));
  let count = 0;
  for (let i=0;;i++){
    const d = new Date(); d.setDate(d.getDate()-i);
    const iso = d.toISOString().slice(0,10);
    if (days.has(iso)) count++; else break;
  }
  return count;
}
export function totalVolume(logs: LogEntry[]) {
  return logs.reduce((sum,l)=> sum + (l.weight||0)*(l.reps||0), 0);
}
export function volumeByMuscle(logs: LogEntry[]) {
  const out: Record<string, number> = {};
  for (const l of logs) {
    const vol = (l.weight||0)*(l.reps||0);
    for (const m of l.muscles||[]) out[m] = (out[m]||0) + vol;
  }
  return out;
}
export function setCountPerMuscle(logs: LogEntry[]) {
  const out: Record<string, number> = {};
  for (const l of logs) for (const m of l.muscles||[]) out[m] = (out[m]||0) + 1;
  return out;
}
export function seriesForExercise(logs: LogEntry[], exerciseName: string) {
  return logs.filter(l => l.exerciseName === exerciseName)
             .map(l => ({ date: new Date(l.timestamp).toISOString().slice(0,10),
                          value: (l.weight||0)*(l.reps||0) }));
}
