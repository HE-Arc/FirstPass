import { defineStore } from "pinia";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { useAuthStore } from "./auth.store";
import { useAlertStore } from "./alert.store";

import { router } from "../router";

const authURL = `${import.meta.env.VITE_API_URL}/auth`;
const userURL = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: {},
    user: {},
  }),
  actions: {
    async register(user) {
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.post(`${authURL}/register/`, user);
        router.push({ name: "login" });
        alertStore.success({
          type: "success",
          message: "Registration successful",
        });
      } catch (err) {
        alertStore.error(err[0]);
      }
    },
    async getById(id) {
      this.user = { loading: true };
      try {
        this.user = await fetchWrapper.get(`${userURL}/${id}/`);
        return this.user;
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
    async getByUsername(username) {
      this.user = { loading: true };
      try {
        this.user = await fetchWrapper.get(`${userURL}/${username}/`);
        return this.user;
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
    async update(params) {
      const alertStore = useAlertStore();
      try {
        const user = await this.getByUsername(params.username);
        let id = user.user.id;
        await fetchWrapper.post(`${userURL}/${id}/`, params);
        const authStore = useAuthStore();
        if (id === authStore.user.id) {
          const user = { ...authStore.user, ...params };
          authStore.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          alertStore.addAlert({
            type: "success",
            message: "User updated successfully",
          });
        }
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
    async delete(id) {
      this.users.find((x) => x.id === id).isDeleting = true;
      try {
        await fetchWrapper.delete(`${authURL}/${id}/`);
        this.users = this.users.filter((x) => x.id !== id);

        const authStore = useAuthStore();
        if (id === authStore.user.id) {
          authStore.logout();
        }
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
  },
});
