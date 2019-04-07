import { normalize, selection } from "polished";
import React, { Fragment, ReactNode, ReactNodeArray } from "react";
import { createGlobalStyle } from "styled-components/macro";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";
import FullWidthContainer from "../FullWidthContainer";
import Heading from "../Heading";
import Meta from "../Meta";

interface Props {
  title: string;
  children: ReactNode | ReactNodeArray;
}

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    overflow-x: hidden;
    color: ${variables.colors.grayDark};
    font-family: ${variables.fonts.base};
    font-size: ${variables.fontSizes.base}px;
    font-weight: 400;
    line-height: ${lineHeight("base")};
    background-color: ${variables.colors.grayLight};
    -webkit-font-smoothing: antialiased;
  }

  body {
    --scroll-bar: 0;
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

const Page = ({ title, children }: Props): JSX.Element => (
  <Fragment>
    <Meta title={title} />
    <GlobalStyle />
    <Heading>{title}</Heading>
    <FullWidthContainer role="alert" aria-live="assertive">
      {children}
    </FullWidthContainer>
  </Fragment>
);

export default Page;
