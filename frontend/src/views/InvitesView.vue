<script setup>
import navBar from "../components/nav-bar.vue";
import invitesPage from "../components/invites-page.vue";
</script>
<template>
  <header>
    <navBar />
  </header>
  <div class="invites-container">
    <h1>Invites</h1>
    <invitesPage class="invites" />
  </div>
</template>
<style scoped>
h1 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.invites {
  margin-top: 1rem;
  width: 100%;
}

.invites-container {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
}

@media screen and (min-width: 1024px) {
  .invites {
    width: 50%;
  }
}
</style>
