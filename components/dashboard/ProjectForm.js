"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const statuses = ["Terminé", "En cours", "Archivé"];

function toFormState(project) {
  return {
    titre: project?.titre || "",
    slug: project?.slug || "",
    resume: project?.resume || "",
    description: project?.description || "",
    imageUrl: project?.imageUrl || "",
    galerie: (project?.galerie || []).join("\n"),
    technologies: (project?.technologies || []).join(", "),
    points: (project?.points || []).join("\n"),
    lienGithub: project?.lienGithub || "",
    lienDemo: project?.lienDemo || "",
    enVedette: project?.enVedette || false,
    statut: project?.statut || "Terminé",
  };
}

export default function ProjectForm({ project }) {
  const router = useRouter();
  const isEditing = Boolean(project);
  const [form, setForm] = useState(toFormState(project));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      titre: form.titre,
      slug: form.slug.trim() || undefined,
      resume: form.resume,
      description: form.description,
      imageUrl: form.imageUrl,
      galerie: form.galerie.split("\n").map((s) => s.trim()).filter(Boolean),
      technologies: form.technologies
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      points: form.points.split("\n").map((s) => s.trim()).filter(Boolean),
      lienGithub: form.lienGithub,
      lienDemo: form.lienDemo,
      enVedette: form.enVedette,
      statut: form.statut,
    };

    try {
      const url = isEditing ? `/api/projects/${project._id}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Échec de l'enregistrement.");
      }
      router.push("/dashboard/projets");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Supprimer définitivement ce projet ?")) return;
    setDeleting(true);
    await fetch(`/api/projects/${project._id}`, { method: "DELETE" });
    router.push("/dashboard/projets");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6">
      <Card className="grid gap-5 p-6 sm:grid-cols-2">
        <Input
          id="titre"
          label="Titre"
          value={form.titre}
          onChange={(e) => update("titre", e.target.value)}
          required
        />
        <Input
          id="slug"
          label="Slug (URL) — laisser vide pour générer automatiquement"
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
        />
        <Textarea
          id="resume"
          label="Résumé court (affiché sur les cartes projet)"
          className="sm:col-span-2"
          rows={2}
          value={form.resume}
          onChange={(e) => update("resume", e.target.value)}
          required
        />
        <Textarea
          id="description"
          label="Description complète"
          className="sm:col-span-2"
          rows={6}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </Card>

      <Card className="grid gap-5 p-6 sm:grid-cols-2">
        <Input
          id="imageUrl"
          label="Image principale (lien)"
          placeholder="https://…"
          className="sm:col-span-2"
          value={form.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
        />
        <Textarea
          id="galerie"
          label="Galerie — un lien d'image par ligne"
          className="sm:col-span-2"
          rows={3}
          value={form.galerie}
          onChange={(e) => update("galerie", e.target.value)}
        />
      </Card>

      <Card className="grid gap-5 p-6 sm:grid-cols-2">
        <Input
          id="technologies"
          label="Technologies (séparées par des virgules)"
          className="sm:col-span-2"
          value={form.technologies}
          onChange={(e) => update("technologies", e.target.value)}
        />
        <Textarea
          id="points"
          label="Points clés — un par ligne"
          className="sm:col-span-2"
          rows={4}
          value={form.points}
          onChange={(e) => update("points", e.target.value)}
        />
        <Input
          id="lienGithub"
          label="Lien GitHub"
          placeholder="https://github.com/…"
          value={form.lienGithub}
          onChange={(e) => update("lienGithub", e.target.value)}
        />
        <Input
          id="lienDemo"
          label="Lien démo / live"
          placeholder="https://…"
          value={form.lienDemo}
          onChange={(e) => update("lienDemo", e.target.value)}
        />
      </Card>

      <Card className="flex flex-wrap items-center gap-6 p-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink-300">Statut</label>
          <select
            value={form.statut}
            onChange={(e) => update("statut", e.target.value)}
            className="rounded-md border border-ink-500 bg-ink-900 px-3.5 py-2.5 text-sm text-ink-50 focus:border-mint-300 focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2.5 text-sm text-ink-200">
          <input
            type="checkbox"
            checked={form.enVedette}
            onChange={(e) => update("enVedette", e.target.checked)}
            className="h-4 w-4 rounded border-ink-500 bg-ink-900 accent-mint-300"
          />
          Mettre en avant sur la page d'accueil
        </label>
      </Card>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>
          <Save size={16} />
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-red-400"
          >
            <Trash2 size={15} />
            {deleting ? "Suppression…" : "Supprimer ce projet"}
          </button>
        )}
      </div>
    </form>
  );
}
