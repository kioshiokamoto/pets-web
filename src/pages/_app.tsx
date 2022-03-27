import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, defaultTheme } from "evergreen-ui";

import Providers from "../Providers/Providers";

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider
      value={{
        ...defaultTheme,
        fontFamilies: {
          display: "Sora",
          ui: "Sora,-apple-system, sans-serif",
          mono: '"SF Mono", monospace',
        },
      }}
    >
      <Providers dehydratedState={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Providers>
    </ThemeProvider>
  );
};

export default App;
