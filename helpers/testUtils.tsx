// tslint:disable-next-line:no-implicit-dependencies
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import { render, wait } from "react-testing-library";

export const renderWithRouter = (
  component: JSX.Element,
  { route = "/", waitForText = "Loading", ...renderOptions } = {}
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(
    <Router history={history}>{component}</Router>,
    renderOptions
  );
  const finishLoading = () =>
    wait(() => expect(utils.queryByText(waitForText)).toBeNull());

  return {
    ...utils,
    finishLoading,
    history
  };
};
