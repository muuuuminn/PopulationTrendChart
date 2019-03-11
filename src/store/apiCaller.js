import apiConfig from "@/apiConfig";
import axios from "axios";
import palette from "google-palette";

const state = {
  prefectures: [],
  columns: [],
  labels: []
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
  fetchDemographics({ state, commit }, payload) {
    axios({
      method: "GET",
      url: apiConfig.demographicsAPI,
      headers: { "X-API-KEY": apiConfig.apiKey },
      params: { prefCode: payload.prefCode }
    })
      .then(response => {
        const color = palette("mpn65", 47, state.columns.length + 1).map(
          function(hex) {
            return "#" + hex;
          }
        );
        console.log(color);
        const demographics = {
          label: payload.prefName,
          data: response.data.result.data[0].data.map(arr => arr.value),
          fill: false,
          steppedLine: 0,
          //borderColor: color
          cubicInterpolationMode: "default"
        };
        const labels = response.data.result.data[0].data.map(arr => arr.year);
        console.log(demographics.data);
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
  mutations,
  actions
};
