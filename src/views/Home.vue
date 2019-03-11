<template>
  <div>
    <h1 class="title">総人口推移</h1>
    <prefectures></prefectures>
    <line-chart :chart-data="datacollection" v-if="columns.length"></line-chart>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Prefectures from "@/components/Prefectures";
import LineChart from "@/components/LineChart";

export default {
  components: {
    Prefectures,
    LineChart
  },
  name: "Home",
  data() {
    return {
      datacollection: null
    };
  },
  created() {},
  computed: {
    ...mapState("apiCaller", ["columns", "labels"])
  },
  watch: {
    columns: function() {
      this.fillData();
    }
  },
  methods: {
    fillData() {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: this.labels,
        datasets: this.columns
      };
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
