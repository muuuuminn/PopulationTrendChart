import { resas } from "@/apiConfig";
import axios from "axios";
import palette from "google-palette";

const state = {
  prefectures: [],
  datasets: [],
  yAxesLabels: [],
  colorCodes: palette("mpn65", 47).map(function(rrggbb) {
    return "#" + rrggbb;
  })
};

const getters = {
  pickColorCode: state => prefCode => {
    return state.colorCodes[prefCode - 1];
  }
};

const mutations = {
  setPrefectures(state, payload) {
    state.prefectures = payload;
  },
  addDemographics(state, payload) {
    state.datasets.push(payload);
  },
  removeDemographics(state, payload) {
    state.datasets = state.datasets.filter(
      demographics => demographics.label != payload.prefName
    );
    // const targetIndex = state.datasets.findIndex(
    //   demographics => demographics.label == payload.prefName
    // );
    // console.log(targetIndex);
    // state.datasets.splice(targetIndex, 1);
  },
  setYAxesLabels(state, payload) {
    state.yAxesLabels = payload;
  }
};

const actions = {
  requestPrefectures(context) {
    axios({
      method: "GET",
      url: resas.prefecturesAPI,
      headers: { "X-API-KEY": resas.apiKey }
    })
      .then(response => {
        const prefectures = response.data.result;
        context.commit("setPrefectures", prefectures);
      })
      .catch(error => {
        console.log(error);
      });
  },
  requestDemographics({ state, commit, getters }, payload) {
    axios({
      method: "GET",
      url: resas.demographicsAPI,
      headers: { "X-API-KEY": resas.apiKey },
      params: { prefCode: payload.prefCode }
    })
      .then(response => {
        const colorCode = getters.pickColorCode(payload.prefCode);
        const demographics = {
          label: payload.prefName,
          data: response.data.result.data[0].data.map(arr => arr.value),
          fill: false,
          backgroundColor: colorCode,
          borderColor: colorCode,
          pointBackgroundColor: colorCode
        };
        const yAxesLabels = response.data.result.data[0].data.map(
          arr => arr.year
        );
        commit("addDemographics", demographics);
        commit("setYAxesLabels", yAxesLabels);
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
