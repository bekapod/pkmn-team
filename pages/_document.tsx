import Document, {
  AnyPageProps,
  Head,
  Main,
  NextDocumentContext,
  NextScript
} from "next/document";
import { ServerStyleSheet } from "styled-components/macro";

interface IProps extends AnyPageProps {
  styleTags: any;
}

class MyDocument extends Document<IProps> {
  public static getInitialProps({ renderPage }: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App: React.ComponentType<AnyPageProps>) => (props: AnyPageProps) =>
        sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  public render() {
    return (
      <html>
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
