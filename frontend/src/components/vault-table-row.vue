<script setup></script>
<script>
export default {
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
  },
  props: {
    thing: String,
    username: String,
    password: String,
    showEditButtons: Boolean,
  },
};
</script>
<template>
  <tr class="vault-table-body-row">
    <td class="vault-table-body-item">{{ thing }}</td>
    <td class="vault-table-body-item">
      <!-- <button class="btn-copy" v-on:click="copyToClipboard({{ Username }})"> -->
      <button class="btn-copy" v-on:click="copyToClipboard(username)">
        {{ username }}<i class="fa-solid fa-copy"></i>
      </button>
    </td>
    <td class="vault-table-body-item">
      <!-- <button class="btn-copy" v-on:click="copyToClipboard({{ password }})"> -->
      <button class="btn-copy" v-on:click="copyToClipboard(password)">
        {{ password }}<i class="fa-solid fa-copy"></i>
      </button>
    </td>
    <td
      class="vault-table-body-item vault-table-edit-col"
      v-if="showEditButtons"
    >
      <a href="#" class="vault-edit-link">
        <i class="fa-solid fa-pen-to-square"></i>
      </a>
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

.vault-edit-link {
  display: flex;
  color: var(--color-text);
  text-decoration: none;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
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

  .vault-edit-link:hover,
  .vault-edit-link:focus {
    color: var(--lastpass-red);
  }
}
</style>
