import { defineStore } from "pinia";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { useAuthStore } from "./auth.store";
import { useAlertStore } from "./alert.store";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: {},
    user: {},
  }),
  actions: {
    async register(user) {
      try {
        await fetchWrapper.post(`${baseUrl}/register`, user);
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
        return false;
      }
    },
    async getAll() {
      this.user = { loading: true };
      try {
        this.users = await fetchWrapper.get(baseUrl);
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
    async getById(id) {
      this.user = { loading: true };

      try {
        this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
    async update(id, params) {
      try {
        await fetchWrapper.put(`${baseUrl}/${id}`, params);
        const authStore = useAuthStore();
        if (id === authStore.user.id) {
          const user = { ...authStore.user, ...params };
          authStore.user = user;
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
    async delete(id) {
      this.users.find((x) => x.id === id).isDeleting = true;
      try {
        await fetchWrapper.delete(`${baseUrl}/${id}`);
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
