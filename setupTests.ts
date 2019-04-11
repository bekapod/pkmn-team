// tslint:disable:no-empty
// tslint:disable-next-line:no-implicit-dependencies
import Router from "next/router";
import React, { ComponentType, DetailedReactHTMLElement } from "react";
// tslint:disable-next-line:no-implicit-dependencies
import "react-testing-library/cleanup-after-each";

beforeEach(() => {
  global.appHistory = [];
});

// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

const mockedRouter = {
  back: () => {},
  beforePopState: () => true,
  prefetch: async () => {
    const Component = (): DetailedReactHTMLElement<any, HTMLElement> =>
      React.createElement("div");
    await true;
    return Component;
  },
  push: async (route: string) => {
    await global.appHistory.push(route);
    return true;
  },
  reload: async () => {
    await null;
  },
  replace: async (route: string) => {
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
    off: () => {},
    on: () => {}
  }
};

Router.router = mockedRouter;

window.scrollTo = () => {};
window.scroll = () => {};
