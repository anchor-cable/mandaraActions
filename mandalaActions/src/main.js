import "shitajicss/docs/css/shitaji.min.css";
import "./scss/style.scss";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
