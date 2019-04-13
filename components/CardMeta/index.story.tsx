import { storiesOf } from "@storybook/react";
import React from "react";
import CardMeta from ".";

storiesOf("CardMeta", module).add(
  "default",
  (): JSX.Element => (
    <CardMeta
      id="1"
      items={[
        { label: "Item 1", value: "Value 1" },
        { label: "Item 2", value: 2 }
      ]}
    />
  )
);
