import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import VaultsView from "../views/VaultsView.vue";

import { useAuthStore } from "../stores/auth.store";
import { useAlertStore } from "../stores/alert.store";

import accountRoutes from "./account.routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainView,
    },
    {
      path: "/vaults",
      name: "vaults",
      component: VaultsView,
    },
    {
      path: "/vaults/:id",
      name: "vault",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/VaultDetailView.vue?id=:id"),
    },
    {
      path: "/vaults/new-vault",
      name: "new-vault",
      component: () => import("../views/NewVaultView.vue"),
    },
    {
      path: "/invites",
      name: "invites",
      component: () => import("../views/InvitesView.vue"),
    },
    { ...accountRoutes },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

// export default firstpassFrontRouter;

router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  const publicPages = ["/", "/account/login", "/account/register"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return "/account/login";
  }
});
