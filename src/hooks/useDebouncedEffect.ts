import { useEffect, useRef, DependencyList } from 'react';

export function useDebouncedEffect(
  callback: () => void,
  deps: DependencyList = [],
  delay: number
): void {
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, callback, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
}
