// @flow
import React from "react";
import renderer from "react-test-renderer";
import Autocomplete, { AutocompleteDropdown } from ".";

describe("<Autocomplete />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <Autocomplete>
        <AutocompleteDropdown>
          <span>Item 1</span>
          <span>Item 2</span>
        </AutocompleteDropdown>
      </Autocomplete>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
