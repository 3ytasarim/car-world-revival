// Animated mesh gradient in the site's blue palette, dimmed by default.
// Based on 21st.dev (moazamtrade/background-shader).
import { MeshGradient } from "@paper-design/shaders-react";

export function BackgroundShader({
  className = "absolute inset-0",
  opacity = 0.35,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div className={className} style={{ opacity }}>
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        distortion={0.8}
        swirl={0.1}
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={0.4}
        colors={["#131F35", "#1B3A63", "#5088C8", "#8FB8E8"]}
      />
    </div>
  );
}

export default BackgroundShader;
