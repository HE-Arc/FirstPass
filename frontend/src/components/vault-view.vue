<script setup>
import * as yup from "yup";
import { Form, Field } from "vee-validate";
import vaultTableRow from "./vault-table-row.vue";
import createPairModal from "./create-pair-modal.vue";
import inviteUser from "./invite-user.vue";
import { useVaultsStore } from "../stores/vaults.store";

const schema = yup.object().shape({
  name: yup.string().required(),
});
</script>
<script>
export default {
  props: {
    vaultId: Number,
    vaultName: String,
    thing: String,
    username: String,
    password: String,
  },
  methods: {
    async loadPairs() {
      this.dataReady = false;
      const vaultStore = useVaultsStore();
      this.pairs = (await vaultStore.getPairs(this.vaultId)).pairs;
      this.dataReady = true;
      return this.pairs;
    },
    async loadVault() {
      this.dataReady = false;
      const vaultStore = useVaultsStore();
      this.vault = (await vaultStore.getVault(this.vaultId)).vault;
      this.accessLevel = await vaultStore.getVaultAccessLevel(this.vaultId);
      this.dataReady = true;
      return this.pairs;
    },
    async deleteVault() {
      const vaultStore = useVaultsStore();
      await vaultStore.deleteVault(this.vaultId);
      this.$router.push({ name: "vaults" });
    },
    toggleEditingTitle() {
      this.editingTitle = !this.editingTitle;
    },
    async onSaveTitle(values) {
      const vaultStore = useVaultsStore();
      this.vault.name = values.name;
      await vaultStore.updateVault(this.vault);
      this.toggleEditingTitle();
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      async () => Promise.allSettled([this.loadPairs(), this.loadVault()]),
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  data() {
    return {
      pairs: [],
      dataReady: false,
      vault: {},
      editingTitle: false,
      accessLevel: null,
    };
  },
};
</script>
<template>
  <div class="container">
    <h1>
      <span v-if="!editingTitle" class="vault-edit-heading-link">
        {{ vault.name }}
        <i
          class="fa-solid fa-pen-to-square"
          @click="toggleEditingTitle"
          v-if="accessLevel === 'O'"
        ></i>
      </span>
      <Form
        @submit="onSaveTitle"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
        class="edit-title-form"
        v-else
      >
        <Field
          type="text"
          name="name"
          id="name"
          class="input text-input"
          :class="{ 'is-invalid': errors.name }"
          placeholder="Name"
        />
        <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
          <i v-show="isSubmitting" class="fa-duotone fa-spinner-third"></i>
          Save
        </button>
        <button
          type="button"
          class="btn"
          :disabled="isSubmitting"
          @click="toggleEditingTitle"
        >
          <i v-show="isSubmitting" class="fa-duotone fa-spinner-third"></i>
          Cancel
        </button>
      </Form>
    </h1>
    <table class="vault-table">
      <thead class="vault-table-heading">
        <tr class="vault-table-heading-row">
          <th class="vault-table-heading-item">Thing</th>
          <th class="vault-table-heading-item">Username</th>
          <th class="vault-table-heading-item">Password</th>
          <th
            class="vault-table-heading-item"
            v-if="accessLevel === 'W' || accessLevel === 'O'"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </th>
        </tr>
      </thead>
      <tbody class="vault-table-body" v-if="dataReady">
        <vaultTableRow
          v-for="pair in pairs"
          :key="pair.id"
          :vaultId="vaultId"
          :pairId="pair.id"
          :thing="pair.application"
          :username="pair.username"
          :password="pair.password"
          :showActionsButton="accessLevel === 'W' || accessLevel === 'O'"
          @closed="loadPairs"
          @updatepairs="loadPairs"
        />
      </tbody>
      <div class="loader" v-else></div>
    </table>
    <div class="add-btn-container">
      <createPairModal
        :vaultId="vaultId"
        @closed="loadPairs"
        v-if="accessLevel === 'W' || accessLevel === 'O'"
      />
      <inviteUser :vaultId="vaultId" v-if="accessLevel === 'O'" />
      <button
        class="btn btn-create-pair"
        v-if="accessLevel === 'O'"
        @click="deleteVault"
      >
        Delete vault
      </button>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: var(--color-body-background);
  display: flex;
  flex-direction: column;
  top: 5rem;
}
.container h1 {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 1rem;
}
.vault-table {
  display: table;
  width: min(10rem, 100%);
}

.vault-table-heading {
  background-color: var(--lastpass-red);
  color: whitesmoke;
}

.vault-table-heading-item {
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem;
  height: 3rem;
}

.vault-edit-heading-link {
  display: flex;
  color: var(--color-text);
  text-decoration: none;
  gap: 5rem;
  align-items: center;
  width: fit-content;
}

.add-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  flex-direction: column;
}

.btn-add {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--lastpass-red);
  color: whitesmoke;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.5s ease-in-out;
}

.btn-create-pair {
  width: fit-content;
  align-self: flex-end;
  justify-self: flex-end;
}

.edit-title-form {
  display: flex;
  gap: 1rem;
  width: fit-content;
}

@media (min-width: 1024px) {
  .container {
    margin-inline: 5rem;
  }
  .vault-edit-heading-link,
  .vault-edit-link {
    transition: all 0.5s ease-in-out;
  }

  .vault-edit-heading-link:hover,
  .vault-edit-link:hover,
  .vault-edit-heading-link:focus,
  .vault-edit-link:focus {
    color: var(--lastpass-red);
  }
  .vault-table {
    width: clamp(20rem, 100%, 40rem);
  }

  .vault-edit-heading-link {
    font-size: 2rem;
    gap: 1rem;
  }
  .vault-table-heading-item {
    font-size: 1.2rem;
  }

  .btn-add::after {
    margin-left: 0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    content: "Add Entry";
  }
  .btn-add:hover {
    background-color: var(--lastpass-red-dark);
  }

  .add-btn-container {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
