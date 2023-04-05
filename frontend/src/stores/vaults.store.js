import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { useAlertStore } from "./alert.store";

const baseUrl = `${import.meta.env.VITE_API_URL}/vaults`;

export const useVaultsStore = defineStore({
  id: "vaults",
  state: () => ({
    vaults: [],
    vault: null,
  }),
  actions: {
    async getVaults() {
      try {
        this.vaults = await fetchWrapper.get(baseUrl);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getVault(id) {
      try {
        this.vault = await fetchWrapper.get(`${baseUrl}/${id}`);
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
        await fetchWrapper.put(`${baseUrl}/${vault.id}`, vault);
        const index = this.vaults.findIndex((v) => v.id === vault.id);
        this.vaults.splice(index, 1, vault);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async deleteVault(id) {
      try {
        await fetchWrapper.delete(`${baseUrl}/${id}`);
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
          `${import.meta.env.VITE_API_URL}/users/${userID}/vaults`
        );
        this.vaults = vaults.vaults;
        return this.vaults;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async createPair(vaultID, application, username, password) {
      // console.log("createPair");
      // console.log(vaultID);
      // console.log(application);
      // console.log(username);
      // console.log(password);
      try {
        await fetchWrapper.post(`${baseUrl}/${vaultID}/pairs`, {
          application,
          username,
          password,
        });
        this.vault = await this.getVault(vaultID);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getPairs(vaultID) {
      try {
        let pairs = await fetchWrapper.get(`${baseUrl}/${vaultID}/pairs`);
        return pairs;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
  },
});
