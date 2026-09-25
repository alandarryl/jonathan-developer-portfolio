import Link from "next/link";
import clsx from "clsx";

const variants = {
  primary:
    "bg-mint-300 text-ink-900 hover:bg-mint-400 focus-visible:outline-mint-300",
  outline:
    "border border-ink-500 text-ink-100 hover:border-mint-300 hover:text-mint-300",
  ghost: "text-ink-200 hover:text-mint-300",
};

/**
 * Bouton / lien réutilisable. Passe `href` pour rendre un <Link>,
 * sinon rend un <button>.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
  ...rest
}) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
