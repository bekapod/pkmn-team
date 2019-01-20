import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import ApolloLinkTimeout from "apollo-link-timeout";
import { normalize, selection } from "polished";
import React, { Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components/macro";
import App from "./App";
import * as variables from "./helpers/variables";
import { lineHeight } from "./helpers/verticalRhythm";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    color: ${variables.colors.grayDark};
    font-family: ${variables.fonts.base};
    font-size: ${variables.fontSizes.base}px;
    font-weight: 400;
    line-height: ${lineHeight("base")};
    background-color: ${variables.colors.grayLight};
    -webkit-font-smoothing: antialiased;
  }

  ${selection({
    "background-color": variables.colors.selection,
    color: variables.colors.grayDark
  })}

  h1 {
    margin: ${variables.spacing.lg}px 0;
    font-size: ${variables.fontSizes.lg}px;
    font-weight: 900;
    letter-spacing: 0.05em;
    line-height: ${lineHeight("lg")};
    text-transform: uppercase;
  }

  h2 {
    margin: ${variables.spacing.md}px 0;
    font-size: ${variables.fontSizes.md}px;
    font-weight: 900;
    letter-spacing: 0.05em;
    line-height: ${lineHeight("md")};
    text-transform: uppercase;
  }

  p {
    margin: ${variables.spacing.lg}px 0;
  }
`;

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL
});

const timeoutLink = new ApolloLinkTimeout(10000);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: timeoutLink.concat(httpLink)
});

render(
  <Fragment>
    <GlobalStyle />
    <Provider store={configureStore((window as any).__INITIAL_STATE__)}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
