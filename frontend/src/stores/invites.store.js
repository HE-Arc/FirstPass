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
    async createInvite(vaultId, accountId, accessLevel) {
      try {
        await fetchWrapper.post(`${invitesUrl}/`, {
          vaultId,
          accessLevel,
          accountId,
        });
        this.invites = await this.getUserInvites(accountId);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async acceptInvite(id) {
      try {
        await fetchWrapper.post(`${invitesUrl}/${id}/accept/`);
        let invitesCopy = this.invites;
        for (let i = 0; i < this.invites.length; i++) {
          if (this.invites[i].id != id) {
            invitesCopy.push(this.invites[i]);
          }
        }
        this.invites = invitesCopy;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async declineInvite(id) {
      try {
        await fetchWrapper.post(`${invitesUrl}/${id}/decline/`);
        this.invites = this.invites.filter((i) => i.id !== id);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
  },
});
