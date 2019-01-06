// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import Page from ".";

storiesOf("Page", module)
  .add("with content", () => (
    <Page loading={false} title="My Page">
      <div>Page Content</div>
    </Page>
  ))
  .add("when content loading", () => (
    <Page loading={true} title="My Page">
      <div>Page Content</div>
    </Page>
  ))
  .add("when error has happened", () => (
    <Page
      loading={false}
      title="My Page"
      error={{ message: "An error occurred." } as any}
    >
      <div>Page Content</div>
    </Page>
  ));
