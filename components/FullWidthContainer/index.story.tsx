import { storiesOf } from "@storybook/react";
import React from "react";
import FullWidthContainer from ".";

storiesOf("FullWidthContainer", module).add(
  "default",
  (): JSX.Element => (
    <FullWidthContainer>A section of content</FullWidthContainer>
  )
);
