"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Check } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const emptyFormation = { diplome: "", etablissement: "", periode: "" };

export default function ProfileForm({ initialProfile }) {
  const [form, setForm] = useState({
    nomComplet: initialProfile?.nomComplet || "",
    titre: initialProfile?.titre || "",
    sousTitre: initialProfile?.sousTitre || "",
    accrocheHero: initialProfile?.accrocheHero || "",
    bio: initialProfile?.bio || "",
    localisation: initialProfile?.localisation || "",
    email: initialProfile?.email || "",
    telephone: initialProfile?.telephone || "",
    disponibilite: initialProfile?.disponibilite || "",
    avatarUrl: initialProfile?.avatarUrl || "",
    cvUrl: initialProfile?.cvUrl || "",
    liens: {
      linkedin: initialProfile?.liens?.linkedin || "",
      github: initialProfile?.liens?.github || "",
      portfolio: initialProfile?.liens?.portfolio || "",
    },
    formations: initialProfile?.formations?.length
      ? initialProfile.formations
      : [emptyFormation],
    langues: (initialProfile?.langues || []).join(", "),
    interets: (initialProfile?.interets || []).join(", "),
  });
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateLien(key, value) {
    setForm((prev) => ({ ...prev, liens: { ...prev.liens, [key]: value } }));
  }

  function updateFormation(index, key, value) {
    setForm((prev) => {
      const formations = [...prev.formations];
      formations[index] = { ...formations[index], [key]: value };
      return { ...prev, formations };
    });
  }

  function addFormation() {
    setForm((prev) => ({
      ...prev,
      formations: [...prev.formations, { ...emptyFormation }],
    }));
  }

  function removeFormation(index) {
    setForm((prev) => ({
      ...prev,
      formations: prev.formations.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");

    const payload = {
      ...form,
      formations: form.formations.filter((f) => f.diplome.trim()),
      langues: form.langues
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      interets: form.interets
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Échec de l'enregistrement.");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-8">
      <Card className="grid gap-5 p-6 sm:grid-cols-2">
        <Input
          id="nomComplet"
          label="Nom complet"
          value={form.nomComplet}
          onChange={(e) => update("nomComplet", e.target.value)}
        />
        <Input
          id="titre"
          label="Titre / poste recherché"
          value={form.titre}
          onChange={(e) => update("titre", e.target.value)}
        />
        <Input
          id="sousTitre"
          label="Sous-titre"
          className="sm:col-span-2"
          value={form.sousTitre}
          onChange={(e) => update("sousTitre", e.target.value)}
        />
        <Textarea
          id="accrocheHero"
          label="Accroche (page d'accueil)"
          className="sm:col-span-2"
          rows={3}
          value={form.accrocheHero}
          onChange={(e) => update("accrocheHero", e.target.value)}
        />
        <Textarea
          id="bio"
          label="Bio complète (page à propos)"
          className="sm:col-span-2"
          rows={6}
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
        />
      </Card>

      <Card className="grid gap-5 p-6 sm:grid-cols-2">
        <Input
          id="localisation"
          label="Localisation"
          value={form.localisation}
          onChange={(e) => update("localisation", e.target.value)}
        />
        <Input
          id="disponibilite"
          label="Disponibilité"
          value={form.disponibilite}
          onChange={(e) => update("disponibilite", e.target.value)}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <Input
          id="telephone"
          label="Téléphone"
          value={form.telephone}
          onChange={(e) => update("telephone", e.target.value)}
        />
        <Input
          id="avatarUrl"
          label="Lien photo de profil"
          placeholder="https://…"
          className="sm:col-span-2"
          value={form.avatarUrl}
          onChange={(e) => update("avatarUrl", e.target.value)}
        />
        <Input
          id="cvUrl"
          label="Lien vers le CV (PDF)"
          placeholder="https://…"
          className="sm:col-span-2"
          value={form.cvUrl}
          onChange={(e) => update("cvUrl", e.target.value)}
        />
      </Card>

      <Card className="grid gap-5 p-6 sm:grid-cols-3">
        <Input
          id="linkedin"
          label="LinkedIn"
          placeholder="https://linkedin.com/in/…"
          value={form.liens.linkedin}
          onChange={(e) => updateLien("linkedin", e.target.value)}
        />
        <Input
          id="github"
          label="GitHub"
          placeholder="https://github.com/…"
          value={form.liens.github}
          onChange={(e) => updateLien("github", e.target.value)}
        />
        <Input
          id="portfolio"
          label="Autre lien"
          placeholder="https://…"
          value={form.liens.portfolio}
          onChange={(e) => updateLien("portfolio", e.target.value)}
        />
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-ink-50">
            Formation
          </h3>
          <button
            type="button"
            onClick={addFormation}
            className="inline-flex items-center gap-1.5 text-xs text-mint-300 hover:text-mint-400"
          >
            <Plus size={14} />
            Ajouter
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {form.formations.map((f, i) => (
            <div
              key={i}
              className="grid gap-3 rounded-lg border border-ink-600 p-4 sm:grid-cols-[1fr_1fr_120px_auto]"
            >
              <Input
                id={`diplome-${i}`}
                label="Diplôme"
                value={f.diplome}
                onChange={(e) => updateFormation(i, "diplome", e.target.value)}
              />
              <Input
                id={`etablissement-${i}`}
                label="Établissement"
                value={f.etablissement}
                onChange={(e) =>
                  updateFormation(i, "etablissement", e.target.value)
                }
              />
              <Input
                id={`periode-${i}`}
                label="Période"
                value={f.periode}
                onChange={(e) => updateFormation(i, "periode", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeFormation(i)}
                className="mt-6 flex h-fit items-center justify-center rounded-md border border-ink-600 p-2.5 text-ink-400 hover:border-red-400/50 hover:text-red-400"
                aria-label="Supprimer cette formation"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="grid gap-5 p-6 sm:grid-cols-2">
        <Input
          id="langues"
          label="Langues (séparées par des virgules)"
          value={form.langues}
          onChange={(e) => update("langues", e.target.value)}
        />
        <Input
          id="interets"
          label="Centres d'intérêt (séparés par des virgules)"
          value={form.interets}
          onChange={(e) => update("interets", e.target.value)}
        />
      </Card>

      {status === "error" && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "saving"}>
          {status === "saving" ? (
            "Enregistrement…"
          ) : status === "saved" ? (
            <>
              <Check size={16} />
              Enregistré
            </>
          ) : (
            <>
              <Save size={16} />
              Enregistrer
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
