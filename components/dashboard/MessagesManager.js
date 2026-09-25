"use client";

import { useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessagesManager({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [openId, setOpenId] = useState(null);

  async function toggleRead(msg) {
    const updated = { ...msg, lu: !msg.lu };
    setMessages((prev) => prev.map((m) => (m._id === msg._id ? updated : m)));
    await fetch(`/api/messages/${msg._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lu: updated.lu }),
    });
  }

  async function handleOpen(msg) {
    setOpenId(openId === msg._id ? null : msg._id);
    if (!msg.lu) {
      await toggleRead(msg);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce message ?")) return;
    setMessages((prev) => prev.filter((m) => m._id !== id));
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
  }

  if (messages.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-ink-400">
        Aucun message reçu pour le moment.
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg) => (
        <Card
          key={msg._id}
          className={`p-5 transition-colors ${
            !msg.lu ? "border-mint-400/40" : ""
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <button
              onClick={() => handleOpen(msg)}
              className="min-w-0 flex-1 text-left"
            >
              <div className="flex items-center gap-2.5">
                {msg.lu ? (
                  <MailOpen size={15} className="flex-shrink-0 text-ink-400" />
                ) : (
                  <Mail size={15} className="flex-shrink-0 text-mint-300" />
                )}
                <p className="truncate text-sm font-medium text-ink-50">
                  {msg.nom}
                </p>
                <span className="truncate text-xs text-ink-400">
                  {msg.email}
                </span>
                {!msg.lu && <Badge tone="mint">Nouveau</Badge>}
              </div>
              <p className="mt-1.5 truncate text-sm text-ink-300">
                {msg.sujet || "(Sans sujet)"}
              </p>
            </button>

            <div className="flex items-center gap-4">
              <span className="whitespace-nowrap text-xs text-ink-500">
                {formatDate(msg.createdAt)}
              </span>
              <button
                onClick={() => handleDelete(msg._id)}
                className="rounded-md border border-ink-600 p-2 text-ink-400 hover:border-red-400/50 hover:text-red-400"
                aria-label="Supprimer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {openId === msg._id && (
            <p className="mt-4 whitespace-pre-line rounded-lg border border-ink-700 bg-ink-900/60 p-4 text-sm leading-relaxed text-ink-200">
              {msg.message}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
