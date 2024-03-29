<script setup>
import { storeToRefs } from "pinia";
import { Form, Field } from "vee-validate";
import * as yup from "yup";

import { useUsersStore } from "../stores/users.store";
import { useAlertStore } from "../stores/alert.store";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  verification: yup
    .string()
    .required("Password verification is required")
    .min(8, "Password verification must be at least 8 characters long"),
});

async function onSubmit(values) {
  const usersStore = useUsersStore();
  await usersStore.register(values);
}
</script>
<script>
const alertStore = useAlertStore();

const { alert } = storeToRefs(alertStore);

export default {
  name: "register-part",
  data() {
    return {
      username: "",
      password: "",
      passwordVerif: "",
      alert,
    };
  },
  methods: {
    checkPasswordMatch() {
      const password = document.getElementById("password").value;
      const passwordVerif = document.getElementById("verification").value;
      if (password !== passwordVerif) {
        document
          .getElementById("verification")
          .classList.add("password-mismatch");
      } else {
        document
          .getElementById("verification")
          .classList.remove("password-mismatch");
      }
    },
    registerUser() {
      this.$store
        .dispatch("registerUser", {
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
          passwordVerif: document.getElementById("verification").value,
        })
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
  },
};
</script>
<template>
  <div class="login-container">
    <div v-if="alert" :class="alert.type">
      {{ alert.message }}
    </div>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="login-form"
      v-slot="{ errors, isSubmitting }"
    >
      <h1 class="login-heading">Register</h1>
      <label for="username" class="label">Username</label>
      <Field
        type="text"
        name="username"
        id="username"
        class="input text-input"
        :class="{ 'is-invalid': errors.username }"
        placeholder="Username"
      />
      <label for="password" class="label">Password</label>
      <Field
        type="password"
        name="password"
        id="password"
        class="input password-input"
        :class="{ 'is-invalid': errors.password }"
        placeholder="Password"
        v-on:keyup="checkPasswordMatch()"
      />
      <Field
        type="password"
        name="verification"
        id="verification"
        class="input password-input"
        :class="{ 'is-invalid': errors.passwordVerif }"
        placeholder="Password again"
        hint="Passwords must match"
        v-on:keyup="checkPasswordMatch()"
      />
      <div class="invalid">
        {{ errors.username }}
        {{ errors.password }}
        {{ errors.passwordVerif }}
      </div>
      <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
        <i v-show="isSubmitting" class="fa-duotone fa-spinner-third"></i>
        Register
      </button>
    </Form>
  </div>
</template>

<style scoped>
.password-mismatch {
  outline: 2px solid var(--lastpass-red);
  outline-offset: 2px;
}
</style>
