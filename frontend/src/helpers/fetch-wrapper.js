import { useAuthStore } from "../stores/auth.store";
import { readCookie } from "./cookie-manager.js";

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method) {
  return (url, body) => {
    const options = { method, headers: {} };
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.headers["Accept"] = "application/json";
      options.headers["x-csrftoken"] = readCookie("csrftoken");
      options.body = JSON.stringify(body);
    }

    return fetch(url, options).then(handleResponse);
  };
}

async function handleResponse(response) {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  console.log(`Is JSON ${isJson}`);
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const { user, logout } = useAuthStore();
    if ([401, 403].includes(response.status) && user) {
      logout();
      location.reload(true);
    }

    const error = (data && data.message) || response.status;
    return Promise.reject(error);
  }
  return data;
}
