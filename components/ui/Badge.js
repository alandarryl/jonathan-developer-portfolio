import clsx from "clsx";

/** Étiquette pour les technologies / catégories, en police mono (identité "code"). */
export default function Badge({ children, className, tone = "default" }) {
  const tones = {
    default: "border-ink-500 text-ink-200",
    mint: "border-mint-400/40 text-mint-300 bg-mint-400/5",
    amber: "border-amber-400/40 text-amber-400 bg-amber-400/5",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded border px-2.5 py-1 font-mono text-xs",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
