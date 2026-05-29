import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("NEXT_PUBLIC_API_URL =", API_URL);

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let inMemoryAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  inMemoryAccessToken = token;
};

export const getAccessToken = () => {
  return inMemoryAccessToken;
};

apiClient.interceptors.request.use(
  (config) => {
    console.log("REQUEST URL =>", `${config.baseURL}${config.url}`);

    if (inMemoryAccessToken && config.headers) {
      config.headers.Authorization = `Bearer ${inMemoryAccessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes("/auth/refresh")) {
      if (typeof window !== "undefined") {
        setAccessToken(null);
        window.dispatchEvent(new Event("auth_session_expired"));
      }

      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post("/auth/refresh");

        const { accessToken } = response.data;

        setAccessToken(accessToken);

        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        isRefreshing = false;

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        isRefreshing = false;

        if (typeof window !== "undefined") {
          setAccessToken(null);

          window.dispatchEvent(
            new Event("auth_session_expired")
          );
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);