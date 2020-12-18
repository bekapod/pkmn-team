import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import '../styles/globals.css';

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}) => <Component {...pageProps} />;

export default App;
