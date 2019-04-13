import React from "react";
import { render } from "react-testing-library";
import Autocomplete, { AutocompleteDropdown } from ".";

describe("<Autocomplete />", (): void => {
  it("renders all children", (): void => {
    const { getByText } = render(
      <Autocomplete>
        <AutocompleteDropdown>
          <span>Item 1</span>
          <span>Item 2</span>
        </AutocompleteDropdown>
      </Autocomplete>
    );

    expect(getByText(/Item 1/)).toBeTruthy();
    expect(getByText(/Item 2/)).toBeTruthy();
  });
});
