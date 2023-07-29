import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
          {/* Deshabilitar Content Security Policy en desarrollo */}
          {/* {process.env.NODE_ENV === 'development' && (
            <meta http-equiv="Content-Security-Policy" content="default-src 'unsafe-inline' 'self' http://localhost:3000;" />
          )} */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
