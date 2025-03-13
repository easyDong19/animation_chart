import { useEffect, useRef } from 'react';

export function useAnimationFrame(
  callback: () => void,
  isActive: boolean = true,
  speedFactor: number = 1,
  startAfter: number = 0
) {
  const savedCallback = useRef<() => void>();
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) return;

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const deltaTime = (time - lastTimeRef.current) * speedFactor;

      if (deltaTime >= 16) {
        if (savedCallback.current) savedCallback.current();
        lastTimeRef.current = time;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);

    timeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(tick);
    }, startAfter);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive, speedFactor, startAfter]);
}
