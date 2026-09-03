"use client";

import { createElement, useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delayMs = 0,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  delayMs?: number;
  as?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `${visible ? "reveal" : ""} ${className ?? ""}`,
      style: visible ? { animationDelay: `${delayMs}ms` } : undefined,
    },
    children
  );
}
