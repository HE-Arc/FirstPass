export default {
  path: "/account",
  name: "Account",
  children: [
    {
      path: "",
      name: "account",
      component: () => import("@/views/AccountView.vue"),
    },
    {
      path: "login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
  ],
};
