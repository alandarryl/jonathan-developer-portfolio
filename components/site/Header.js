"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  // { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/70 bg-ink-900/85 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink-50"
        >
          Jonathan<span className="text-mint-300">.</span>Okana
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm transition-colors",
                  active ? "text-mint-300" : "text-ink-300 hover:text-ink-50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-md bg-mint-300 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-mint-400"
          >
            Me contacter
          </Link>
        </nav>

        <button
          className="text-ink-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-700/70 bg-ink-900 px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-ink-200 hover:text-mint-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
