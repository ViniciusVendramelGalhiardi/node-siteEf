import axios from "axios";
import secure from "config/secureLS";
import { API_BASE_URL, host } from "config/contants";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = secure.get("access-token");
  if (token?.data) {
    config.headers = {
      Authorization: `Bearer ${token.data}`,
    };
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error;

    if (response) {
      const token = secure.get("access-token");

      if (response.status === 401 && token?.data) {
        const newURL = host;

        secure.clear();
        window.location.href = newURL || "";
      }

      throw error.response.data;
    }
  }
);
