// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import Page from ".";

storiesOf("Page", module).add("with content", () => (
  <Page title="My Page">
    <div>Page Content</div>
  </Page>
));
