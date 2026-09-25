"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const categories = [
  "Frontend",
  "Backend",
  "Data & IA",
  "Outils & Méthodologie",
  "Autre",
];

const emptyNew = { nom: "", categorie: "Frontend", niveau: 3 };

export default function SkillsManager({ initialSkills }) {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState(emptyNew);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");

  async function handleAdd(e) {
    e.preventDefault();
    if (!newSkill.nom.trim()) return;
    setError("");
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newSkill, ordre: skills.length }),
      });
      if (!res.ok) throw new Error("Échec de l'ajout.");
      const created = await res.json();
      setSkills((prev) => [...prev, created]);
      setNewSkill(emptyNew);
    } catch (err) {
      setError(err.message);
    }
  }

  function updateLocal(id, key, value) {
    setSkills((prev) =>
      prev.map((s) => (s._id === id ? { ...s, [key]: value } : s))
    );
  }

  async function handleSave(skill) {
    setSavingId(skill._id);
    setError("");
    try {
      const res = await fetch(`/api/skills/${skill._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: skill.nom,
          categorie: skill.categorie,
          niveau: Number(skill.niveau),
        }),
      });
      if (!res.ok) throw new Error("Échec de l'enregistrement.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette compétence ?")) return;
    setSkills((prev) => prev.filter((s) => s._id !== id));
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
  }

  return (
    <div className="flex flex-col gap-8">
      <Card className="p-6">
        <h3 className="font-display text-sm font-semibold text-ink-50">
          Ajouter une compétence
        </h3>
        <form
          onSubmit={handleAdd}
          className="mt-4 grid gap-4 sm:grid-cols-[1fr_180px_120px_auto] sm:items-end"
        >
          <Input
            id="new-nom"
            label="Nom"
            placeholder="Ex : Next.js"
            value={newSkill.nom}
            onChange={(e) => setNewSkill((p) => ({ ...p, nom: e.target.value }))}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-ink-300">Catégorie</label>
            <select
              value={newSkill.categorie}
              onChange={(e) =>
                setNewSkill((p) => ({ ...p, categorie: e.target.value }))
              }
              className="rounded-md border border-ink-500 bg-ink-900 px-3.5 py-2.5 text-sm text-ink-50 focus:border-mint-300 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <Input
            id="new-niveau"
            type="number"
            min={1}
            max={5}
            label="Niveau (1-5)"
            value={newSkill.niveau}
            onChange={(e) =>
              setNewSkill((p) => ({ ...p, niveau: e.target.value }))
            }
          />
          <Button type="submit">
            <Plus size={16} />
            Ajouter
          </Button>
        </form>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </Card>

      <Card className="overflow-x-auto p-6">
        <h3 className="font-display text-sm font-semibold text-ink-50">
          Toutes les compétences ({skills.length})
        </h3>
        <table className="mt-4 w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-700 text-left text-xs text-ink-400">
              <th className="pb-3 pr-4 font-normal">Nom</th>
              <th className="pb-3 pr-4 font-normal">Catégorie</th>
              <th className="pb-3 pr-4 font-normal">Niveau</th>
              <th className="pb-3 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id} className="border-b border-ink-700/60">
                <td className="py-3 pr-4">
                  <input
                    value={skill.nom}
                    onChange={(e) =>
                      updateLocal(skill._id, "nom", e.target.value)
                    }
                    className="w-full rounded-md border border-transparent bg-transparent px-2 py-1.5 text-ink-100 hover:border-ink-600 focus:border-mint-300 focus:outline-none"
                  />
                </td>
                <td className="py-3 pr-4">
                  <select
                    value={skill.categorie}
                    onChange={(e) =>
                      updateLocal(skill._id, "categorie", e.target.value)
                    }
                    className="rounded-md border border-transparent bg-transparent px-2 py-1.5 text-ink-100 hover:border-ink-600 focus:border-mint-300 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-ink-800">
                        {c}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 pr-4">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={skill.niveau}
                    onChange={(e) =>
                      updateLocal(skill._id, "niveau", e.target.value)
                    }
                    className="w-16 rounded-md border border-transparent bg-transparent px-2 py-1.5 text-ink-100 hover:border-ink-600 focus:border-mint-300 focus:outline-none"
                  />
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSave(skill)}
                      disabled={savingId === skill._id}
                      className="rounded-md border border-ink-600 p-2 text-ink-300 hover:border-mint-300 hover:text-mint-300"
                      aria-label="Enregistrer"
                    >
                      <Save size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="rounded-md border border-ink-600 p-2 text-ink-300 hover:border-red-400/50 hover:text-red-400"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {skills.length === 0 && (
          <p className="mt-4 text-sm text-ink-400">Aucune compétence pour le moment.</p>
        )}
      </Card>
    </div>
  );
}
