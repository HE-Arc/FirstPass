<script setup>
import { useUsersStore } from "../stores/users.store";
import { storeToRefs } from "pinia";
import { useAlertStore } from "../stores/alert.store";
import * as yup from "yup";
import { Form, Field } from "vee-validate";

const schema = yup.object().shape({
  username: yup.string().required(),
  old_password: yup.string().required(),
  new_password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
</script>
<script>
const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);

export default {
  name: "UserUpdateForm",
  props: {
    userId: Number,
  },
  methods: {
    async onSubmit(values) {
      const userStore = useUsersStore();
      //   const { username, password, password_confirm } = values;
      await userStore.update(values);
      this.$refs.form.resetForm();
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
      v-slot="{ errors, isSubmitting }"
      class="login-form"
      ref="form"
    >
      <label for="username" class="label">Username</label>
      <Field
        type="text"
        name="username"
        id="username"
        class="input text-input"
        :class="{ 'is-invalid': errors.username }"
        placeholder="Username"
      />
      <label for="new_password" class="label">Current password</label>
      <Field
        type="password"
        name="old_password"
        id="old_password"
        class="input password-input"
        :class="{ 'is-invalid': errors.old_password }"
        placeholder="Password"
      />
      <label for="new_password" class="label">New password</label>
      <Field
        type="password"
        name="new_password"
        id="new_password"
        class="input password-input"
        :class="{ 'is-invalid': errors.new_password }"
        placeholder="Password"
      />
      <Field
        type="password"
        name="confirm_password"
        id="confirm_password"
        class="input password-input"
        :class="{ 'is-invalid': errors.passwordConfirmation }"
        placeholder="Password"
      />
      <div class="invalid">
        {{ errors.username }}
        {{ errors.password }}
        {{ errors.passwordConfirmation }}
      </div>
      <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
        <i v-show="isSubmitting" class="fa-duotone fa-spinner-third"></i>
        Update account
      </button>
    </Form>
  </div>
</template>
