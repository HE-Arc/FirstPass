<script setup>
import sideBarElement from "./side-bar-element.vue";
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
  <aside class="vault-aside">
    <h1>Vaults</h1>
    <sideBarElement :vaultId="1" vaultName="vault1" />
    <sideBarElement :vaultId="2" vaultName="vault2" />
    <sideBarElement :vaultId="3" vaultName="vault3" />
    <sideBarElement :vaultId="4" vaultName="vault4" />
    <sideBarElement :vaultId="5" vaultName="vault5" />
    <sideBarElement :vaultId="6" vaultName="vault6" />
    <sideBarElement :vaultId="7" vaultName="vault7" />
    <sideBarElement :vaultId="8" vaultName="vault8" />
    <sideBarElement :vaultId="9" vaultName="vault9" />
    <sideBarElement :vaultId="10" vaultName="vault10" />
    <sideBarElement :vaultId="11" vaultName="vault11" />
  </aside>
</template>

<style scoped>
.vault-aside {
  display: none;
}

@media (min-width: 1024px) {
  .vault-aside {
    display: block;
    min-width: fit-content;
    width: 16rem;
    max-width: 150px;
    position: fixed;
    z-index: 1;
    left: 0;
    top: var(--navbar-height);
    background: var(--color-sidebar);
    overflow-x: hidden;
    padding: 0.5rem 0;
    height: 100%;
  }

  .vault-aside h1 {
    font-size: 1.5rem;
    text-align: center;
    padding: 0.5rem 0;
    color: var(--color-text);
    border-bottom: 5px solid var(--lastpass-red);
    text-transform: uppercase;
  }
}
</style>
