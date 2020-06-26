import React from 'react';
import App from 'next/app';
import nextI18Next from '../i18n';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default nextI18Next.appWithTranslation(MyApp);
