import Vue from "vue";
import Router from "vue-router";
import PrefecturesList from "./views/PrefecturesList";
import TrendChart from "./views/TrendChart";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "prefecturesList",
      component: PrefecturesList
    },
    {
      path: "/trendChart",
      name: "trendChart",
      component: TrendChart
    }
  ]
});
