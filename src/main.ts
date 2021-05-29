import { createApp } from "vue";
import App from "./App.vue";
import { inspect } from "@xstate/inspect";

import "./assets/styles.css";

// iframe added in /index.html
inspect();

createApp(App).mount("#app");
