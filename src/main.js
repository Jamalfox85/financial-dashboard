import { createApp, provide, h } from "vue";
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

/* Apollo */
import gql from "graphql-tag";

/* Apex Chart */
import VueApexCharts from "vue3-apexcharts";

import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "https://dominant-stag-27.hasura.app/v1/graphql",
  headers: {
    "content-type": "application/json",
    "x-hasura-access-key":
      "d0KUY7BtHwKgjHnX5Bs8MspXLi0WqKefGRrq640cgHVeQJIIDu6p8gqI0rpneB2y",
  },
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(plugin, defaultConfig);
app.use(router);
app.use(Particles);
app.use(VueApexCharts);

app.mount("#app");
