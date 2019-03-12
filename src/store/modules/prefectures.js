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
  async requestPrefectures({ commit }) {
    try {
      const { data } = await axios.get(resas.prefecturesAPI, {
        headers: { "X-API-KEY": resas.apiKey }
      });
      commit("setPrefectures", data.result);
    } catch (error) {
      console.log(`Error:${error}`);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
