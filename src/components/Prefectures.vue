<template>
  <div>
    <h3>都道府県一覧</h3>
    <div class="pref-container">
      <ul v-for="pref in prefectures" :key="pref.prefCode">
        <label>
          {{ pref.prefName }}
          <input type="checkbox" @click="toggleChart($event, pref)" />
        </label>
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

<style scoped>
.pref-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
}
ul {
  margin: 5px;
}
</style>
