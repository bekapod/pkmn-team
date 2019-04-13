import { storiesOf } from "@storybook/react";
import React from "react";
import FullBleedContainer from ".";

storiesOf("FullBleedContainer", module).add(
  "default",
  (): JSX.Element => (
    <FullBleedContainer>A section of content</FullBleedContainer>
  )
);
