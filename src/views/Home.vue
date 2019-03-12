<template>
  <div>
    <h1 class="title">総人口推移</h1>
    <prefectures></prefectures>
    <line-chart :chart-data="chartData" v-if="datasets.length"></line-chart>
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
      chartData: null
    };
  },
  created() {},
  computed: {
    ...mapState("apiCaller", ["datasets", "yAxesLabels"])
  },
  watch: {
    datasets: function() {
      this.fillData();
    }
  },
  methods: {
    fillData() {
      this.chartData = {
        // Data for the y-axis of the chart
        labels: this.yAxesLabels,
        datasets: this.datasets
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
