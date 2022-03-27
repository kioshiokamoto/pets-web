export interface Pet {
  id: number;
  name: string;
  genre: number;
  birthDate: string;
  image: string;
  breed: string;
  user: any;
}

export type CreatePet = Omit<Pet, "id" | "user">;

export interface Breed {
  id: number;
  name: string;
}
