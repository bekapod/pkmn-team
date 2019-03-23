// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import MoveList from ".";

storiesOf("MoveList", module).add("without moves", () => (
  <MoveList moves={[]} />
));
