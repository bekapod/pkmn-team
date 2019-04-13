import { storiesOf } from "@storybook/react";
import React from "react";
import Heading from ".";

storiesOf("Heading", module).add(
  "default",
  (): JSX.Element => <Heading>Cupcake ipsum dolor sit amet</Heading>
);
