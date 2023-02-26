<script setup>
import vaultTableRow from "./vault-table-row.vue";
</script>
<script>
export default {
  props: {
    vaultName: String,
    thing: String,
    username: String,
    password: String,
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
      <tbody class="vault-table-body">
        <vaultTableRow
          :thing="'Test1'"
          :username="'user1'"
          :password="'pass1'"
        />
        <vaultTableRow
          :thing="'Test2'"
          :username="'user2'"
          :password="'pass2'"
        />
      </tbody>
    </table>
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
}
</style>
