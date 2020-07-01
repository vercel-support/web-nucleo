import React from 'react';
import App from 'next/app';
import nextI18Next from '../i18n';

import { createGlobalStyle, ThemeProvider } from 'styled-components';

import theme from '../common/theme';

import { CSSProp } from 'styled-components';

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
  }
}

const GlobalStyle = createGlobalStyle`
  html, body
  {
      margin: 0px; 
      padding: 0px;
  }
`;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default nextI18Next.appWithTranslation(MyApp);
