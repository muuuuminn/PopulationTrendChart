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
    ...mapState("apiCaller", ["columns"])
  },
  watch: {
    columns: function(val) {
      console.log("watch");
      console.log(val);
      this.fillData();
    }
  },
  methods: {
    fillData() {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: this.columns

        //[
        // {
        //   label: "Data One",
        //   backgroundColor: "#f87979",
        //   data: [
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt(),
        //     this.getRandomInt()
        //   ]
        // },
        // {
        //   label: "Data two",
        //   backgroundColor: "#ffffff",
        //   data: [
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2,
        //     this.getRandomInt() * 2
        //   ]
        // }
        //]
      };
    },
    getRandomInt() {
      // JS function to generate numbers to be used for the chart
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
