export default function Topbar({ title, description, actions }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink-700 px-8 py-6">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink-50">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-ink-400">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
