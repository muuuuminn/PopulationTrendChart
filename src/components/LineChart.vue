<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: "人口数"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: "年度"
              }
            }
          ]
        },
        legend: {
          display: true,
          position: "right"
        },
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: false,
        elements: {
          line: {
            tension: 0
          }
        }
      }
    };
  },
  // computed: {
  //   trendChartData() {
  //     return this.chartData;
  //   }
  // },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
