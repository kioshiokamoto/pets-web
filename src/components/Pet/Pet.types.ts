// Interfaces and types from component Pet

// Component Props
export interface PetProps {
  id: number;
  name: string;
  user: {
    name: string;
    email: string;
  } | null;
  breed: {
    name: string;
  };
  image: string;
  birthDate: any;
}

// Styled Component Props
export interface PetStyledProps {
  className: string;
}
