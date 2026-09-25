"use client";

import { useState } from "react";
import { Plus, Trash2, Save, X } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const types = ["Freelance", "Stage", "Alternance", "CDI", "Autre"];

const emptyExperience = {
  poste: "",
  entreprise: "",
  periode: "",
  type: "Freelance",
  lieu: "",
  points: "",
  technologies: "",
};

function toFormState(exp) {
  return {
    poste: exp.poste || "",
    entreprise: exp.entreprise || "",
    periode: exp.periode || "",
    type: exp.type || "Freelance",
    lieu: exp.lieu || "",
    points: (exp.points || []).join("\n"),
    technologies: (exp.technologies || []).join(", "),
  };
}

export default function ExperiencesManager({ initialExperiences }) {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [selectedId, setSelectedId] = useState(null); // null = liste, "new" = création
  const [form, setForm] = useState(emptyExperience);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function openNew() {
    setForm(emptyExperience);
    setSelectedId("new");
  }

  function openEdit(exp) {
    setForm(toFormState(exp));
    setSelectedId(exp._id);
  }

  function closePanel() {
    setSelectedId(null);
    setError("");
  }

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      poste: form.poste,
      entreprise: form.entreprise,
      periode: form.periode,
      type: form.type,
      lieu: form.lieu,
      points: form.points.split("\n").map((p) => p.trim()).filter(Boolean),
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (selectedId === "new") {
        const res = await fetch("/api/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, ordre: experiences.length }),
        });
        if (!res.ok) throw new Error("Échec de la création.");
        const created = await res.json();
        setExperiences((prev) => [...prev, created]);
      } else {
        const res = await fetch(`/api/experiences/${selectedId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Échec de l'enregistrement.");
        const updated = await res.json();
        setExperiences((prev) =>
          prev.map((exp) => (exp._id === selectedId ? updated : exp))
        );
      }
      closePanel();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette expérience ?")) return;
    setExperiences((prev) => prev.filter((exp) => exp._id !== id));
    await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    if (selectedId === id) closePanel();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <Card className="h-fit p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-ink-50">
            Expériences ({experiences.length})
          </h3>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-1.5 text-xs text-mint-300 hover:text-mint-400"
          >
            <Plus size={14} />
            Ajouter
          </button>
        </div>

        <ul className="mt-4 flex flex-col divide-y divide-ink-700">
          {experiences.map((exp) => (
            <li
              key={exp._id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <button
                onClick={() => openEdit(exp)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate text-sm text-ink-100">{exp.poste}</p>
                <p className="truncate text-xs text-ink-400">
                  {exp.entreprise} · {exp.periode}
                </p>
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                className="flex-shrink-0 rounded-md border border-ink-600 p-2 text-ink-400 hover:border-red-400/50 hover:text-red-400"
                aria-label="Supprimer"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>

        {experiences.length === 0 && (
          <p className="mt-4 text-sm text-ink-400">
            Aucune expérience pour le moment.
          </p>
        )}
      </Card>

      {selectedId && (
        <Card className="h-fit p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-ink-50">
              {selectedId === "new" ? "Nouvelle expérience" : "Modifier"}
            </h3>
            <button
              onClick={closePanel}
              className="text-ink-400 hover:text-ink-100"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-4 flex flex-col gap-4">
            <Input
              id="poste"
              label="Poste"
              value={form.poste}
              onChange={(e) => update("poste", e.target.value)}
              required
            />
            <Input
              id="entreprise"
              label="Entreprise"
              value={form.entreprise}
              onChange={(e) => update("entreprise", e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="periode"
                label="Période"
                placeholder="2024 – Présent"
                value={form.periode}
                onChange={(e) => update("periode", e.target.value)}
                required
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-ink-300">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => update("type", e.target.value)}
                  className="rounded-md border border-ink-500 bg-ink-900 px-3.5 py-2.5 text-sm text-ink-50 focus:border-mint-300 focus:outline-none"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Input
              id="lieu"
              label="Lieu"
              value={form.lieu}
              onChange={(e) => update("lieu", e.target.value)}
            />
            <Textarea
              id="points"
              label="Points clés (un par ligne)"
              rows={5}
              value={form.points}
              onChange={(e) => update("points", e.target.value)}
            />
            <Input
              id="technologies"
              label="Technologies (séparées par des virgules)"
              value={form.technologies}
              onChange={(e) => update("technologies", e.target.value)}
            />

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="submit" disabled={saving} className="self-start">
              <Save size={16} />
              {saving ? "Enregistrement…" : "Enregistrer"}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
