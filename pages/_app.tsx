import { ApolloClient } from "apollo-boost";
import App, { Container, DefaultAppIProps, NextAppContext } from "next/app";
import { DefaultQuery } from "next/router";
import { ApolloProvider } from "react-apollo";
import withData from "../hocs/withData";

interface IProps extends DefaultAppIProps {
  apollo: ApolloClient<{}>;
}

class MyApp extends App<IProps> {
  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps: { query?: DefaultQuery } = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;

    return { pageProps };
  }

  public componentDidMount() {
    this.setState({
      initialState: (window as any).__INITIAL_STATE__
    });
  }

  public render() {
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
