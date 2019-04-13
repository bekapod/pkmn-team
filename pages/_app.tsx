import { ApolloClient } from "apollo-boost";
import App, {
  Container,
  DefaultAppIProps,
  AppProps,
  NextAppContext
} from "next/app";
import { DefaultQuery } from "next/router";
import React from "react";
import { ApolloProvider } from "react-apollo";
import withData from "../hocs/withData";

interface Props
  extends DefaultAppIProps,
    AppProps<Record<string, string | string[] | undefined>> {
  apollo: ApolloClient<{}>;
}

class MyApp extends App<Props> {
  private observer?: MutationObserver;

  public constructor(props: Props) {
    super(props);

    this.checkBodyMutation = this.checkBodyMutation.bind(this);
  }

  public static async getInitialProps({
    Component,
    ctx
  }: NextAppContext): Promise<DefaultAppIProps> {
    let pageProps: { query?: DefaultQuery } = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;

    return { pageProps };
  }

  public componentDidMount(): void {
    this.setState({
      initialState: (window as any).__INITIAL_STATE__ // eslint-disable-line no-underscore-dangle
    });

    this.setScrollbarWidth();
    this.monitorScrollbarWidth();
  }

  public componentWillUnmount(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    window.removeEventListener("resize", this.setScrollbarWidth);
  }

  private monitorScrollbarWidth(): void {
    const body = document.querySelector("body");
    const config = { attributes: false, childList: true, subtree: false };

    if (body) {
      this.observer = new MutationObserver(this.checkBodyMutation);
      this.observer.observe(body, config);
    }

    window.addEventListener("resize", this.setScrollbarWidth);
  }

  private checkBodyMutation(mutations: MutationRecord[]): void {
    mutations.forEach(
      ({ type }): void => {
        if (type === "childList") {
          this.setScrollbarWidth();
        }
      }
    );
  }

  private setScrollbarWidth = (): void => {
    const body = document.querySelector("body");

    if (body) {
      body.setAttribute(
        "style",
        `--scroll-bar: ${window.screen.width - body.clientWidth}px`
      );
    }
  };

  public render(): JSX.Element {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
