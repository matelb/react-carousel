import { useState, useEffect, useRef } from "react";

import ResizeObserver from "resize-observer-polyfill";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export function useMeasure() {
  const ref = useRef<Element>();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref && ref.current) ro.observe(ref.current as Element);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
}

export function useMeasureByRef(ref: Element) {
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref) {
      ro.observe(ref);
    }
    return () => ro.disconnect();
  }, [ref]);

  return [bounds];
}
