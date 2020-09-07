<template>
<el-row :gutter="12">
  <el-col :span="8">
    <el-card shadow="always">
        <div style="width:80vw;">
    <div id="myChart" :style="{width: '80vw', height: '500px'}"></div>
  </div>
    </el-card>
  </el-col>
</el-row>

</template>

<script>
import { createNamespacedHelpers } from "vuex";
const dataModule = createNamespacedHelpers("data");
const { mapState: dataState, mapActions: dataActions } = dataModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    ...dataActions(["getDatareports"]),
    drawLine() {
      console.log(this.legend, "123");
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      if (this.xAxis && this.xAxis.length) {
        myChart.setOption({
        title: { text: "" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: this.legend
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xAxis[0].data
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.series
      });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDatareports();
      this.drawLine();
    });
  },
  watch: {
    xAxis() {
      this.drawLine();
    }
  },
  computed: {
    ...dataState(["legend", "series", "xAxis", "yAxis"])
  },
  
};
</script>

<style scoped lang='scss'>
.el-card{
  width: 80vw !important;
}
</style>