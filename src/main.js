import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

/* Bootstrap */
import "bootstrap";

/* Start FontAwesome Import */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
/* End FontAwesome Import */

/* Formkit */
import { plugin, defaultConfig } from "@formkit/vue";
import "@formkit/themes/genesis";

/* Particles */
import Particles from "vue3-particles";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(plugin, defaultConfig);
app.use(router);
app.use(Particles);

app.mount("#app");
