import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8083/api/v1", // your backend URL
  withCredentials: true, // for cookies (important for auth)
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    //Prevent infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest?.url?.includes("/user/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/user/refresh");

        const { accessToken } = res.data;

        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);

      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api