import { storiesOf } from "@storybook/react";
import React from "react";
import LoadingIcon from ".";

storiesOf("icons/LoadingIcon", module)
  .add("default", (): JSX.Element => <LoadingIcon />)
  .add("spinner", (): JSX.Element => <LoadingIcon spinner />);
