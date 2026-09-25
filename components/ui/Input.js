import clsx from "clsx";

export default function Input({ label, id, className, ...rest }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm text-ink-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          "rounded-md border border-ink-500 bg-ink-900 px-3.5 py-2.5 text-sm text-ink-50 placeholder:text-ink-400",
          "focus:border-mint-300 focus:outline-none",
          className
        )}
        {...rest}
      />
    </div>
  );
}
