<script setup>
import sideBarElement from "./side-bar-element.vue";
import { useVaultsStore } from "../stores/vaults.store";

const vaultStore = useVaultsStore();
vaultStore.getUserVaults();
const userVaults = JSON.parse(localStorage.getItem("vaults"));
</script>
<script>
export default {
  props: {
    vaultId: Number,
    vaultName: String,
  },
};
</script>
<template>
  <aside class="vault-aside">
    <h1>Vaults</h1>
    <sideBarElement
      v-for="vault in userVaults"
      :key="vault.id"
      :vaultId="vault.id"
      :vaultName="vault.name"
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
