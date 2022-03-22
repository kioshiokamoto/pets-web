import React from "react";

import { render } from "setupTests";
import Pet from "./Pet";

describe("Pet", () => {
  it("renders with default props", () => {
    render(<Pet />);
  });
});
