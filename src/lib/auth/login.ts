import axios from "axios";
import { AUTH_CONFIG } from "./config";
import { tokenStorage } from "./tokenStorage";

const login = async (username: string, password: string) => {
  // Validation is already done by the LoginCard component :)
  try {
    const res = await axios.post(
      "/auth/login",
      {
        username,
        password,
      },
      {
        baseURL: AUTH_CONFIG.apiUrl,
      },
    );

    if (res.data.accessToken) {
      tokenStorage.set(res.data.accessToken);
    }

    return res.data.user;
  } catch (err) {
    throw err;
  }
};

export default login;
