import { defineStore } from "pinia";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { router as myRouter } from "../router";
import { useAlertStore } from "./alert.store";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

//const alertStore = useAlertStore();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(email, password) {
      const alertStore = useAlertStore();
      try {
        const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
          email,
          password,
        });
        localStorage.setItem("user", JSON.stringify(user));
        this.user = user;
        useAlertStore.success("Login successful");
        myRouter.push(this.returnUrl || "/");
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
