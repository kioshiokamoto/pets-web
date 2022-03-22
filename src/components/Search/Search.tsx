import React from "react";

import Styles from "./Search.styles";
import { SearchProps as Props } from "./Search.types";

const Search: React.FC<Props> = (props) => {
  const { type, placeholder, value, onChange, readOnly } = props ?? {};
  return (
    <Styles className="Search">
      <div className="Search__container">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
      </div>
    </Styles>
  );
};

Search.defaultProps = {};

export default Search;
