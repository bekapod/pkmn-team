// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import BinIcon from ".";

storiesOf("icons/BinIcon", module).add("default", () => (
  <div style={{ width: "50px" }}>
    <BinIcon />
  </div>
));
