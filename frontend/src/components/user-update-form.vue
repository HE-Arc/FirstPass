<script setup>
import { useUsersStore } from "../stores/users.store";
import { storeToRefs } from "pinia";
import { useAlertStore } from "../stores/alert.store";
import * as yup from "yup";
import { Form, Field } from "vee-validate";

const schema = yup.object().shape({
  username: yup.string().required(),
});
</script>
<script>
export default {
  name: "UserUpdateForm",
  props: {
    userId: Number,
  },
  methods: {
    async onSubmit(values) {
      const userStore = useUsersStore();
      await userStore.update(this.userId, values);
      this.$refs.form.resetForm();
    },
  },
};
</script>
<template>
  <div class="update-container">
    <h2>Update account informations</h2>
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
      <div class="invalid">
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
