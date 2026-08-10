import * as React from "react";
import { cn } from "@/lib/utils";

type Button3DVariant = "primary" | "secondary" | "whatsapp" | "navy";

type Button3DCommonProps = {
  variant?: Button3DVariant;
  className?: string;
  children?: React.ReactNode;
};

type Button3DAsButton = Button3DCommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    as: "button";
  };

type Button3DAsAnchor = Button3DCommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    as?: "a";
  };

type Button3DProps = Button3DAsButton | Button3DAsAnchor;

const edgeStyles: Record<Button3DVariant, string> = {
  primary:
    "bg-[linear-gradient(to_left,hsl(212_52%_28%)_0%,hsl(212_52%_40%)_8%,hsl(212_52%_40%)_92%,hsl(212_52%_28%)_100%)]",
  secondary:
    "bg-[linear-gradient(to_left,hsl(220_14%_70%)_0%,hsl(220_14%_84%)_8%,hsl(220_14%_84%)_92%,hsl(220_14%_70%)_100%)]",
  whatsapp:
    "bg-[linear-gradient(to_left,hsl(147_64%_28%)_0%,hsl(147_64%_38%)_8%,hsl(147_64%_38%)_92%,hsl(147_64%_28%)_100%)]",
  navy: "bg-[linear-gradient(to_left,hsl(215_45%_10%)_0%,hsl(215_45%_20%)_8%,hsl(215_45%_20%)_92%,hsl(215_45%_10%)_100%)]",
};

const faceStyles: Record<Button3DVariant, string> = {
  primary: "bg-brand-orange text-brand-orange-foreground",
  secondary: "border-[1.5px] border-black/10 bg-white text-gray-800",
  whatsapp: "bg-[#25D366] text-white",
  navy: "bg-brand-navy text-brand-navy-foreground",
};

/**
 * Pushable 3D button: a colored "shadow" layer sits behind the face,
 * the face translates down on hover/press for a tactile effect.
 * Renders as an <a> by default, or as a <button> (e.g. for form submits)
 * via `as="button"`.
 */
export function Button3D({ variant = "primary", className, children, as, ...props }: Button3DProps) {
  const shared = (
    <>
      {/* shadow */}
      <span className="absolute inset-0 translate-y-[2px] rounded-full bg-black/25 blur-[1px] transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:translate-y-[4px] group-active:translate-y-[1px]" />
      {/* edge */}
      <span className={cn("absolute inset-0 rounded-full", edgeStyles[variant])} />
      {/* face */}
      <span
        className={cn(
          "relative flex -translate-y-[6px] items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:-translate-y-[8px] group-active:-translate-y-[2px] group-disabled:translate-y-0",
          faceStyles[variant],
        )}
      >
        {children}
      </span>
    </>
  );

  const wrapperClassName = cn(
    "group relative inline-block cursor-pointer rounded-full border-none bg-transparent p-0 outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60",
    className,
  );

  if (as === "button") {
    const buttonProps = props as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;
    return (
      <button {...buttonProps} className={wrapperClassName}>
        {shared}
      </button>
    );
  }

  const anchorProps = props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;
  return (
    <a {...anchorProps} className={wrapperClassName}>
      {shared}
    </a>
  );
}

export default Button3D;
