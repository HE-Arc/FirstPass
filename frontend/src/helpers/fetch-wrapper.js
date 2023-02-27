import { useAuthStore } from "../stores/auth.store";

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method) {
  return (url, body) => {
    const options = { method, headers: authHeader(url) };
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    return fetch(url, options).then(handleResponse);
  };
}

function authHeader(url) {
  const { user } = useAuthStore();
  const isLogged = !!user?.token;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  return isLogged && isApiUrl ? { Authorization: `Bearer ${user.token}` } : {};
}

async function handleResponse(response) {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
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
