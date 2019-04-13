import React from "react";
import { render } from "react-testing-library";
import LoadingIcon from ".";

describe("<LoadingIcon />", (): void => {
  it("renders loading text", (): void => {
    const { queryByText } = render(<LoadingIcon />);

    expect(queryByText(/Loading/)).toBeTruthy();
  });

  it("renders spinner variant", (): void => {
    const { queryByTestId } = render(<LoadingIcon spinner />);

    expect(queryByTestId("loading-spinner")).toBeTruthy();
  });
});
