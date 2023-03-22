<script setup>
import navBar from "../components/nav-bar.vue";
import vault from "../components/vault-view.vue";
import sideBar from "../components/side-bar.vue";

import { useVaultsStore } from "../stores/vaults.store";

document.title = "FirstPass - Vault";
</script>

<script>
export default {
  props: {
    vaultId: Number,
    vaultName: String,
  },
  methods: {
    async getVault() {
      const vaultStore = useVaultsStore();
      this.vault = await vaultStore.getVault(this.vaultId);
      this.dataReady = true;
    },
  },
  data() {
    return {
      vault: this.getVault(),
      dataReady: this.dataReady,
    };
  },
};
</script>

<template>
  <header>
    <navBar />
  </header>
  <body>
    <div class="main">
      <sideBar />
      <vault :vault-name="vaultName" :vaultId="vaultId" />
    </div>
  </body>
</template>

<style scoped>
header {
  line-height: 1.5;
}

body {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center;
  align-items: center; */
  padding: 0 2rem;
  gap: 2rem;
  min-height: 100vh;
}

.main {
  overflow-x: scroll;
  overflow-y: hidden;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    position: sticky;
    top: 0;
    z-index: 101;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .main {
    width: 100%;
    margin-left: min(5vw, 130px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    gap: 2rem;
  }
}
</style>
