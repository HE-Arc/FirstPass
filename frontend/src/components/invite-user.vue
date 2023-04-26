<script setup>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useInvitesStore } from "../stores/invites.store";
import { useUsersStore } from "../stores/users.store";

const schema = yup.object().shape({
  user: yup.string().required(),
  accessLevel: yup.string().required(),
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
  emits: ["closed"],
  methods: {
    async onSubmit(values) {
      console.log(values);
      const invitesStore = useInvitesStore();
      const userStore = useUsersStore();
      const { user, accessLevel } = values;
      const userId = userStore.getByUsername(user).id;
      await invitesStore.createInvite(this.vaultId, userId, accessLevel);
      this.$emit("closed");
      this.open = false;
    },
  },
};
</script>
<template>
  <button class="btn btn-create-pair" @click="open = true">
    Invite a user
  </button>

  <Teleport to="body">
    <Form
      v-if="open"
      class="modal"
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <h1>Invite</h1>
      <div class="input-group">
        <label for="user">Username</label>
        <Field type="text" placeholder="Username" id="user" name="user" />
      </div>

      <div class="input-group">
        <label for="access">Access level</label>
        <Field id="accessLevel" name="accessLevel" as="select">
          <option value="R">Read</option>
          <option value="W">Write</option>
          <option value="O">Owner</option>
        </Field>
      </div>
      <div class="btn-container">
        <button type="submit" class="btn btn-submit">Invite</button>
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
  width: 10rem;
  align-self: flex-end;
  justify-self: flex-end;
}

.btn-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

@media screen and (min-width: 1024px) {
  .modal {
    min-width: 30%;
    width: fit-content;
    left: 35%;
  }
}
</style>
