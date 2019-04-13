import App, { Container } from "next/app";
import Router from "next/router";
import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import withData from "../withData";

describe("withData", (): void => {
  it("returns the wrapped component with its own props and scrollToTop prop", (): void => {
    const renderer = ShallowRenderer.createRenderer();
    class TestComponent extends App {
      public render(): JSX.Element {
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
        Component={(): JSX.Element => <div />}
      >
        <div />
      </ComponentWithData>
    );

    const output = renderer.getRenderOutput();

    expect(output.props.apollo).toBeTruthy();
  });
});
