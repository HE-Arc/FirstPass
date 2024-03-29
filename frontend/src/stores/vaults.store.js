import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { useAlertStore } from "./alert.store";

const baseUrl = `${import.meta.env.VITE_API_URL}/vaults`;
const pairsUrl = `${import.meta.env.VITE_API_URL}/pairs`;
export const useVaultsStore = defineStore({
  id: "vaults",
  state: () => ({
    vaults: [],
    vault: null,
  }),
  actions: {
    async getVaults() {
      try {
        this.vaults = await fetchWrapper.get(`${baseUrl}/`);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getVault(id) {
      try {
        this.vault = await fetchWrapper.get(`${baseUrl}/${id}/`);
        return this.vault;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async createVault(name, path) {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        let userID = user.user.id;

        await fetchWrapper.post(`${baseUrl}/`, {
          name,
          path,
          userID,
        });
        this.vaults = await this.getUserVaults();
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async updateVault(vault) {
      try {
        await fetchWrapper.post(`${baseUrl}/${vault.id}/`, vault);
        const index = this.vaults.findIndex((v) => v.id === vault.id);
        this.vaults[index] = vault;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async deleteVault(id) {
      try {
        await fetchWrapper.delete(`${baseUrl}/${id}/`);
        this.vaults = this.vaults.filter((v) => v.id !== id);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUserVaults() {
      let user = JSON.parse(localStorage.getItem("user"));
      let userID = user.user.id;
      try {
        let vaults = await fetchWrapper.get(
          `${import.meta.env.VITE_API_URL}/users/${userID}/vaults/`
        );
        this.vaults = vaults.vaults;
        return this.vaults;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        return { vaults: [] };
      }
    },
    async createPair(vaultID, application, username, password) {
      try {
        await fetchWrapper.post(`${baseUrl}/${vaultID}/pairs/`, {
          application,
          username,
          password,
        });
        this.vault = await this.getVault(vaultID);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        return { vault: {} };
      }
    },
    async updatePair(pairId, application, username, password) {
      try {
        await fetchWrapper.post(`${pairsUrl}/${pairId}/`, {
          application,
          username,
          password,
        });
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        return { vault: {} };
      }
    },
    async deletePair(pairId) {
      try {
        await fetchWrapper.delete(`${pairsUrl}/${pairId}/`);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        return { vault: {} };
      }
    },
    async getPairs(vaultID) {
      try {
        let pairs = await fetchWrapper.get(`${baseUrl}/${vaultID}/pairs/`);
        return pairs;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        return { pairs: [] };
      }
    },
    async getVaultAccessLevel(vaultID) {
      try {
        const { access_level } = await fetchWrapper.get(
          `${baseUrl}/${vaultID}/permission/`
        );
        return access_level;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        return { accessLevel: null };
      }
    },
  },
});
