import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TechMarquee from "./TechMarquee";

export default function Hero({ profile }) {
  return (
    <section className="relative overflow-hidden bg-blueprint">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/70 to-ink-900" />

      <div className="relative mx-auto max-w-content px-6 pb-20 pt-10 sm:pt-16">
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800/60 px-3.5 py-1.5 font-mono text-xs text-mint-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint-300" />
          {profile?.disponibilite || "Disponible pour une alternance"}
        </div>

        <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.08] text-ink-50 sm:text-6xl">
          {profile?.nomComplet || "Jonathan Okana"}, développeur web
          fullstack qui transforme des idées en produits utilisables.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
          {profile?.accrocheHero}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 rounded-md bg-mint-300 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-mint-400"
          >
            Voir mes projets
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/a-propos"
            className="inline-flex items-center gap-2 rounded-md border border-ink-500 px-5 py-3 text-sm font-medium text-ink-100 transition-colors hover:border-mint-300 hover:text-mint-300"
          >
            Mon parcours
          </Link>
        </div>

        <TechMarquee />
      </div>
    </section>
  );
}
