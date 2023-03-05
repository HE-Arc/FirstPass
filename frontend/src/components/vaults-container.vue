<script setup>
import vaultCard from "./vault-card.vue";
</script>
<script>
export default {
  props: {
    vaults: Array,
    vaultId: Number,
    vaultName: String,
  },
  methods: {
    goToVault() {
      this.$router.push({ name: "vault", params: { vaultId: this.vaultId } });
    },
  },
};
</script>
<template>
  <vaultCard
    v-for="vault in vaults"
    :key="vault.id"
    :vault-id="vault.id"
    :vault-name="vault.name"
    :vault-image-path="vault.imagePath"
  />
</template>
<style scoped></style>
