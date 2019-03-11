<template>
  <div class="Home">
    <prefectures></prefectures>
    <line-chart :chart-data="datacollection" v-if="columns"></line-chart>
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
      // instantiating datacollection with null
      datacollection: null
    };
  },
  created() {
    //anytime the vue instance is created, call the fillData() function.
    //this.fillData();
  },
  computed: {
    // datasets() {
    //   return {
    //     labels: ["January", "February", "March"],
    //     datasets: this.columns
    //   };
    // },
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
    },
    getRandomInt() {
      // JS function to generate numbers to be used for the chart
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
