// tslint:disable-next-line:no-implicit-dependencies
import { addDecorator, configure } from "@storybook/react";
import React, { Fragment } from "react";
import { GlobalStyle } from "../src/index";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("..", true, /\.story\.tsx?$/));
}

addDecorator(storyFn => (
  <Fragment>
    <GlobalStyle />
    {storyFn()}
  </Fragment>
));

configure(loadStories, module);
