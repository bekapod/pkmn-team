import { storiesOf } from "@storybook/react";
import React from "react";
import Autocomplete, { AutocompleteDropdown } from ".";

storiesOf("Autocomplete", module).add(
  "default",
  (): JSX.Element => (
    <Autocomplete>
      <AutocompleteDropdown>
        <div>Item 1</div>
        <div>Item 2</div>
      </AutocompleteDropdown>
    </Autocomplete>
  )
);
