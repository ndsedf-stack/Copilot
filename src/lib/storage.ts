const LOG_KEY = "hm_logs";
const DONE_KEY = (sessionId: string) => `hm_done_${sessionId}`;
const SESSIONS_KEY = "hm_sessions"; // modifications locales (poids/reps/etc.)

export type LogEntry = {
  sessionId: string; blockId: string; exerciseName: string;
  muscles: string[]; weight: number; reps: number; rpe?: number;
  timestamp: number; techniques?: string[];
};

export const Storage = {
  getLogs(): LogEntry[] {
    return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  },
  saveLog(entry: LogEntry) {
    const prev = Storage.getLogs(); prev.push(entry);
    localStorage.setItem(LOG_KEY, JSON.stringify(prev));
  },
  getCompleted(sessionId: string): Set<string> {
    return new Set(JSON.parse(localStorage.getItem(DONE_KEY(sessionId)) || "[]"));
  },
  markCompleted(sessionId: string, key: string) {
    const s = Storage.getCompleted(sessionId);
    s.add(key);
    localStorage.setItem(DONE_KEY(sessionId), JSON.stringify(Array.from(s)));
  },
  getMutableSessions(): Record<string, any> {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY) || "{}");
  },
  saveMutableSession(sessionId: string, session: any) {
    const prev = Storage.getMutableSessions();
    prev[sessionId] = session;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(prev));
  }
};
