<template>
  <div class="checkbox">
    <h1>人口推移</h1>
    <div>
      <ul>
        <li v-for="pref in prefectures" :key="pref.prefCode">
          <label>
            {{ pref.prefName }}
            <input type="checkbox" @click="toggleChart($event, pref)" />
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "checkbox",
  data: function() {
    return {};
  },
  mounted() {
    this.fetchPrefectures();
  },
  computed: {
    ...mapState("apiCaller", ["prefectures"])
  },
  methods: {
    ...mapActions("apiCaller", [
      "fetchPrefectures",
      "fetchDemographics",
      "deleteChart"
    ]),
    ...mapMutations("apiCaller", ["deleteDemographics"]),
    toggleChart(event, pref) {
      if (event.target.checked) {
        this.fetchDemographics(pref);
      } else {
        this.deleteDemographics(pref);
      }
    }
  }
};
</script>

<style scoped></style>
