// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import FullBleedContainer from ".";

storiesOf("FullBleedContainer", module).add("default", () => (
  <FullBleedContainer>A section of content</FullBleedContainer>
));
