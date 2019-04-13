import { storiesOf } from "@storybook/react";
import React from "react";
import Label from ".";

storiesOf("Label", module).add(
  "default",
  (): JSX.Element => <Label>Cupcake ipsum dolor sit amet</Label>
);
