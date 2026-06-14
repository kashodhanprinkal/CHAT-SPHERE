// BorderAnimatedContainer.jsx
import { useEffect, useRef } from "react";

function BorderAnimatedContainer({ children, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Update CSS variable for animation
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      const angle = (parseFloat(getComputedStyle(container).getPropertyValue("--border-angle")) || 0) + 0.5;
      container.style.setProperty("--border-angle", `${angle}deg`);
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
        relative rounded-2xl
        [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,
        conic-gradient(
          from var(--border-angle),
          theme(colors.slate.600/.48) 80%,
          theme(colors.cyan.500) 86%,
          theme(colors.cyan.300) 90%,
          theme(colors.cyan.500) 94%,
          theme(colors.slate.600/.48)
        )_border-box]
        border border-transparent
        ${className}
      `}
      style={{
        "--border-angle": "0deg",
        transition: "--border-angle 0.05s linear",
      }}
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;