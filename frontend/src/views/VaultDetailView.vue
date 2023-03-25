<script setup>
import navBar from "../components/nav-bar.vue";
import vault from "../components/vault-view.vue";
import sideBar from "../components/side-bar.vue";
import { useRoute } from "vue-router";
import { useVaultsStore } from "../stores/vaults.store";

document.title = "FirstPass - Vault";
</script>

<script>
export default {
  methods: {
    async getVault() {
      const vaultStore = useVaultsStore();
      this.vaultObj = await vaultStore.getVault(this.getId());
      this.dataReady = true;
      return this.vaultObj;
    },
    getId() {
      const route = useRoute();
      return Number(route.params.id);
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      async () => {
        await this.getVault();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  data() {
    return {
      vaultObj: [],
      vaultId: this.getId(),
      dataReady: false,
    };
  },
};
</script>

<template>
  <header>
    <navBar />
  </header>
  <body>
    <sideBar />
    <div class="main" v-if="!dataReady">
      <div class="loader"></div>
    </div>
    <div class="main" v-if="dataReady">
      <vault :vaultName="this.vaultObj.vault.name" :vaultId="this.vaultId" />
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
