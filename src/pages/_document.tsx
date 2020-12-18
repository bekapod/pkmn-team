import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => {
            resetServerContext();
            return <App {...props} />;
          }
        });

      const initialProps = await Document.getInitialProps(ctx);
      return initialProps;
    } finally {
    }
  }
}
