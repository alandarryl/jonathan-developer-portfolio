import clsx from "clsx";

export default function Card({ children, className, as: Tag = "div" }) {
  return (
    <Tag
      className={clsx(
        "rounded-xl border border-ink-600 bg-ink-800/60 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </Tag>
  );
}
