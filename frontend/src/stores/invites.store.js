import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { useAlertStore } from "./alert.store";

const baseUrl = `${import.meta.env.VITE_API_URL}/invites`;

export const useInvitesStore = defineStore({
  id: "invites",
  state: () => ({
    invites: [],
    invite: null,
  }),
  actions: {
    async getUserInvites(userId) {
      try {
        this.invites = await fetchWrapper.get(`${baseUrl}/user/${userId}`);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getInvite(id) {
      try {
        this.invite = await fetchWrapper.get(`${baseUrl}/${id}`);
        return this.invite;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async createInvite(vaultID, email) {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        let userID = user.user.id;

        await fetchWrapper.post(`${baseUrl}/`, {
          vaultID,
          email,
          userID,
        });
        this.invites = await this.getUserInvites();
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async acceptInvite(id) {
      try {
        await fetchWrapper.put(`${baseUrl}/${id}`);
        this.invites = this.invites.filter((i) => i.id !== id);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
  },
});
