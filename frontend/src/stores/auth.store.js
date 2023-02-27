import { defineStore } from "pinia";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { router as myRouter } from "../router";
import { useAlertStore } from "./alert.store";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      const alertStore = useAlertStore();
      try {
        const user = await fetchWrapper.post(`${baseUrl}/login/`, {
          username,
          password,
        });

        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
        const alertStore = useAlertStore();
        alertStore.success("Login successful");
        myRouter.push({ name: "home" });
      } catch (err) {
        alertStore.error(err);
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.user = null;
      myRouter.push("/login");
    },
  },
});
