<script setup>
import { useInvitesStore } from "../stores/invites.store";
import { useUsersStore } from "../stores/users.store";
import { useVaultsStore } from "../stores/vaults.store";
</script>
<script>
export default {
  methods: {
    async getInvites() {
      this.dataReady = false;
      const invitesStore = useInvitesStore();
      const usersStore = useUsersStore();
      const vaultsStore = useVaultsStore();

      const user = JSON.parse(localStorage.getItem("user")).user;
      const inv = await invitesStore.getUserInvites(user.id);
      this.invites = inv.invitations;
      for (let i = 0; i < this.invites.length; i++) {
        const vault = await vaultsStore.getVault(this.invites[i].vault);
        const user = await usersStore.getById(this.invites[i].account);
        this.invites[i] = {
          ...this.invites[i],
          vaultName: vault.vault.name,
          username: user.user.username,
        };
      }
      this.dataReady = true;
    },
    async acceptInvite(inviteId) {
      const invitesStore = useInvitesStore();
      await invitesStore.acceptInvite(inviteId);
      await this.getInvites();
    },
    async declineInvite(inviteId) {
      const invitesStore = useInvitesStore();
      await invitesStore.declineInvite(inviteId);
      await this.getInvites();
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      async () => {
        await this.getInvites();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  data() {
    return {
      invites: [],
      dataReady: false,
    };
  },
};
</script>
<template>
  <div class="contain">
    <table class="invite-table" v-if="invites.length > 0 && dataReady">
      <thead class="table-head">
        <tr class="table-row">
          <th>Vault</th>
          <th>Inviter</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr class="table-row" v-for="invite in invites" :key="invite.id">
          <td>{{ invite.vaultName }}</td>
          <td>{{ invite.username }}</td>
          <td>
            <button
              class="btn btn-accept"
              @click="this.acceptInvite(invite.id)"
            >
              Accept
            </button>
            <button
              class="btn btn-decline"
              @click="this.declineInvite(invite.id)"
            >
              Decline
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <h1>Nobody invited you, poor boy.</h1>
    </div>
  </div>
</template>
<style scoped>
.table-head {
  background-color: var(--lastpass-red);
  border-radius: 0.2rem 0.2rem 0 0;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}
.table-head > tr > th {
  padding: 0.5rem;
}
.invite-table {
  width: 100%;
}

.table-body {
  background-color: var(--color-body-background);
  border-radius: 0 0 0.2rem 0.2rem;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 400;
}

.btn {
  width: fit-content;
}

.btn-accept {
  background-color: green;
  color: var(--color-body-background);
}

.btn-decline {
  background-color: red;
  color: var(--color-body-background);
}

@media screen and (min-width: 1024px) {
  .btn-accept:hover {
    background-color: rgb(0, 100, 0);
  }
  .btn-decline:hover {
    background-color: rgb(187, 0, 0);
  }
}
</style>
