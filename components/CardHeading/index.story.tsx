import { storiesOf } from "@storybook/react";
import React from "react";
import CardHeading from ".";

storiesOf("CardHeading", module).add(
  "default",
  (): JSX.Element => <CardHeading>Cupcake ipsum dolor sit amet</CardHeading>
);
