<script setup>
import vaultTableRow from "./vault-table-row.vue";
import createPairModal from "./create-pair-modal.vue";
import inviteUser from "./invite-user.vue";
import { useVaultsStore } from "../stores/vaults.store";
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
    async getPairs() {
      this.dataReady = false;
      const vaultStore = useVaultsStore();
      this.pairs = await vaultStore.getPairs(this.vaultId);
      this.dataReady = true;
      console.log(this.pairs);
      return this.pairs;
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      async () => {
        await this.getPairs();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  data() {
    return {
      pairs: [],
      dataReady: false,
    };
  },
};
</script>
<template>
  <div class="container">
    <h1>
      <a href="#" class="vault-edit-heading-link">
        {{ vaultName }}
        <i class="fa-solid fa-pen-to-square"></i>
      </a>
    </h1>
    <table class="vault-table">
      <thead class="vault-table-heading">
        <tr class="vault-table-heading-row">
          <th class="vault-table-heading-item">Thing</th>
          <th class="vault-table-heading-item">Username</th>
          <th class="vault-table-heading-item">Password</th>
          <th class="vault-table-heading-item">
            <i class="fa-solid fa-pen-to-square"></i>
          </th>
        </tr>
      </thead>
      <tbody class="vault-table-body" v-if="dataReady">
        <vaultTableRow
          v-for="pair in pairs.pairs"
          :key="pair.id"
          :thing="pair.application"
          :username="pair.username"
          :password="pair.password"
        />
      </tbody>
      <div class="loader" v-else></div>
    </table>
    <div class="add-btn-container">
      <inviteUser :vaultId="vaultId" />
      <createPairModal :vaultId="vaultId" @closed="getPairs" />
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
