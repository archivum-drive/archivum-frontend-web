import { PlusIcon } from "lucide-react";
import { cn } from "../../lib/utils";

type TagColor = "red" | "blue" | "green" | "yellow" | "purple" | "gray";

const colorClasses: Record<TagColor, { bg: string; text: string }> = {
  red: { bg: "bg-red-400/25", text: "text-red-400" },
  blue: { bg: "bg-blue-400/25", text: "text-blue-400" },
  green: { bg: "bg-green-400/25", text: "text-green-400" },
  yellow: { bg: "bg-yellow-400/25", text: "text-yellow-400" },
  purple: { bg: "bg-purple-400/25", text: "text-purple-400" },
  gray: { bg: "bg-gray-400/25", text: "text-gray-400" },
};

const baseTagClasses =
  "inline-block rounded-full px-2 py-0.5 my-0 mr-1.5 h-[25px] overflow-hidden border border-current/10 text-sm";

function buildTagClasses(
  color: TagColor,
  className?: string,
  hoverable = false,
) {
  const { bg, text } = colorClasses[color] ?? colorClasses.gray;
  const hoverClasses = hoverable
    ? " cursor-pointer hover:border-current/25 hover:bg-current/33"
    : "";
  return cn(`${baseTagClasses} ${text} ${bg}${hoverClasses}`, className);
}

export function TagComponent(props: {
  name: string;
  color?: TagColor;
  className?: string;
}) {
  const { name, color = "gray", className } = props;
  return <div className={buildTagClasses(color, className)}>{name}</div>;
}

export function TagComponentHoverable(
  props: {
    name: string;
    color?: TagColor;
    className?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { name, color = "gray", className, ...rest } = props;
  return (
    <button className={buildTagClasses(color, className, true)} {...rest}>
      {name}
    </button>
  );
}

export function TagSkeleton(props: { className?: string }) {
  return (
    <div
      className={cn(
        "my-0 mr-1.5 inline-block aspect-square h-[25px] cursor-pointer overflow-hidden rounded-full border border-current/10 bg-transparent p-0 px-2 py-0.5 text-gray-400 text-sm hover:border-current/25 hover:bg-white/5",
        props.className,
      )}
    >
      <div className="flex h-full w-full items-center justify-center">
        <PlusIcon />
      </div>
    </div>
  );
}
