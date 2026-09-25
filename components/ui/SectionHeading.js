/**
 * En-tête de section : un index à deux chiffres (utile ici car les sections
 * du site suivent un ordre de lecture réel) + un titre + un sous-texte optionnel.
 */
export default function SectionHeading({ index, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <div
        className={`flex items-center gap-3 text-mint-300 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && <span className="font-mono text-sm">{index}</span>}
        <span className="h-px w-8 bg-mint-400/50" />
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold text-ink-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-ink-300">{description}</p>
      )}
    </div>
  );
}
