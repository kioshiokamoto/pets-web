import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import Providers from "../Providers/Providers";

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <Providers dehydratedState={pageProps.dehydratedState}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Providers>
  );
};

export default App;
