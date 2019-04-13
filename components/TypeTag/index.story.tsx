import { storiesOf } from "@storybook/react";
import React from "react";
import TypeTag from ".";

storiesOf("TypeTag", module).add(
  "default",
  (): JSX.Element => <TypeTag type="electric">Electric</TypeTag>
);
