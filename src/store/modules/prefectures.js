import { resas } from "@/apiConfig";
import axios from "axios";

const state = {
  prefectures: []
};

const mutations = {
  setPrefectures(state, payload) {
    state.prefectures = payload;
  }
};

const actions = {
  requestPrefectures({ commit }) {
    axios({
      method: "GET",
      url: resas.prefecturesAPI,
      headers: { "X-API-KEY": resas.apiKey }
    })
      .then(response => {
        commit("setPrefectures", response.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
