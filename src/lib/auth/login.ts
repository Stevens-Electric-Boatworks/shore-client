import axios from "axios";
import { AUTH_CONFIG } from "./config";
import { tokenStorage } from "./tokenStorage";

interface UserResponse {
  id: string;
  username: string;
  role: "USER" | "ADMIN";
  needsPasswordReset?: boolean;
}

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
      tokenStorage.setAccessToken(res.data.accessToken);
      tokenStorage.setRefreshToken(res.data.refreshToken);
    }

    return res.data.user as UserResponse;
  } catch (err) {
    throw err;
  }
};

export default login;
