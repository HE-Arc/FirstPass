<script setup>
import navBar from "../components/nav-bar.vue";
import vaultsContainer from "../components/vaults-container.vue";

document.title = "FirstPass - Vaults";
</script>

<script></script>

<template>
  <header>
    <navBar />
  </header>
  <body>
    <div class="main">
      <vaultsContainer></vaultsContainer>
    </div>
    <div class="add-btn-container">
      <a href="vaults/new-vault" class="btn-add"
        ><i class="fa-solid fa-plus"></i
      ></a>
    </div>
  </body>
</template>

<style scoped>
header {
  line-height: 1.5;
}

body {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center;
  align-items: center; */
  padding: 0 2rem;
  gap: 2rem;
  min-height: 100vh;
}

.main {
  overflow-x: hidden;
  overflow-y: hidden;
}

.add-btn-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 1rem;
  width: 100%;
  height: 100%;
  position: sticky;
  top: 90%;
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

  .btn-add::after {
    margin-left: 0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    content: "Add Vault";
  }
  .btn-add:hover {
    background-color: var(--lastpass-red-dark);
  }
}
</style>
