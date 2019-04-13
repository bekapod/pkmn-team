import { storiesOf } from "@storybook/react";
import React from "react";
import GiantInput from ".";

storiesOf("GiantInput", module).add(
  "default",
  (): JSX.Element => <GiantInput type="text" />
);
