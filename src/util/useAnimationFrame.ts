import { useEffect, useRef } from 'react';

export function useAnimationFrame(
  callback: () => void,
  isActive: boolean = true,
  speedFactor: number = 1,
  timeFactor: number = 100
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

    const tick = (time) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const deltaTime = time - lastTimeRef.current;

      // 1000 = 1sec
      if (deltaTime >= timeFactor * speedFactor) {
        savedCallback.current?.();
        lastTimeRef.current = time;
      }

      requestAnimationFrame(tick);
    };

    // const tick = (time: number) => {
    //   if (lastTimeRef.current === null) {
    //     lastTimeRef.current = time;
    //   }

    //   const deltaTime = (time - lastTimeRef.current) * speedFactor;

    //   // 60FPS 기준 16ms
    //   if (deltaTime >= frameFactor) {
    //     if (savedCallback.current) savedCallback.current();
    //     lastTimeRef.current = time;
    //   }

    //   animationFrameRef.current = requestAnimationFrame(tick);
    // };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);

    timeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(tick);
    }, 0);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive, speedFactor]);
}
