import { storiesOf } from "@storybook/react";
import React from "react";
import BinIcon from ".";

storiesOf("icons/BinIcon", module).add(
  "default",
  (): JSX.Element => (
    <div style={{ width: "50px" }}>
      <BinIcon />
    </div>
  )
);
