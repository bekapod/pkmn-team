// tslint:disable:no-empty
// tslint:disable-next-line:no-implicit-dependencies
import Router from "next/router";
// tslint:disable-next-line:no-implicit-dependencies
import "react-testing-library/cleanup-after-each";

beforeEach(() => {
  global.appHistory = [];
});

const mockedRouter = {
  back: () => {},
  beforePopState: () => true,
  prefetch: async () => {
    await true;
  },
  push: async (route: any) => {
    global.appHistory.push(route);
    await true;
  },
  reload: async () => {
    await null;
  },
  replace: async () => {
    await true;
  },

  components: [],
  pathname: "/",
  route: "",

  events: {
    off: () => {},
    on: () => {}
  }
};

Router.router = mockedRouter;

window.scroll = () => {};
