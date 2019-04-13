import { storiesOf } from "@storybook/react";
import React from "react";
import ErrorMessage from ".";

storiesOf("ErrorMessage", module)
  .add(
    "default",
    (): JSX.Element => <ErrorMessage>This is an error message.</ErrorMessage>
  )
  .add(
    "big",
    (): JSX.Element => (
      <ErrorMessage isBig>This is an error message.</ErrorMessage>
    )
  );
