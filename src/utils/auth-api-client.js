import axios, { AxiosError } from "axios";
const authApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/auth",
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
      return error.response.data;
    }
    console.log("Error login user:", error);
  }
};
