import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer({ profile }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-700/70 bg-ink-900">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm text-ink-100">
            {profile?.nomComplet || "Jonathan Okana"}
          </p>
          <p className="mt-1 text-xs text-ink-400">
            {profile?.titre || "Développeur Web Fullstack"} — {profile?.localisation || "Île-de-France"}
          </p>
        </div>

        <div className="flex items-center gap-5">
          {profile?.liens?.github && (
            <a
              href={profile.liens.github}
              target="_blank"
              rel="noreferrer"
              className="text-ink-400 hover:text-mint-300"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {profile?.liens?.linkedin && (
            <a
              href={profile.liens.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-ink-400 hover:text-mint-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-ink-400 hover:text-mint-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          )}
        </div>

        <p className="text-xs text-ink-500">
          © {year} — Fait avec Next.js &amp; MongoDB.{" "}
          <Link href="/dashboard" className="hover:text-ink-300">
            Admin
          </Link>
        </p>
      </div>
    </footer>
  );
}
