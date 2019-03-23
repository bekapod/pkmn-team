// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import CardMeta from ".";

storiesOf("CardMeta", module).add("default", () => (
  <CardMeta
    id="1"
    items={[
      { label: "Item 1", value: "Value 1" },
      { label: "Item 2", value: 2 }
    ]}
  />
));
