<script setup>
import vaultCard from "./vault-card.vue";
import { useVaultsStore } from "../stores/vaults.store";
</script>
<script>
export default {
  props: {
    vaultId: Number,
    vaultName: String,
  },
  methods: {
    async getVaults() {
      this.dataReady = false;
      this.vaults = [];
      const vaultStore = useVaultsStore();
      this.vaults = await vaultStore.getUserVaults();
      this.dataReady = true;
      console.log(this.vaults);
      return this.vaults;
    },
  },
  data() {
    return {
      vaults: this.getVaults(),
      dataReady: this.dataReady,
    };
  },
};
</script>
<template>
  <div class="wrapper loading-container" v-if="!dataReady">
    <div class="loader"></div>
  </div>
  <div class="wrapper vaults-container" v-if="dataReady">
    <div class="vaults-container__empty" v-if="!vaults">
      <h1>No vaults found</h1>
    </div>
    <vaultCard
      v-else
      v-for="vault in vaults"
      :key="vault.id"
      :vaultId="vault.id"
      :vaultName="vault.name"
      :vaultImagePath="vault.image_path"
    />
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>
