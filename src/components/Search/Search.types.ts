import { ChangeEvent } from "react";
// Interfaces and types from component Search

// Component Props
export interface SearchProps {
  type?: string;
  placeholder?: string;
  value?: string | string[] | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
  readOnly?: boolean;
}

// Styled Component Props
export interface SearchStyledProps {
  className: string;
}
