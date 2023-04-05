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
