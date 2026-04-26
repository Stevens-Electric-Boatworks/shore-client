import { apiClient } from "./apiClient";

const logout = async () => {
  try {
    apiClient.post("/auth/logout");
  } catch (err) {
    throw err;
  }
};

export default logout;
