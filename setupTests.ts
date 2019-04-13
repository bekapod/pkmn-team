/* eslint-disable no-console */
import Router from "next/router";
import React, { ComponentType } from "react";
import "react-testing-library/cleanup-after-each";

beforeEach(
  (): void => {
    global.appHistory = [];
  }
);

// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(
  (): void => {
    console.error = (...args: any[]): void => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  }
);

afterAll(
  (): void => {
    console.error = originalError;
  }
);

const mockedRouter = {
  back: (): void => {},
  beforePopState: (): boolean => true,
  prefetch: async (): Promise<
    () => React.DetailedReactHTMLElement<{}, HTMLElement>
  > => {
    const Component = (): React.DetailedReactHTMLElement<{}, HTMLElement> =>
      React.createElement("div");
    await true;
    return Component;
  },
  push: async (route: string): Promise<boolean> => {
    await global.appHistory.push(route);
    return true;
  },
  reload: async (): Promise<void> => {
    await null;
  },
  replace: async (route: string): Promise<boolean> => {
    global.appHistory = [route];
    await 0;
    return true;
  },

  components: ([] as unknown) as {
    [key: string]: { Component: ComponentType<any>; err: any };
  },
  pathname: "/",
  route: "",

  events: {
    off: (): void => {},
    on: (): void => {}
  }
};

Router.router = mockedRouter;

window.scrollTo = (): void => {};
window.scroll = (): void => {};
