import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router as router } from "./router/index.js";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);

app.mount("#app");
