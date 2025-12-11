import { cn } from "../../lib/utils";

export function RoundedButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full border border-text/20 px-4 py-1.5 font-semibold text-text/80 text-xs uppercase tracking-wide transition hover:border-text/40",
        className,
      )}
    >
      {children}
    </button>
  );
}
