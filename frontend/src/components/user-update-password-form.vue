<script setup>
import { useUsersStore } from "../stores/users.store";
import { storeToRefs } from "pinia";
import { useAlertStore } from "../stores/alert.store";
import * as yup from "yup";
import { Form, Field } from "vee-validate";

const schema = yup.object().shape({
  old_password: yup.string().required(),
  new_password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
</script>
<script>
export default {
  name: "UserUpdatePasswordForm",
  props: {
    userId: Number,
  },
  methods: {
    async onSubmit(values) {
      const userStore = useUsersStore();
      //   const { username, password, password_confirm } = values;
      await userStore.updatePassword(this.userId, values);
      this.$refs.form.resetForm();
    },
  },
};
</script>
<template>
  <div class="update-container">
    <h2>Update password</h2>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
      class="login-form"
      ref="form"
    >
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
        {{ errors.password }}
        {{ errors.passwordConfirmation }}
      </div>
      <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
        <i v-show="isSubmitting" class="fa-duotone fa-spinner-third"></i>
        Update password
      </button>
    </Form>
  </div>
</template>
