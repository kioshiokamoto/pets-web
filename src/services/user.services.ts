import axios from "axios";

export const getUserData = async (email: string) => {
  const result = await axios.post("/api/user", { email });
  return result.data;
};
