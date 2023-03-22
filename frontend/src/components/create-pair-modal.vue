<script setup>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useVaultsStore } from "../stores/vaults.store";

const schema = yup.object().shape({
  application: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});
</script>
<script>
export default {
  props: {
    vaultId: Number,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    async onSubmit(values) {
      console.log(values);
      const vaultsStore = useVaultsStore();
      const { application, username, password } = values;
      console.log(application, username, password);
      await vaultsStore.createPair(
        this.vaultId,
        application,
        username,
        password
      );
      this.open = false;
    },
  },
};
</script>
<template>
  <button class="btn btn-create-pair" @click="open = true">
    Create new login
  </button>

  <Teleport to="body">
    <Form
      v-if="open"
      class="modal"
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <h1>Add new login</h1>
      <div class="input-group">
        <label for="application">Thing</label>
        <Field
          type="text"
          placeholder="Thing"
          id="application"
          name="application"
        />
      </div>
      <div class="input-group">
        <label for="username">Username</label>
        <Field
          type="text"
          placeholder="Username"
          id="username"
          name="username"
        />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <Field
          type="text"
          placeholder="Password"
          id="password"
          name="password"
        />
      </div>
      <button type="submit" class="btn btn-submit">Create</button>
    </Form>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 0;
  width: 100%;
  padding: 3rem;
  /* margin-left: -150px; */
  border-radius: 1rem;
  background-color: var(--lastpass-dark-grey);
  color: white;
}
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.btn-create-pair {
  width: 10rem;
  align-self: flex-end;
  justify-self: flex-end;
}

@media screen and (min-width: 1024px) {
  .modal {
    min-width: 30%;
    width: fit-content;
    left: 35%;
  }
}
</style>
