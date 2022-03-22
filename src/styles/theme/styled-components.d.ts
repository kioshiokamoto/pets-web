import themes from "styles/theme";

type ThemeInterface = typeof themes.light;

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}
