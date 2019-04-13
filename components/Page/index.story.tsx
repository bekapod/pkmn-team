import { storiesOf } from "@storybook/react";
import React from "react";
import Page from ".";

storiesOf("Page", module).add(
  "with content",
  (): JSX.Element => (
    <Page title="My Page">
      <div>Page Content</div>
    </Page>
  )
);
