import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface UseAnchoredPopoverOptions {
  isOpen: boolean;
  minAboveHeight?: number;
  minBelowHeight?: number;
  minWidth?: number;
}

export const useAnchoredPopover = ({
  isOpen,
  minAboveHeight = 160,
  minBelowHeight = 160,
  minWidth = 280,
}: UseAnchoredPopoverOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const updatePosition = () => {
    if (!isOpen) return;
    const triggerEl = triggerRef.current;
    const panelEl = panelRef.current;
    if (!triggerEl || !panelEl) return;

    const rect = triggerEl.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const margin = 8;

    const panelWidth = panelEl.offsetWidth;
    const panelHeight = panelEl.offsetHeight;

    const spaceBelow = viewportH - rect.bottom - margin;
    const spaceAbove = rect.top - margin;
    const placeBelow = spaceBelow >= Math.max(minBelowHeight, spaceAbove);

    let top = 0;
    let maxHeight = 0;
    if (placeBelow) {
      top = rect.bottom + margin;
      maxHeight = Math.max(120, spaceBelow);
    } else {
      const desiredTop = rect.top - margin - panelHeight;
      top = Math.max(margin, desiredTop);
      maxHeight = Math.max(120, spaceAbove);
    }

    let left = rect.left;
    if (left + panelWidth > viewportW - margin) {
      left = Math.max(margin, viewportW - margin - panelWidth);
    }
    if (left < margin) left = margin;

    setStyle({
      position: "fixed",
      top,
      left,
      maxHeight: `${maxHeight}px`,
      maxWidth: `calc(100vw - ${margin * 2}px)`,
      minWidth: `${Math.max(0, Math.min(minWidth, viewportW - margin * 2))}px`,
      overflow: "auto",
      zIndex: 50,
    });
  };

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const raf1 = requestAnimationFrame(() => {
      updatePosition();
      const raf2 = requestAnimationFrame(() => updatePosition());
      (updatePosition as any)._raf2 = raf2;
    });
    (updatePosition as any)._raf1 = raf1;
    return () => {
      if ((updatePosition as any)._raf1)
        cancelAnimationFrame((updatePosition as any)._raf1);
      if ((updatePosition as any)._raf2)
        cancelAnimationFrame((updatePosition as any)._raf2);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);

    let ro: ResizeObserver | null = null;
    if (panelRef.current && "ResizeObserver" in globalThis.window) {
      ro = new ResizeObserver(() => updatePosition());
      ro.observe(panelRef.current);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
      if (ro) ro.disconnect();
    };
  }, [isOpen]);

  return { containerRef, triggerRef, panelRef, style, updatePosition } as const;
};

export default useAnchoredPopover;
