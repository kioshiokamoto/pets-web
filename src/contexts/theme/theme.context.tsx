import React, { createContext, useEffect, useMemo, useState } from "react";
import { ContextDevTool } from "react-context-devtool";
import { ThemeProvider as ThemeProviderLib } from "styled-components";

import GlobalStyles from "../../styles/base";
import { ThemeProviderProps as Props } from "./theme.context.types";
import { ThemeProviderValue } from "./theme.context.types";
import themes from "../../styles/theme";

// @ts-ignore
export const ThemeContext = createContext<ThemeProviderValue>();

const ThemeProvider: React.FC<Props> = (props) => {
  const { theme } = props;
  const { light, dark } = themes;
  const [selectedTheme, setSelectedTheme] = useState(theme ?? light);

  const value: ThemeProviderValue = useMemo(() => {
    return { selectedTheme, setSelectedTheme };
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <GlobalStyles theme={selectedTheme} />
      <ThemeProviderLib theme={selectedTheme}>
        <ContextDevTool context={ThemeContext} id="theme" displayName="Theme" />
        {props.children}
      </ThemeProviderLib>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
