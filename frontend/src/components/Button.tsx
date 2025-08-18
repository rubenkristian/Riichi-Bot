import { JSX } from "solid-js";

type ButtonProps = {
  children: JSX.Element;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  class?: string; // extra classes
};

export default function Button(props: ButtonProps) {
  // Base styles
  const base =
    "rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Variant styles
  const variants: Record<string, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    outline:
      "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:ring-gray-300",
  };

  // Size styles
  const sizes: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClass = variants[props.variant || "primary"];
  const sizeClass = sizes[props.size || "md"];

  return (
    <button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      class={`${base} ${variantClass} ${sizeClass} ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${props.class || ""}`}
    >
      {props.children}
    </button>
  );
}
