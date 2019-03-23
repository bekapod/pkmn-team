// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import GiantInput from ".";

storiesOf("GiantInput", module).add("default", () => (
  <GiantInput type="text" />
));
