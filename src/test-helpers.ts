export const setupResizeObserverMock = (
  entries: any[],
  unobserve = jest.fn()
): { reset: () => void } => {
  const originalResizeObserver = window.ResizeObserver;

  window.ResizeObserver = class ResizeObserver {
    callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }

    disconnect = jest.fn();

    observe() {
      this.callback(entries, this);
    }

    unobserve = unobserve;
  };

  const reset = (): void => {
    window.ResizeObserver = originalResizeObserver;
  };

  return {
    reset
  };
};
