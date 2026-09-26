"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Connexion impossible.");
      }

      const dest = searchParams.get("from") || "/dashboard";
      router.push(dest);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blueprint px-6">
      <Card className="w-full max-w-sm p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-mint-400/10 p-2.5 text-mint-300">
            <Lock size={18} />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-ink-50">
              Dashboard
            </h1>
            <p className="text-xs text-ink-400">Accès administrateur</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="password"
            type="password"
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? "Connexion…" : "Se connecter"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-blueprint text-ink-400">
        Chargement...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}