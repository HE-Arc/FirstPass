export default {
  path: "/vaults",
  name: "Vaults",
  children: [
    {
      path: "/",
      name: "vaults",
      component: () => import("../views/VaultsView.vue"),
    },
    {
      path: "/:id",
      name: "vault",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/VaultDetailView.vue?vaultId=:id"),
    },
  ],
};
