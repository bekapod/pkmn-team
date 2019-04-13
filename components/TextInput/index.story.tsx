import { storiesOf } from "@storybook/react";
import React from "react";
import TextInput from ".";

storiesOf("TextInput", module).add(
  "default",
  (): JSX.Element => <TextInput type="text" />
);
