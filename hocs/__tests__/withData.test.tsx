import App, { Container } from "next/app";
import Router from "next/router";
import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import ShallowRenderer from "react-test-renderer/shallow";
import withData from "../withData";

describe("withData", () => {
  it("returns the wrapped component with its own props and scrollToTop prop", () => {
    const renderer = new ShallowRenderer();
    class TestComponent extends App {
      public render() {
        const { Component, pageProps } = this.props;

        return (
          <Container>
            <Component {...pageProps} />
          </Container>
        );
      }
    }
    const ComponentWithData = withData(TestComponent);

    renderer.render(
      <ComponentWithData
        apolloState={{}}
        router={Router}
        pageProps={{}}
        // tslint:disable-next-line:jsx-no-lambda
        Component={() => <div />}
      >
        <div />
      </ComponentWithData>
    );

    const output = renderer.getRenderOutput();

    expect(output.props.apollo).toBeTruthy();
  });
});
