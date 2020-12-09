/// <reference types="resize-observer-browser" />
import { useEffect, useRef, useState } from 'react';

type Params = Record<string, { minWidth: number; maxWidth?: number }>;

export function useContainerQuery(params: Params): [typeof ref, string[]] {
  const ref = useRef<Element>();
  const [classNames, changeClassNames] = useState<string[]>([]);

  useEffect(() => {
    const element = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) {
        return;
      }

      if (!entries.length) {
        return;
      }

      const entry = entries[0];
      const width = entry.contentRect.width;

      const classNames = Object.keys(params).filter(className => {
        const { minWidth, maxWidth } = params[className];

        if (minWidth && maxWidth) {
          return width >= minWidth && width <= maxWidth;
        }

        if (minWidth) {
          return width >= minWidth;
        }

        if (maxWidth) {
          return width <= maxWidth;
        }

        return false;
      });

      changeClassNames(classNames);
    });

    if (element) resizeObserver.observe(element);

    return () => {
      if (element) resizeObserver.unobserve(element);
    };
  }, [params]);

  return [ref, classNames];
}
