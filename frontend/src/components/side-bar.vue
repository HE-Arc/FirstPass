<script setup>
import sideBarElement from "./side-bar-element.vue";
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
  <aside class="vault-aside">
    <div class="wrapper loading-container" v-if="!dataReady">
      <div class="loader"></div>
    </div>
  </aside>
  <aside class="vault-aside" v-if="dataReady">
    <h1>Vaults</h1>
    <sideBarElement
      v-for="vault in vaults"
      :key="vault.id"
      :vaultId="vault.id"
      :vaultName="vault.name"
      :currentVaultId="vaultId"
    />
  </aside>
</template>

<style scoped>
.vault-aside {
  display: none;
}

@media (min-width: 1024px) {
  .vault-aside {
    display: block;
    min-width: fit-content;
    width: 16rem;
    max-width: 150px;
    position: fixed;
    z-index: 1;
    left: 0;
    top: var(--navbar-height);
    background: var(--color-sidebar);
    overflow-x: hidden;
    padding: 0.5rem 0;
    height: 100%;
  }

  .vault-aside h1 {
    font-size: 1.5rem;
    text-align: center;
    padding: 0.5rem 0;
    color: var(--color-text);
    border-bottom: 5px solid var(--lastpass-red);
    text-transform: uppercase;
  }
}
</style>
