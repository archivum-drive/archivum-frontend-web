import { Link as RouterLink } from "@tanstack/react-router";

export default function Link({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RouterLink to={to} className={`${className} underline`}>
      {children}
    </RouterLink>
  );
}
