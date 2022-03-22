import React, { useRef } from "react";
// import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClientProvider, QueryClient } from "react-query";
import { Hydrate } from "react-query/hydration";

import { ProvidersProps as Props } from "./Providers.types";
import ThemeProvider from "../contexts/theme/theme.context";

const Providers: React.FC<Props> = (props) => {
  const { children, dehydratedState } = props;

  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: process.env.NODE_ENV === "production",
          staleTime: 15 * 1000 * 60,
        },
      },
    });
  }

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

Providers.defaultProps = {};

export default Providers;
