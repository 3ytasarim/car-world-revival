import * as React from "react";
import { cn } from "@/lib/utils";

type Button3DProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
};

/**
 * Pushable 3D button: a colored "shadow" layer sits behind the face,
 * the face translates down on hover/press for a tactile effect.
 */
export function Button3D({
  variant = "primary",
  className,
  children,
  ...props
}: Button3DProps) {
  const isPrimary = variant === "primary";
  return (
    <a
      {...props}
      className={cn(
        "group relative inline-block cursor-pointer rounded-full border-none bg-transparent p-0 outline-offset-4",
        className,
      )}
    >
      {/* shadow */}
      <span className="absolute inset-0 translate-y-[2px] rounded-full bg-black/25 blur-[1px] transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:translate-y-[4px] group-active:translate-y-[1px]" />
      {/* edge */}
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          isPrimary
            ? "bg-[linear-gradient(to_left,hsl(212_52%_28%)_0%,hsl(212_52%_40%)_8%,hsl(212_52%_40%)_92%,hsl(212_52%_28%)_100%)]"
            : "bg-[linear-gradient(to_left,hsl(220_14%_70%)_0%,hsl(220_14%_84%)_8%,hsl(220_14%_84%)_92%,hsl(220_14%_70%)_100%)]",
        )}
      />
      {/* face */}
      <span
        className={cn(
          "relative flex -translate-y-[6px] items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:-translate-y-[8px] group-active:-translate-y-[2px]",
          isPrimary
            ? "bg-brand-orange text-brand-orange-foreground"
            : "border-[1.5px] border-black/10 bg-white text-gray-800",
        )}
      >
        {children}
      </span>
    </a>
  );
}

export default Button3D;
