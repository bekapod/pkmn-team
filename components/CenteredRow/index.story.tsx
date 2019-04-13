import { storiesOf } from "@storybook/react";
import React from "react";
import CenteredRow from ".";

storiesOf("CenteredRow", module).add(
  "default",
  (): JSX.Element => (
    <CenteredRow>
      <span>Child 1</span>
      <span>Child 2</span>
    </CenteredRow>
  )
);
