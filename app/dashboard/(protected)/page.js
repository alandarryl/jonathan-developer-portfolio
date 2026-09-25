import { FolderKanban, Sparkles, Briefcase, MessageSquare } from "lucide-react";
import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Message from "@/models/Message";

async function getStats() {
  await connectDB();
  const [projects, skills, experiences, messages, unread] =
    await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ lu: false }),
    ]);
  return { projects, skills, experiences, messages, unread };
}

async function getRecentMessages() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 }).limit(5).lean();
  return JSON.parse(JSON.stringify(messages));
}

export default async function DashboardOverviewPage() {
  const [stats, recentMessages] = await Promise.all([
    getStats(),
    getRecentMessages(),
  ]);

  return (
    <div>
      <Topbar
        title="Vue d'ensemble"
        description="Résumé du contenu de ton portfolio."
      />

      <div className="grid gap-5 p-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Projets" value={stats.projects} icon={FolderKanban} />
        <StatCard label="Compétences" value={stats.skills} icon={Sparkles} />
        <StatCard label="Expériences" value={stats.experiences} icon={Briefcase} />
        <StatCard
          label="Messages non lus"
          value={stats.unread}
          icon={MessageSquare}
        />
      </div>

      <div className="grid gap-5 px-8 pb-8 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink-50">
              Derniers messages
            </h2>
            <Link
              href="/dashboard/messages"
              className="text-xs text-mint-300 hover:text-mint-400"
            >
              Tout voir
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="mt-4 text-sm text-ink-400">
              Aucun message pour le moment.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col divide-y divide-ink-700">
              {recentMessages.map((m) => (
                <li key={m._id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink-100">
                      {m.nom} — <span className="text-ink-400">{m.email}</span>
                    </p>
                    <p className="truncate text-xs text-ink-400">
                      {m.sujet || m.message}
                    </p>
                  </div>
                  {!m.lu && (
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-mint-300" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="flex flex-col gap-3 p-6">
          <h2 className="font-display text-base font-semibold text-ink-50">
            Actions rapides
          </h2>
          <Link
            href="/dashboard/projets/nouveau"
            className="rounded-md border border-ink-500 px-4 py-2.5 text-center text-sm text-ink-100 hover:border-mint-300 hover:text-mint-300"
          >
            + Nouveau projet
          </Link>
          <Link
            href="/dashboard/profil"
            className="rounded-md border border-ink-500 px-4 py-2.5 text-center text-sm text-ink-100 hover:border-mint-300 hover:text-mint-300"
          >
            Modifier le profil
          </Link>
          <Link
            href="/dashboard/experiences"
            className="rounded-md border border-ink-500 px-4 py-2.5 text-center text-sm text-ink-100 hover:border-mint-300 hover:text-mint-300"
          >
            Gérer les expériences
          </Link>
        </Card>
      </div>
    </div>
  );
}
