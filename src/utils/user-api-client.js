import axios, { AxiosError } from "axios";
import _config from "../config/appConfig";

axios.defaults.withCredentials = true;

const authApi = axios.create({
  baseURL: `${_config.server_base_url}/api/v1/users`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUser = async () => {
  try {
    const response = await authApi.get("/me");

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error fetching user:", error);
      return error.response.data;
    }
    console.log("Error fetching user:", error);
  }
};

export const updateUser = async (data) => {
  try {
    const response = await authApi.put("/me", data);

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error updating user:", error);
      throw new Error(
        error.response.data.message || "Error occured while updating user"
      );
    }
    console.log("Error updating user:", error);
    throw new Error(error.message || "Error occured while updating user");
  }
};

export const uploadAvatar = async (data) => {
  try {
    const response = await authApi.put("/me/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error updating user:", error);
      throw new Error(
        error.response.data.message || "Error occured while updating user"
      );
    }
    console.log("Error updating user:", error);
    throw new Error(error.message || "Error occured while updating user");
  }
};

export const deleteAvatar = async () => {
  try {
    const response = await authApi.delete("/me/avatar");

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error deleting avatar:", error);
      throw new Error(
        error?.response?.data?.message || "Error occured while deleting avatar"
      );
    }
    console.log("Error deleting avatar:", error);
    throw new Error(error?.message || "Error occured while deleting avatar");
  }
};
