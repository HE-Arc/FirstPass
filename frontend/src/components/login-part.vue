<script setup>
import { storeToRefs } from "pinia";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useAlertStore } from "../stores/alert.store";
import { useAuthStore } from "../stores/auth.store";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const { username, password } = values;
  await authStore.login(username, password);
}
</script>
<script>
const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>
<template>
  <div class="login-container">
    <div v-if="alert" :class="alert.type">
      {{ alert.message }}
    </div>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
      class="login-form"
    >
      <h1 class="login-heading">Login</h1>
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
      />
      <div class="invalid">{{ errors.username }}{{ errors.password }}</div>
      <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
        <i v-show="isSubmitting" class="fa-duotone fa-spinner-third"></i>
        Login
      </button>
    </Form>
  </div>
</template>
