import { ReactNode, Dispatch, SetStateAction } from "react";
import themes from "../../styles/theme";

const { light } = themes;

// Provider Props
export interface ThemeProviderProps {
  children: ReactNode;
  theme?: typeof light;
}

// Provider value
export interface ThemeProviderValue {
  selectedTheme: typeof light;
  setSelectedTheme: Dispatch<SetStateAction<typeof light>>;
}
