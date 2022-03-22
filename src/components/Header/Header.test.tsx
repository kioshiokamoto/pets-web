import React from "react";

import { render } from "setupTests";
import Header from "./Header";

describe("Header", () => {
  it("renders with default props", () => {
    render(<Header />);
  });
});
