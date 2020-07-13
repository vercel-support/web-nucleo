import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

import { lngFromReq } from 'next-i18next/dist/commonjs/utils';

type Props = DocumentInitialProps & { lng: string };

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    const lng = lngFromReq(ctx.req);
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
        lng,
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { lng } = this.props;
    return (
      <Html lang={lng}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
