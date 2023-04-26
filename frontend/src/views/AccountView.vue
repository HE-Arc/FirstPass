<script setup>
import navBar from "../components/nav-bar.vue";
import userUpdateForm from "../components/user-update-form.vue";
document.title = "FirstPass - Account";
</script>
<script>
export default {
  name: "AccountView",
  props: {
    userId: Number,
  },
};
</script>
<template>
  <header>
    <navBar />
  </header>
  <div class="login">
    <h1>Account</h1>
    <userUpdateForm :userId="userId" />
  </div>
</template>
