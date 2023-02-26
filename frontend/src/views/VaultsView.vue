<script setup>
import navBar from "../components/nav-bar.vue";
import vaultCard from "../components/vault-card.vue";
</script>
<script>
export default {
  props: {
    vaultId: Number,
    vaultName: String,
  },
};
</script>
<template>
  <header>
    <navBar />
  </header>
  <body>
    <div class="main">
      <vaultCard
        :vault-id="1"
        :vault-name="'vault1'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="2"
        :vault-name="'vault2'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="3"
        :vault-name="'vault3'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="4"
        :vault-name="'vault4'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="5"
        :vault-name="'vault5'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="6"
        :vault-name="'vault6'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="7"
        :vault-name="'vault7'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="8"
        :vault-name="'vault8'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="9"
        :vault-name="'vault9'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="10"
        :vault-name="'vault10'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
      <vaultCard
        :vault-id="11"
        :vault-name="'vault11'"
        :vault-image-path="'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'"
      />
    </div>
  </body>
</template>

<style scoped>
header {
  line-height: 1.5;
}

body {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center;
  align-items: center; */
  padding: 0 2rem;
  gap: 2rem;
  min-height: 100vh;
}

.main {
  overflow-x: scroll;
  overflow-y: hidden;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    position: sticky;
    top: 0;
    z-index: 101;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .main {
    width: 100%;
    margin-left: min(5vw, 130px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    gap: 2rem;
  }
}
</style>
