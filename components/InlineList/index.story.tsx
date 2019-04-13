import { storiesOf } from "@storybook/react";
import React from "react";
import InlineList from ".";

storiesOf("InlineList", module).add(
  "default",
  (): JSX.Element => (
    <InlineList>
      <li>Item 1</li>
      <li>Item 2</li>
    </InlineList>
  )
);
