import React, { Fragment } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { createGlobalStyle } from "styled-components/macro";
import { normalize, selection } from "polished";
import App from "./App"
import configureStore from "./store";
import * as serviceWorker from "./serviceWorker";
import * as variables from "./helpers/variables";
import { lineHeight } from "./helpers/verticalRhythm";

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    color: ${variables.colors.grayDark};
    font-family: ${variables.fonts.base};
    font-size: ${variables.fontSizes.base}px;
    font-weight: 400;
    line-height: ${lineHeight("base")};
    background-color: ${variables.colors.grayLight};
    -webkit-font-smoothing: antialiased;
  }

  ${selection({
    color: variables.colors.grayDark,
    "background-color": variables.colors.selection
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

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_API_URL
  }),
  connectToDevTools: true,
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__)
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
