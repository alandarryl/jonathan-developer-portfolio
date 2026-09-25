"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  User,
  Sparkles,
  Briefcase,
  FolderKanban,
  MessageSquare,
  LogOut,
  Globe,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/dashboard/profil", label: "Profil", icon: User },
  { href: "/dashboard/competences", label: "Compétences", icon: Sparkles },
  { href: "/dashboard/experiences", label: "Expériences", icon: Briefcase },
  { href: "/dashboard/projets", label: "Projets", icon: FolderKanban },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
];

export default function Sidebar({ unreadCount = 0 }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-ink-700 bg-ink-800/40">
      <div className="border-b border-ink-700 px-6 py-5">
        <p className="font-display text-sm font-semibold text-ink-50">
          Dashboard
        </p>
        <p className="text-xs text-ink-400">Jonathan Okana</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {links.map((link) => {
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-mint-400/10 text-mint-300"
                  : "text-ink-300 hover:bg-ink-700/50 hover:text-ink-50"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon size={16} />
                {link.label}
              </span>
              {link.href === "/dashboard/messages" && unreadCount > 0 && (
                <span className="rounded-full bg-mint-300 px-1.5 py-0.5 text-[10px] font-semibold text-ink-900">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-ink-700 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink-300 hover:bg-ink-700/50 hover:text-ink-50"
        >
          <Globe size={16} />
          Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-ink-300 hover:bg-ink-700/50 hover:text-ink-50"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
