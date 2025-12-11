import { cn } from "../../lib/utils";

export function TagComponent(props: {
  name?: string;
  color?: "red" | "blue" | "green" | "yellow" | "purple" | "gray" | "gray";
  children?: React.ReactNode;
  className?: string;
}) {
  const { name, color = "gray" } = props;

  let colorDark = "bg-gray-400/25";
  let colorLight = "text-gray-400";

  if (color) {
    switch (color) {
      case "red":
        colorDark = "bg-red-400/25";
        colorLight = "text-red-400";
        break;
      case "blue":
        colorDark = "bg-blue-400/25";
        colorLight = "text-blue-400";
        break;
      case "green":
        colorDark = "bg-green-400/25";
        colorLight = "text-green-400";
        break;
      case "yellow":
        colorDark = "bg-yellow-400/25";
        colorLight = "text-yellow-400";
        break;
      case "purple":
        colorDark = "bg-purple-400/25";
        colorLight = "text-purple-400";
        break;
      case "gray":
        colorDark = "bg-gray-400/25";
        colorLight = "text-gray-400";
        break;
    }
  }

  return (
    <div
      className={cn(
        `inline-block rounded-full px-2 py-0.5 ${colorLight} ${colorDark} my-0 mr-1.5 h-[25px] overflow-hidden border border-current/10 text-sm`,
        props.className,
      )}
    >
      {name ? name : props.children}
    </div>
  );
}

export function TagComponentHoverable(props: {
  name?: string;
  color?: "red" | "blue" | "green" | "yellow" | "purple" | "gray" | "gray";
  children?: React.ReactNode;
  className?: string;
}) {
  return TagComponent({
    ...props,
    className: cn(
      "hover:border-current/25 hover:bg-current/33 cursor-pointer",
      props.className,
    ),
  });
}
