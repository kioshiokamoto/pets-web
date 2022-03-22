import { css, FlattenSimpleInterpolation } from "styled-components";

const getPairs = (cssFields: any, prefix: string): any => {
  let styles = ``;
  for (const el in cssFields) {
    if (typeof cssFields[el] === "object") {
      styles += getPairs(cssFields[el], prefix ? `${prefix}-${el}` : el);
    } else if (typeof el === "string") {
      styles += `--${prefix}-${el}: ${cssFields[el]};\n`;
    } else {
      console.warn(
        "You should not add any property value besides strings, arrays and objects."
      );
    }
  }
  return styles;
};

const cssVariables = (
  themeVariables: Record<string, unknown>
): FlattenSimpleInterpolation => {
  return css`
    :root {
      ${getPairs(themeVariables, "")}
    }
  `;
};

export default cssVariables;
