import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import LoadingIcon from ".";

describe("<LoadingIcon />", () => {
  it("renders loading text", () => {
    const { queryByText } = render(<LoadingIcon />);

    expect(queryByText(/Loading/)).toBeTruthy();
  });

  it("renders spinner variant", () => {
    const { queryByTestId } = render(<LoadingIcon spinner />);

    expect(queryByTestId("loading-spinner")).toBeTruthy();
  });
});
