import { lighten, darken } from "polished";

const primary = "hsla(257, 85%, 45%, 1)";

const palette = {
  empty: "",
};

const fonts = {
  primary: "'Sora', sans-serif",
};

const sizes = {
  page: {
    minWidth:
      "calc(100vw - (100vw - 100%) - env(safe-area-inset-left) - env(safe-area-inset-right))",
    maxWidth:
      "calc(100vw - (100vw - 100%) - env(safe-area-inset-left) - env(safe-area-inset-right))",
    minHeight:
      "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
    maxHeight:
      "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
    columns:
      "minmax(1.6rem, 1fr) [content-start] minmax(0, 120rem) [content-end] minmax(1.6rem, 1fr)",
  },
  navbar: {
    height: "calc(7.6rem + env(safe-area-inset-top))",
    "height-mobile": "calc(10.8rem + env(safe-area-inset-top))",
    "height-mobile-without-search": "calc(5.8rem + env(safe-area-inset-top))",
  },
};

const variables = { palette, fonts, sizes };

export default variables;
