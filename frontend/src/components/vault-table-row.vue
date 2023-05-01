<script setup>
import { useVaultsStore } from "../stores/vaults.store";
import updatePairModal from "./update-pair-modal.vue";
</script>
<script>
export default {
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
    onModalClosed() {
      this.$emit("closed");
    },
    async deletePair() {
      const vaultStore = useVaultsStore();
      await vaultStore.deletePair(this.pairId);
      vaultStore.getPairs(this.vaultId);
      this.$emit("updatepairs");
    },
  },
  emits: ["closed"],
  props: {
    vaultId: Number,
    pairId: Number,
    thing: String,
    username: String,
    password: String,
    showActionsButton: Boolean,
  },
};
</script>
<template>
  <tr class="vault-table-body-row">
    <td class="vault-table-body-item">{{ thing }}</td>
    <td class="vault-table-body-item">
      <!-- <button class="btn-copy" v-on:click="copyToClipboard({{ Username }})"> -->
      <button class="btn-copy" @click="copyToClipboard(username)">
        {{ username }}<i class="fa-solid fa-copy"></i>
      </button>
    </td>
    <td class="vault-table-body-item">
      <!-- <button class="btn-copy" v-on:click="copyToClipboard({{ password }})"> -->
      <button class="btn-copy" @click="copyToClipboard(password)">
        {{ password }}<i class="fa-solid fa-copy"></i>
      </button>
    </td>
    <td
      class="vault-table-body-item vault-table-edit-col"
      v-if="showActionsButton"
    >
      <updatePairModal
        :vaultId="vaultId"
        :pairId="pairId"
        :application="thing"
        :username="username"
        :password="password"
        @closed="onModalClosed"
      />
      <button @click="deletePair()" class="btn-edit">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </td>
  </tr>
</template>
<style scoped>
.vault-table-body-item,
.btn-copy {
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem;
  background: transparent;
  border: none;
  width: 100%;
  color: var(--color-text);
  white-space: nowrap;
}

.btn-edit {
  display: inline;
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

.vault-table-body-item button {
  cursor: pointer;
}

.btn-copy i {
  margin-left: 1rem;
}

.vault-table-body-item > i {
  font-size: 1rem;
  margin-left: 0.5rem;
  color: var(--lastpass-red);
}

.vault-table-body-row,
.vault-table-body-item {
  border-bottom: 2px solid var(--color-text);
}

.vault-table-body-item {
  width: 10%;
  max-width: 25%;
}

.vault-table-edit-col {
  /* display: flex;
  justify-content: flex-end; */
  font-size: 1.5rem;
}

@media (min-width: 1024px) {
  .btn-copy i {
    margin-left: 3rem;
    transition: all 0.2s ease-in-out;
  }

  .btn-copy:hover i {
    color: var(--lastpass-red);
  }

  .vault-edit-heading-link,
  .vault-edit-link {
    transition: all 0.5s ease-in-out;
  }
}
</style>
