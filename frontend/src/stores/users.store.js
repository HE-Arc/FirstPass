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
        alertStore.error(err);
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
    async updatePassword(userId, params) {
      const alertStore = useAlertStore();
      const authStore = useAuthStore();
      try {
        await fetchWrapper.post(`${userURL}/${userId}/password/`, params);
        alertStore.success("Password updated successfully");
        authStore.logout();
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
    async update(userId, params) {
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.post(`${userURL}/${userId}/`, params);
        alertStore.success("User updated successfully");
      } catch (err) {
        const alertStore = useAlertStore();
        console.log(err.message);
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
