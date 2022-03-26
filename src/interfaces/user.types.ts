export interface User {
  age: number | null;
  email: string;
  id: number;
  image: string | null;
  name: string | null;
  role: Role;
}

const Role = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  VETERINARY: "VETERINARY",
} as const;

export type Role = typeof Role[keyof typeof Role];
