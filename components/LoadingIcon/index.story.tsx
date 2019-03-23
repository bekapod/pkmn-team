// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import LoadingIcon from ".";

storiesOf("icons/LoadingIcon", module)
  .add("default", () => <LoadingIcon />)
  .add("spinner", () => <LoadingIcon spinner />);
