<script setup>
import { useInvitesStore } from "../stores/invites.store";

const invitesStore = useInvitesStore();
let user = localStorage.getItem("user");
invitesStore.getUserInvites(user.id);
const invites = invitesStore.invites;
</script>
<template>
  <div class="contain">
    <table class="invite-table">
      <thead class="table-head">
        <tr class="table-row">
          <th>Invitee</th>
          <th>Inviter</th>
          <th>Invite Date</th>
          <th>Invite Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr class="table-row" v-for="invite in invites" :key="invite.id">
          <td>{{ invite.email }}</td>
          <td>{{}}</td>
          <td>{{}}</td>
          <td>{{}}</td>
          <td>
            <button class="btn btn-accept">Accept</button>
            <button class="btn btn-decline">Decline</button>
          </td>
        </tr>
        <tr class="table-row">
          <td>Invitee</td>
          <td>Invited</td>
          <td>date</td>
          <td>status</td>
          <td>
            <button class="btn btn-accept">Accept</button>
            <button class="btn btn-decline">Decline</button>
          </td>
        </tr>
      </tbody>
    </table>
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
