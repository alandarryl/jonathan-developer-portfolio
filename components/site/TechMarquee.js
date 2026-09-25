"use client";

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "C# / .NET",
  "Python",
  "MongoDB",
  "PostgreSQL",
  "n8n",
  "Docker",
];

export default function TechMarquee() {
  const track = [...stack, ...stack];

  return (
    <div className="relative mt-16 overflow-hidden border-y border-ink-700/70 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-900 to-transparent" />

      <div className="flex w-max animate-[scroll_28s_linear_infinite] gap-10">
        {track.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-mono text-sm text-ink-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
