import { ApolloClient } from "apollo-boost";
import App, { Container, DefaultAppIProps, NextAppContext } from "next/app";
import { DefaultQuery } from "next/router";
import React from "react";
import { ApolloProvider } from "react-apollo";
import withData from "../hocs/withData";

interface Props extends DefaultAppIProps {
  apollo: ApolloClient<{}>;
}

class MyApp extends App<Props> {
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
  }

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
