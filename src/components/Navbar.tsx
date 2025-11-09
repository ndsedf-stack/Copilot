"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Hybrid Master" className="w-6 h-6" />
        <h1 className="text-xl font-semibold">Hybrid Master</h1>
      </div>
      <div className="flex gap-4 text-muted">
        <Link href="/">Accueil</Link>
        <Link href="/sessions">Séances</Link>
        <Link href="/stats">Stats</Link>
        <Link href="/profile">Profil</Link>
      </div>
    </nav>
  );
}
