<script setup>
import navBar from "../components/nav-bar.vue";
import registerPart from "../components/register-part.vue";

document.title = "FirstPass - Register";
</script>
<template>
  <header>
    <navBar />
  </header>
  <div class="login">
    <registerPart />
  </div>
</template>
<style scoped>
.login {
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
  .login {
    width: 40%;
  }
}
</style>
