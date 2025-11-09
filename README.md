# 🏋️ Hybrid Master — Application React/Next.js

Application de suivi d'entraînement inspirée du programme **Hybrid Master 61**, enrichie pour être **modulaire, responsive, et 100% locale**.  
Elle permet de suivre, modifier et analyser ses séances de musculation avec précision, tout en respectant le programme de base sauf modification explicite par l’utilisateur.

---

## 🚀 Objectifs

- ✅ Suivre les séances du programme HM61 (26 semaines, 4 jours/semaine)
- ✅ Modifier chaque exercice (poids, reps, RPE, techniques)
- ✅ Visualiser les statistiques (volume, muscles, progression)
- ✅ Naviguer par semaine/jour
- ✅ Travailler en local ou déconnecté
- ✅ Déployer facilement sur Vercel ou GitHub Pages

---

## 🧱 Architecture

src/
├── app/               # Pages Next.js (Accueil, Séances, Stats, Profil)
├── components/        # UI modulaire (cartes, timer, modales, charts)
├── data/              # Séances HM61 + bibliothèque exercices
├── lib/               # Types, stockage, analytics, partage
├── public/            # Assets (sons, SVG)


---

## 🧑‍💻 Technologies

- **Next.js 14** : App Router, export statique
- **React 18** : composants dynamiques
- **Tailwind CSS** : design sombre, responsive
- **TypeScript** : typage strict
- **Recharts** : graphiques analytics
- **html2canvas** : export image des stats
- **LocalStorage** : persistance sans serveur

---

## ✅ Checklist de compatibilité

Avant de lancer le projet, assure-toi que ton environnement respecte ces versions :

- **Node.js** ≥ 18.17  
- **npm** ≥ 9.0  
- **Next.js** 14.x  
- **React** 18.x  
- **TypeScript** ≥ 5.0  
- **Navigateur** : Chrome, Edge, Safari ou Firefox (dernières versions)  
- **OS** : macOS, Windows, Linux (testé sur macOS Ventura et Windows 11)

---

## 📊 Programme Hybrid Master (HM61)

Le programme est structuré en **26 semaines**, avec **4 jours par semaine** :

### Répartition hebdomadaire :
- **Dimanche** : Jambes (force + volume)
- **Mardi** : Haut du corps (tirage + poussée)
- **Jeudi** : Haut du corps (pectoraux + bras)
- **Vendredi** : Jambes + Core

### Types de blocs :
- **Exercice simple** : avec tempo, repos, technique, séries
- **Superset** : deux exercices enchaînés, repos commun
- **Techniques d’intensification** : Tempo, Rest-Pause, Drop Set, Pauses isométriques

👉 Toutes les séances sont définies dans `src/data/hm61.ts` et respectent le programme sauf modification manuelle.

---

## 🔧 Exemples pratiques de modification

### ➕ Ajouter un exercice dans une séance
```ts
{
  type: "exercise",
  id: "hip_thrust",
  name: "Hip Thrust",
  tempo: "2-1-2",
  rest: 90,
  muscles: ["Fessiers","Ischio-jambiers"],
  cues: ["Dos neutre","Poussée explosive"],
  sets: [
    { index: 1, reps: 12, weight: 60 },
    { index: 2, reps: 12, weight: 60 },
    { index: 3, reps: 12, weight: 60 }
  ]
}
Modifier le tempo d’un exercice

tempo: "4-1-2" // au lieu de "3-1-2"

🔄 Ajouter une technique d’intensification

techniques: ["Drop Set", "Rest-Pause"]

🗑️ Supprimer un exercice

Supprimer le bloc dans hm61.ts

Ou utiliser le bouton “Supprimer l’exercice” dans l’interface
Statistiques intégrées

Volume total par muscle

Nombre de séries par groupe musculaire

Progression par exercice

Body map des muscles travaillés

Calendrier d’entraînement

Filtres par période (7j, 30j, 3m, 1an, all) et par muscle

🔒 Données

Stockées localement via localStorage

Pas de serveur, pas de cloud

Export JSON prévu dans la roadmap

🛣️ Roadmap (évolutions futures)

[ ] Export/Import JSON des séances et logs

[ ] Synchronisation cloud (OneDrive / Google Drive)

[ ] Notes personnelles par exercice

[ ] Mode “Coach” avec suggestions automatiques d’intensification

[ ] Comparaison de progression entre semaines

[ ] Mode hors-ligne PWA (Progressive Web App)

[ ] Partage de séances entre utilisateurs

[ ] Historique des modifications




