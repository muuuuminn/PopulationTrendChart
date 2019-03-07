import apiConfig from "@/apiConfig";
import axios from "axios";

const state = {
  fetchprefectures: {}
};

const mutations = {};

const actions = {
  fetchPrefectures() {
    const instance = axios.create({
      baseURL: apiConfig.prefecturesAPI,
      headers: { "X-API-KEY": apiConfig.apiKey }
    });
    instance.get().then(res => {
      console.log(res.data.result);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
