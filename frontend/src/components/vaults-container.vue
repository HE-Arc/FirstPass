<script setup>
import vaultCard from "./vault-card.vue";
import { useVaultsStore } from "../stores/vaults.store";
import { ref } from "vue";

const vaultStore = useVaultsStore();
vaultStore.getUserVaults();
const userVaults = ref(JSON.parse(localStorage.getItem("vaults"))).value;
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
  <vaultCard
    v-for="vault in userVaults"
    :key="vault.id"
    :vaultId="vault.id"
    :vaultName="vault.name"
    :vaultImagePath="vault.image_path"
  />
</template>
<style scoped></style>
