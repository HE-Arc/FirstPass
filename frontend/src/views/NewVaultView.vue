<script setup>
import navBar from "../components/nav-bar.vue";
import createVaultForm from "../components/create-vault-form.vue";
</script>
<template>
  <header>
    <navBar></navBar>
  </header>
  <div class="main">
    <createVaultForm></createVaultForm>
  </div>
</template>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  margin-top: 5rem;
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 1024px) {
  .main {
    width: 40%;
  }
}
</style>
