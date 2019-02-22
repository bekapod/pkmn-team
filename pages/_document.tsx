import Document, {
  AnyPageProps,
  Head,
  Main,
  NextDocumentContext,
  NextScript,
  DefaultDocumentIProps
} from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components/macro";

interface Props extends AnyPageProps {
  styleTags: any;
}

interface DocumentProps extends DefaultDocumentIProps {
  styleTags: any;
}

class MyDocument extends Document<Props> {
  public static getInitialProps({
    renderPage
  }: NextDocumentContext): DocumentProps {
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App: React.ComponentType<AnyPageProps>) => (props: AnyPageProps) =>
        sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  public render(): JSX.Element {
    return (
      <html lang="en">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
