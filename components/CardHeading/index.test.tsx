import React from "react";
import { render } from "react-testing-library";
import CardHeading from ".";

describe("<CardHeading />", (): void => {
  it("renders a h2 by default", (): void => {
    const { getByText } = render(<CardHeading>Heading Default</CardHeading>);

    expect(getByText(/Heading Default/).tagName).toBe("H2");
  });

  it("can render a different heading type", (): void => {
    const { getByText } = render(
      <CardHeading headingType="h1">Heading 1</CardHeading>
    );

    expect(getByText(/Heading 1/).tagName).toBe("H1");
  });
});
