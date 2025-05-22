import axios, { AxiosError } from "axios";

axios.defaults.withCredentials = true;

const jobApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/jobs",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createJob = async (data) => {
  try {
    const response = await jobApi.post("/", data);

    if (response?.data?.success === false) {
      throw new Error(response?.data?.message);
    }

    return response.data;
  } catch (error) {
    // handle axios error
    if (error instanceof AxiosError) {
      console.log("Error creating job:", error);
      throw new Error(
        error.response?.data?.message ||
          `${
            error.response?.data?.error &&
            "Please fill all field carefully if this error occured continousily contact us"
          }` ||
          "An error occurred while creating the job"
      );
    }
    console.log("Error creating job:", error);
    throw new Error(
      error?.message || "An error occurred while creating the job"
    );
  }
};

export const fetchJobs = async () => {
  try {
    const response = await jobApi.get(`/`);

    if (response?.data?.success === false) {
      throw new Error(response?.data?.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error creating job:", error);
      throw new Error(
        error.response?.data?.message ||
          `${
            error.response?.data?.error &&
            "Please fill all field carefully if this error occured continousily contact us"
          }` ||
          "An error occurred while creating the job"
      );
    }
    console.log("Error creating job:", error);
    throw new Error(
      error?.message || "An error occurred while creating the job"
    );
  }
};
