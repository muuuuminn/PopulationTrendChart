import { resas } from "@/apiConfig";
import axios from "axios";
import palette from "google-palette";

const state = {
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
  addDemographics(state, payload) {
    state.datasets.push(payload);
  },
  removeDemographics(state, payload) {
    const targetIndex = state.datasets.findIndex(
      demographics => demographics.label == payload
    );
    state.datasets.splice(targetIndex, 1);
  },
  setYAxesLabels(state, payload) {
    state.yAxesLabels = payload;
  }
};

const actions = {
  async requestDemographics({ commit, getters }, { pref, element }) {
    try {
      element.disabled = true;
      const { data } = await axios.get(resas.demographicsAPI, {
        headers: { "X-API-KEY": resas.apiKey },
        params: { prefCode: pref.prefCode }
      });
      const colorCode = getters.pickColorCode(pref.prefCode);
      const demographics = {
        label: pref.prefName,
        data: data.result.data[0].data.map(arr => arr.value),
        fill: false,
        backgroundColor: colorCode,
        borderColor: colorCode,
        pointBackgroundColor: colorCode
      };
      const yAxesLabels = data.result.data[0].data.map(arr => arr.year);
      commit("addDemographics", demographics);
      commit("setYAxesLabels", yAxesLabels);
      element.disabled = false;
    } catch (error) {
      element.disabled = false;
      console.log(`Error:${error}`);
    }
  },
  removeDemographics({ commit }, { prefName }) {
    commit("removeDemographics", prefName);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
