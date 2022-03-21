import { ChangeEvent } from "react";

const Search: React.FC<{
  type?: string;
  placeholder?: string;
  value?: string | string[] | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
  readOnly?: boolean;
}> = ({ type, placeholder, value, onChange, readOnly }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      <div>{/* <SearchIcon /> */}</div>
      <style jsx>
        {`
          input {
            width: 100%;
            padding: 0.5rem;
            margin: 0.5rem 0;
            border-radius: 0.25rem;
            border: 0.125rem solid rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
};
export default Search;
