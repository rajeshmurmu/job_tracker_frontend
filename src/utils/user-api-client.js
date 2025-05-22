import axios, { AxiosError } from "axios";

axios.defaults.withCredentials = true;

const authApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
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
