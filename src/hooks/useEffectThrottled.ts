import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
} from "react";

export function useEffectThrottled(
  callback: EffectCallback,
  delay: number,
  deps?: DependencyList,
): void {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<number | undefined>(undefined);

  const throttledCallback = useCallback(() => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRun.current;

    if (timeSinceLastRun >= delay) {
      lastRun.current = now;
      callback();
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        lastRun.current = now;
        callback();
      }, delay - timeSinceLastRun);
    }
  }, [callback, delay]);

  useEffect(() => {
    throttledCallback();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [throttledCallback, deps]);
}
