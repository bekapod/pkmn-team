import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import { CardContent, CardHeader, CardLink, CardWrapper } from ".";

describe("Card components", () => {
  it("renders children correctly", () => {
    const { queryByText } = render(
      <CardLink href="/team/edit/1/">
        <CardWrapper>
          <CardHeader
            types={[
              { name: "Electric", slug: "electric" },
              { name: "Psychic", slug: "psychic" }
            ]}
          >
            Heading
          </CardHeader>
          <CardContent>Content</CardContent>
        </CardWrapper>
      </CardLink>
    );

    expect(queryByText(/Heading/)).toBeTruthy();
    expect(queryByText(/Content/)).toBeTruthy();
  });
});
