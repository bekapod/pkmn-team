// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import TypeTag from ".";

storiesOf("TypeTag", module).add("default", () => (
  <TypeTag type="electric">Electric</TypeTag>
));
