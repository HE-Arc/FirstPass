export default {
  path: "/account",
  name: "Account",
  children: [
    {
      path: "",
      name: "Account",
      component: () => import("@/views/AccountView.vue"),
    },
    {
      path: "login",
      name: "Login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "register",
      name: "Register",
      component: () => import("@/views/RegisterView.vue"),
    },
  ],
};
