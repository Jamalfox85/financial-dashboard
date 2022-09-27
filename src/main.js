import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";

import "./index.css";

/* Start FontAwesome Import */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
/* End FontAwesome Import */

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
