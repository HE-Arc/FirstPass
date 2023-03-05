<script setup></script>
<script>
export default {
  props: {
    vaultId: Number,
    vaultName: String,
  },
};
</script>
<template>
  <RouterLink
    :to="'/vaults/' + vaultId"
    class="side-link"
    :vault-name="vaultName"
    >{{ vaultName }}</RouterLink
  >
</template>

<style scoped>
.side-link {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.8rem 0.5rem;
  padding-inline: auto;
  text-decoration: none;
  font-size: 1.2rem;
  color: var(--color-text);
  border-bottom: 2px solid var(--lastpass-dark-grey);
}

.side-link:hover {
  color: var(--lastpass-red);
}
</style>
