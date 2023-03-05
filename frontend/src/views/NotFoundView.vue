<script setup>
import navBar from "../components/nav-bar.vue";

document.title = "FirstPass - Page not found";
</script>
<script></script>
<template>
  <header>
    <navBar />
  </header>
  <div class="main-div"><h1>Page not found</h1></div>
</template>
<style scoped>
.main-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  margin-top: 5rem;
  width: 40%;
  height: 100%;
}
</style>
