// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import CenteredRow from ".";

storiesOf("CenteredRow", module).add("default", () => (
  <CenteredRow>
    <span>Child 1</span>
    <span>Child 2</span>
  </CenteredRow>
));
