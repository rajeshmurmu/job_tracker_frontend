import axios, { AxiosError } from "axios";
import _config from "../config/appConfig";

axios.defaults.withCredentials = true;

const authApi = axios.create({
  baseURL: `${_config.server_base_url}/api/v1/auth`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data) => {
  try {
    const response = await authApi.post("/register", data);

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error registering user:", error);
      return error.response.data;
    }
    console.log("Error registering user:", error);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await authApi.post("/login", data);

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error login user:", error);
      throw new Error(error.response.data.message || "Failed to login user");
    }
    console.log("Error login user:", error);
    throw new Error(error.message || "Failed to login user");
  }
};

export const logoutUser = async () => {
  try {
    const response = await authApi.post("/logout");

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error logout user:", error);
      throw new Error(error.response.data.message || "Failed to logout user");
    }
    console.log("Error logout user:", error);
    throw new Error(error.message || "Failed to logout user");
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await authApi.get("/refresh-token");

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error refreshing access token:", error);
      throw new Error(error.response.data.message || "Failed to refresh token");
    }
    console.log("Error refreshing access token:", error);
    throw new Error(error.message || "Failed to refresh token");
  }
};
