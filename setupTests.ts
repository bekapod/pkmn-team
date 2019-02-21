// tslint:disable:no-empty
// tslint:disable-next-line:no-implicit-dependencies
import Router from "next/router";
import React, { ComponentType } from "react";
// tslint:disable-next-line:no-implicit-dependencies
import "react-testing-library/cleanup-after-each";

beforeEach(() => {
  global.appHistory = [];
});

const mockedRouter = {
  back: () => {},
  beforePopState: () => true,
  prefetch: async () => {
    const Component = () => React.createElement("div");
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

window.scroll = () => {};
