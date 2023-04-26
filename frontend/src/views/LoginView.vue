<script setup>
import navBar from "../components/nav-bar.vue";
import loginPart from "../components/login-part.vue";

import { useAuthStore } from "../stores/auth.store";
import { router } from "../router";

const authStore = useAuthStore();
if (authStore.user) router.push("/");

document.title = "FirstPass - Login";
</script>
<template>
  <header>
    <navBar />
  </header>
  <div class="login">
    <loginPart />
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
