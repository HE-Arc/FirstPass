<script setup>
import { RouterLink } from "vue-router";
</script>
<script>
export default {
  props: {
    vaultId: Number,
    vaultName: String,
    vaultImagePath: String,
  },
};
</script>
<template>
  <RouterLink
    class="vault-link"
    :to="'/vaults/' + vaultId"
    :vault-name="vaultName"
    :id="Number(vaultId)"
  >
    <div class="card">
      <div class="card-header">
        <img class="vault-image" :src="vaultImagePath" alt="image" />
      </div>
      <div class="card-body">
        <h1 class="vault-name">{{ vaultName }}</h1>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
  display: flex;
  width: fit-content;
  height: fit-content;
  margin: 1em;
}
.card {
  --img-height: 75%;
  --hover-transition: all 0.3s ease-in-out;
  --border-radius: 1rem;
  --hover-border-radius: calc(var(--border-radius) / 2);
  --hover-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.38);
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  width: clamp(100px, 30vw, 150px);
  height: clamp(100px, 30vw, 150px);
  background-color: var(--lastpass-light-grey);
  transition: var(--hover-transition);
}
.card-header {
  display: flex;
  width: 100%;
  height: var(--img-height);
  background-color: var(--lastpass-red);
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius) var(--border-radius) 0.3rem 0.3rem;
  overflow: hidden;
  transition: var(--hover-transition);
}

.vault-image {
  min-height: 100px;
  min-width: 100px;
  max-width: 150px;
  max-height: 150px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  transition: var(--hover-transition);
}

.card-body {
  min-height: 2rem;
  display: flex;
  width: 100%;
  height: calc(100% - var(--img-height));
  justify-content: center;
  align-items: center;
}

.vault-name {
  height: 100%;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--lastpass-dark-grey);
  transition: var(--hover-transition);
}

.vault-link:hover .vault-image,
.vault-link:focus .vault-image,
.vault-link:hover .card-header,
.vault-link:focus .card-header {
  border-radius: var(--hover-border-radius) var(--hover-border-radius) 0.3rem
    0.3rem;
}
.vault-link:hover .vault-name,
.vault-link:focus .vault-name {
  color: white;
}
.vault-link:hover .card,
.vault-link:focus .card {
  background-color: var(--lastpass-dark-grey);
  color: white;
  border-radius: var(--hover-border-radius);
  box-shadow: var(--hover-shadow);
  scale: 1.05;
}
</style>
