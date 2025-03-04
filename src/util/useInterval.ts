import { useEffect, useRef } from 'react';

export function useInterval(
  callback: () => void,
  delay: number | null,
  startAfter: number = 0
) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const startTimeout = setTimeout(() => {
        tick();
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }, startAfter);

      return () => clearTimeout(startTimeout);
    }
  }, [delay, startAfter]);
}
