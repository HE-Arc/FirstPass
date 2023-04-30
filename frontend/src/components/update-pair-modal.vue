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
    pairId: Number,
    application: String,
    username: String,
    password: String,
  },
  data() {
    return {
      open: false,
    };
  },
  emits: ["closed"],
  methods: {
    async onSubmit(values) {
      const vaultsStore = useVaultsStore();
      const { application, username, password } = values;
      await vaultsStore.updatePair(
        this.vaultId,
        this.pairId,
        application,
        username,
        password
      );
      this.$emit("closed");
      this.open = false;
    },
  },
};
</script>
<template>
  <button @click="open = true" class="vault-edit-link">
    <i class="fa-solid fa-pen-to-square"></i>
  </button>

  <Teleport to="body">
    <Form
      v-if="open"
      class="modal"
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <h1>Update login</h1>
      <div class="input-group">
        <label for="application">Thing</label>
        <Field
          type="text"
          placeholder="Thing"
          id="application"
          name="application"
          :value="application"
        />
      </div>
      <div class="input-group">
        <label for="username">Username</label>
        <Field
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          :value="username"
        />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <Field
          type="text"
          placeholder="Password"
          id="password"
          name="password"
          :value="password"
        />
      </div>
      <div class="btn-container">
        <button type="submit" class="btn btn-submit">Update</button>
        <button class="btn" @click="open = false">Close</button>
      </div>
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
  width: fit-content;
  align-self: flex-end;
  justify-self: flex-end;
}

.btn-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 90%;
}

.vault-edit-link {
  display: flex;
  color: var(--color-text);
  text-decoration: none;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

@media screen and (min-width: 1024px) {
  .modal {
    min-width: 30%;
    width: fit-content;
    left: 35%;
  }
  .btn-container {
    flex-direction: row;
  }

  .vault-edit-link:hover,
  .vault-edit-link:focus {
    color: var(--lastpass-red);
  }
}
</style>
