<script setup>
import navBar from "../components/nav-bar.vue";
import userUpdatePasswordForm from "../components/user-update-password-form.vue";
import userUpdateForm from "../components/user-update-form.vue";
import { useAuthStore } from "../stores/auth.store";
import { useAlertStore } from "../stores/alert.store";
import { storeToRefs } from "pinia";
document.title = "FirstPass - Account";
</script>
<script>
const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);

export default {
  name: "AccountView",
  data: function () {
    return {
      userId: null,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      async () => {
        const authStore = useAuthStore();
        authStore.loadUserFromLocalStorage();
        this.userId = authStore.user.id;
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
};
</script>
<template>
  <header>
    <navBar />
  </header>
  <div class="login">
    <h1>Account</h1>
    <div v-if="alert" :class="alert.type">
      {{ alert.message }}
    </div>
    <div class="account-forms">
      <userUpdatePasswordForm :userId="userId" />
      <userUpdateForm :userId="userId" />
    </div>
  </div>
</template>

<style>
.account-forms {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 6rem;
}
.update-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  padding: 2rem;
}

@media screen and (min-width: 1024px) {
  .account-forms {
    flex-direction: row;
    gap: 4rem;
    justify-content: space-between;
  }
}
</style>
