import { Session } from "../lib/types";

/**
 * Placeholders:
 * - Remplace "hm61Raw" par les données issues de ta branche test (semaine/jour/exos).
 * - Mappe vers Session[] avec blocks exercise/superset, incluant tempo, rest, cues, techniques.
 */
const hm61Raw = [
  // Exemple upper (images fournies Lat+Landmine, Row, superset curls/pushdown)
  {
    week: 1, day: "mardi", id: "hm61-w1-mardi",
    title: "Jour 1 - Haut du corps", date: "2025-11-10", notes: "Supersets, amplitude complète.",
    blocks: [
      { type: "superset", id: "lat_landmine", name: "Lat Pulldown / Landmine Press", tempo: "3-1-2", rest: 90,
        exercises: [
          { id: "lat_pulldown", name: "Lat Pulldown", muscles: ["Dos","Biceps"], cues: ["Touche poitrine","Coudes fixes"], sets: [
            { index: 1, reps: 10, weight: 50 }, { index: 2, reps: 10, weight: 50 },
            { index: 3, reps: 10, weight: 50 }, { index: 4, reps: 10, weight: 50 }
          ]},
          { id: "landmine_press", name: "Landmine Press", muscles: ["Épaules","Triceps"], cues: ["Gainage serré","Coudes stables"], sets: [
            { index: 1, reps: 10, weight: 20 }, { index: 2, reps: 10, weight: 20 },
            { index: 3, reps: 10, weight: 20 }, { index: 4, reps: 10, weight: 20 }
          ]},
        ]
      },
      { type: "exercise", id: "rowing_machine", name: "Rowing Machine (large grip)", tempo: "3-1-2", rest: 75,
        muscles: ["Dos","Trapèzes"], cues: ["Amplitude complète","Pause en étirement"], sets: [
          { index: 1, reps: 12, weight: 15 }, { index: 2, reps: 12, weight: 15 },
          { index: 3, reps: 12, weight: 15 }, { index: 4, reps: 12, weight: 15 }
        ]
      },
      { type: "superset", id: "curl_pushdown", name: "Incline Curl / Cable Pushdown", tempo: "2-0-2", rest: 90,
        exercises: [
          { id: "incline_curl", name: "Incline Curl", muscles: ["Biceps"], sets: [
            { index: 1, reps: 12, weight: 12 }, { index: 2, reps: 12, weight: 12 },
            { index: 3, reps: 12, weight: 12 }, { index: 4, reps: 12, weight: 12 }
          ]},
          { id: "cable_pushdown", name: "Cable Pushdown", muscles: ["Triceps"], sets: [
            { index: 1, reps: 12, weight: 25 }, { index: 2, reps: 12, weight: 25 },
            { index: 3, reps: 12, weight: 25 }, { index: 4, reps: 12, weight: 25 }
          ]}
        ]
      }
    ]
  },
  // Exemple lower (Trap Bar, Goblet, Leg Press) — basé sur ta maquette
  {
    week: 1, day: "dimanche", id: "hm61-w1-dimanche",
    title: "Jour 1 - Jambes", date: "2025-11-08", notes: "Contrôle du tempo, amplitude complète.",
    blocks: [
      { type: "exercise", id: "trap_bar_deadlift", name: "Trap Bar Deadlift", tempo: "3-1-2", rest: 120, muscles: ["Quadriceps","Ischio-jambiers","Fessiers","Bas du dos"], cues: ["Coudes fléchis","Montée horizontale (haltère)","Dos neutre"],
        sets: [{ index: 1, reps: 6, weight: 55 }, { index: 2, reps: 6, weight: 55 }, { index: 3, reps: 6, weight: 55 }, { index: 4, reps: 6, weight: 55 }, { index: 5, reps: 8, weight: 55 }]
      },
      { type: "exercise", id: "goblet_squat", name: "Goblet Squat", tempo: "3-1-2", rest: 75, muscles: ["Quadriceps","Fessiers","Adducteurs"], cues: ["Haltère devant la poitrine","Descente contrôlée","Genoux ouverts"],
        sets: [{ index: 1, reps: 10, weight: 25 }, { index: 2, reps: 10, weight: 25 }, { index: 3, reps: 10, weight: 25 }, { index: 4, reps: 10, weight: 25 }]
      },
      { type: "exercise", id: "leg_press", name: "Leg Press", tempo: "3-1-2", rest: 75, muscles: ["Quadriceps","Fessiers"], cues: ["Pieds largeur épaules","Amplitude complète","Contrôle en bas"],
        sets: [{ index: 1, reps: 10, weight: 110 }, { index: 2, reps: 10, weight: 110 }, { index: 3, reps: 10, weight: 110 }, { index: 4, reps: 10, weight: 110 }]
      }
    ]
  }
];

export const hm61Sessions: Session[] = hm61Raw.map(r => ({
  id: r.id, title: r.title, date: r.date, notes: r.notes, week: r.week, day: r.day, blocks: r.blocks
}));

export const weeks = Array.from(new Set(hm61Sessions.map(s => s.week))).sort((a,b)=> (a||0)-(b||0));
export const days = ["dimanche","mardi","jeudi","vendredi"] as const;

export function getSessionByWeekDay(week: number, day: string): Session | undefined {
  return hm61Sessions.find(s => s.week === week && s.day === day);
}
export function getAllSessions(): Session[] { return hm61Sessions; }
