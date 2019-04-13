import Document, {
  AnyPageProps,
  NextDocumentContext,
  DefaultDocumentIProps,
  RenderPageResponse
} from "next/document";
import React from "react";
// @ts-ignore
import { resetServerContext } from "react-beautiful-dnd";
import { ServerStyleSheet } from "styled-components/macro";

interface Props extends AnyPageProps {
  styles: any;
}

interface DocumentProps extends DefaultDocumentIProps {
  styles: any;
}

class MyDocument extends Document<Props> {
  public static async getInitialProps(
    ctx: NextDocumentContext
  ): Promise<DocumentProps> {
    resetServerContext();
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = (): RenderPageResponse =>
        originalRenderPage({
          enhanceApp: (App): React.ComponentType<Props> => (
            props
          ): JSX.Element => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
}

export default MyDocument;
