<script setup>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useVaultsStore } from "../stores/vaults.store";
import { useImagesStore } from "../stores/images.store";

const schema = yup.object().shape({
  name: yup.string().required(),
  image: yup.string().optional(),
});

async function onSubmit(values) {
  const vaultsStore = useVaultsStore();
  const imagesStore = useImagesStore();
  let path =
    "https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
  //   if (values.image) {
  //     path = await imagesStore.saveImage(values.imagePath);
  //   }
  //   console.log(path);
  const { name } = values;
  await vaultsStore.createVault(name, path);
}
</script>
<template>
  <div class="create-container">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
      class="login-form"
    >
      <h1 class="login-heading">Create Vault</h1>
      <label for="name" class="label">Vault Name</label>
      <Field
        type="text"
        name="name"
        id="name"
        class="input text-input"
        :class="{ 'is-invalid': errors.name }"
        placeholder="Name"
      />
      <label for="image" class="label">Image</label>
      <Field
        type="file"
        accept="image/*"
        name="image"
        id="image"
        class="input image-input"
        :class="{ 'is-invalid': errors.imagePath }"
        placeholder="Image"
      />
      <div class="invalid">{{ errors.username }}{{ errors.password }}</div>
      <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
        <i v-show="isSubmitting" class="fa-duotone fa-spinner-third"></i>
        Create Vault
      </button>
    </Form>
  </div>
</template>
<style scoped>
.input {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
}

.label {
  width: 100%;
}
.create-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 5rem;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  padding: 2rem;
}

.image-input {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 1rem;
  outline: none;
}
</style>
