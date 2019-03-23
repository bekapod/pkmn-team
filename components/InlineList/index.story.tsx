// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import InlineList from ".";

storiesOf("InlineList", module).add("default", () => (
  <InlineList>
    <li>Item 1</li>
    <li>Item 2</li>
  </InlineList>
));
