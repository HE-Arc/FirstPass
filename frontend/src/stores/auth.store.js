import { defineStore } from "pinia";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { router as myRouter } from "../router";
import { useAlertStore } from "./alert.store";
import { deleteCookie } from "../helpers/cookie-manager";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user"))?.user || null,
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
        const alertStore = useAlertStore();

        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
        alertStore.success("Login successful");
        myRouter.push({ name: "vaults" });
      } catch (err) {
        alertStore.error(err);
      }
    },
    logout() {
      localStorage.removeItem("user");
      deleteCookie("csrftoken");
      this.user = null;
      myRouter.push("/login");
    },
    loadUserFromLocalStorage() {
      this.user = JSON.parse(localStorage.getItem("user")).user;
    },
  },
});
