import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { useAlertStore } from "./alert.store";

const invitesUrl = `${import.meta.env.VITE_API_URL}/invitations`;
const userUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useInvitesStore = defineStore({
  id: "invites",
  state: () => ({
    invites: [],
    invite: null,
  }),
  actions: {
    async getUserInvites(userId) {
      try {
        this.invites = await fetchWrapper.get(
          `${userUrl}/${userId}/invitations/`
        );
        return this.invites;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async createInvite(vaultID, accountId, accessLevel) {
      try {
        await fetchWrapper.post(`${invitesUrl}/`, {
          vaultID,
          accessLevel,
          accountId,
        });
        this.invites = await this.getUserInvites();
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async acceptInvite(id) {
      try {
        await fetchWrapper.put(`${invitesUrl}/${id}/accept/`);
        this.invites = this.invites.filter((i) => i.id !== id);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async declineInvite(id) {
      try {
        await fetchWrapper.put(`${invitesUrl}/${id}/decline/`);
        this.invites = this.invites.filter((i) => i.id !== id);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
  },
});
