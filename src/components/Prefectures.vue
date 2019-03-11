<template>
  <div class="pref-container">
    <h3 class="">都道府県一覧</h3>
    <div class="checkboxes">
      <ul v-for="pref in prefectures" :key="pref.prefCode">
        <label>
          <input type="checkbox" @click="toggleChart($event, pref)" />
          {{ pref.prefName }}
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
  margin: 2% 2% 10% 2%;
}
.checkboxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
}
ul {
  margin: 5px;
}
</style>
