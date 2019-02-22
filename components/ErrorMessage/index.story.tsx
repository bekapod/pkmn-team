// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import ErrorMessage from ".";

storiesOf("ErrorMessage", module)
  .add("default", () => <ErrorMessage>This is an error message.</ErrorMessage>)
  .add("big", () => (
    <ErrorMessage isBig>This is an error message.</ErrorMessage>
  ));
