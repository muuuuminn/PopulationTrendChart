import apiConfig from "@/apiConfig";
import axios from "axios";
import palette from "google-palette";

const state = {
  prefectures: [],
  columns: [],
  labels: [],
  colorList: palette("mpn65", 47).map(function(hex) {
    return "#" + hex;
  })
};

const getters = {
  pickColor: state => prefCode => {
    return state.colorList[prefCode - 1];
  }
};

const mutations = {
  setPrefectures(state, payload) {
    state.prefectures = payload;
  },
  setDemographics(state, payload) {
    state.columns.push(payload);
  },
  deleteDemographics(state, payload) {
    state.columns = state.columns.filter(
      demographics => demographics.label != payload.prefName
    );
    // const targetIndex = state.columns.findIndex(
    //   demographics => demographics.label == payload.prefName
    // );
    // console.log(targetIndex);
    // state.columns.splice(targetIndex, 1);
  },
  setLabels(state, payload) {
    state.labels = payload;
  }
};

const actions = {
  fetchPrefectures(context) {
    axios({
      method: "GET",
      url: apiConfig.prefecturesAPI,
      headers: { "X-API-KEY": apiConfig.apiKey }
    })
      .then(response => {
        const prefectures = response.data.result;
        context.commit("setPrefectures", prefectures);
      })
      .catch(error => {
        console.log(error);
      });
  },
  fetchDemographics({ state, commit, getters }, payload) {
    axios({
      method: "GET",
      url: apiConfig.demographicsAPI,
      headers: { "X-API-KEY": apiConfig.apiKey },
      params: { prefCode: payload.prefCode }
    })
      .then(response => {
        const color = getters.pickColor(payload.prefCode);
        const demographics = {
          label: payload.prefName,
          data: response.data.result.data[0].data.map(arr => arr.value),
          fill: false,
          backgroundColor: color,
          borderColor: color,
          pointBackgroundColor: color
        };
        const labels = response.data.result.data[0].data.map(arr => arr.year);
        commit("setDemographics", demographics);
        commit("setLabels", labels);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
