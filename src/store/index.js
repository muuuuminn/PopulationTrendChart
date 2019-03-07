import Vue from "vue";
import Vuex from "vuex";

import apiCaller from "./apiCaller";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    apiCaller
  }
});
