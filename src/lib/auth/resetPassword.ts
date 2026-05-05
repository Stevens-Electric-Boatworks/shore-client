import { apiClient } from "./apiClient";

interface UserResponse {
  id: string;
  username: string;
  role: "USER" | "ADMIN";
  needsPasswordReset?: boolean;
}

async function resetPassword(newPassword: string) {
  try {
    const res = await apiClient.post("/auth/reset-password", {
      newPassword,
    });
    return res.data.user as UserResponse;
  } catch (err) {
    throw err;
  }
}

export default resetPassword;
