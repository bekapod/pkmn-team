import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import CardMeta from ".";

describe("<CardMeta />", () => {
  it("renders list of items", () => {
    const { queryByText } = render(
      <CardMeta
        id="1"
        items={[
          { label: "Item 1", value: "Value 1" },
          { label: "Item 2", value: 2 }
        ]}
      />
    );

    expect(queryByText(/Item 1/)).toBeTruthy();
    expect(queryByText(/Value 1/)).toBeTruthy();
    expect(queryByText(/Item 2/)).toBeTruthy();
    expect(queryByText(/2/)).toBeTruthy();
  });

  it("doesn't render any items if none are passed in", () => {
    const { getByTestId } = render(<CardMeta id="1" />);

    expect(getByTestId("card-meta-1").children).toHaveLength(0);
  });
});
