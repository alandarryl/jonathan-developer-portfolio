"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const initialState = { nom: "", email: "", sujet: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setStatus("sent");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-mint-400/30 bg-mint-400/5 p-8">
        <CheckCircle2 className="text-mint-300" size={28} />
        <h3 className="font-display text-lg font-semibold text-ink-50">
          Message envoyé
        </h3>
        <p className="text-sm text-ink-300">
          Merci, ton message m'est bien parvenu. Je te réponds dès que possible.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="nom"
          name="nom"
          label="Nom"
          placeholder="Ton nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="ton@email.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        id="sujet"
        name="sujet"
        label="Sujet"
        placeholder="Proposition d'alternance, mission freelance…"
        value={form.sujet}
        onChange={handleChange}
      />

      <Textarea
        id="message"
        name="message"
        label="Message"
        placeholder="Décris ton besoin ou ta proposition…"
        rows={6}
        value={form.message}
        onChange={handleChange}
        required
      />

      {status === "error" && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <Button type="submit" disabled={status === "sending"} className="self-start">
        {status === "sending" ? "Envoi…" : "Envoyer le message"}
        <Send size={16} />
      </Button>
    </form>
  );
}
