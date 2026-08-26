import * as React from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

// Adapted from 21st.dev (lavikatiyar/card-5) — kept the gradient-card +
// bookmark-shaped icon tab + dot-pattern look, dropped the metric/CTA
// footer (not needed for fact-based trust points) and swapped the stock
// green/violet/orange theme presets for the site's own navy/blue palette.
export interface TrustCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

// Kein `scale` in der Entrance-Animation: bei sehr kurzer Sichtbarkeit greift
// `whileInView` manchmal nicht rechtzeitig, wodurch die Karte dauerhaft bei
// scale(0.95) hängen bleibt — das versetzt ihre Kanten um ein paar Pixel und
// bringt die Reihe aus der exakten Flucht mit dem Video darunter.
const cardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export const TrustCard = React.forwardRef<HTMLDivElement, TrustCardProps>(
  ({ title, description, icon, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("relative w-full overflow-hidden rounded-2xl p-6 shadow-lg", className)}
        style={{
          color: "#fff",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, hsla(0,0%,100%,0.14) 1px, transparent 0),
            linear-gradient(to bottom right, #5088C8, #6FA0D8)
          `,
          backgroundSize: "0.5rem 0.5rem, 100% 100%",
        }}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Lesezeichen-Form mit Icon */}
        <div className="absolute top-0 right-6 h-16 w-12 bg-white/95 [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_50%_75%,_0%_100%)]">
          <div className="absolute inset-0 flex items-center justify-center text-brand-orange">{icon}</div>
        </div>

        <motion.h3 variants={itemVariants} className="mt-2 pr-16 text-xl font-bold tracking-tight">
          {title}
        </motion.h3>
        <motion.p variants={itemVariants} className="mt-1.5 text-sm text-white/85">
          {description}
        </motion.p>
      </motion.div>
    );
  },
);

TrustCard.displayName = "TrustCard";

export default TrustCard;
