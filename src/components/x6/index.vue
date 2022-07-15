<template>
  <div class="x6-wrap">
    <div>
      <button @click="getJSON">获取JSON数据</button>
    </div>
    <div class="stencil-container" ref="stencilContainer"></div>
    <div class="graph-container" ref="graphContainer"></div>
  </div>
</template>

<script>
import { initGraph, registerComponents, initStencilPanel, renderGraphData, getGraphData } from "./config/index";
import { bindKeyEvent, bindNodeEvent } from "./config/event";

export default {
  name: "x6",
  data() {
    return {
      stencil: null,
      graph: null,
    };
  },
  props: {
    nodesData: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      this.graph = initGraph(this.$refs["graphContainer"])
      registerComponents()
      bindNodeEvent(this.graph)
      bindKeyEvent(this.graph)
      initStencilPanel(this.graph, this.$refs["stencilContainer"])

      renderGraphData(this.graph, this.nodesData)
    },
    getJSON() {
      const result = getGraphData(this.graph)
      console.log(JSON.stringify(result));
    },
  },
};
</script>

<style lang="scss" scoped>
.x6-wrap {
  display: flex;
  height: 100vh;

  .stencil-container {
    position: relative;
    width: 250px;
    flex-shrink: 0;
  }

  .graph-container {
    flex: 1;

    ::v-deep .x6-edge:hover path:nth-child(2) {
      stroke: #1890ff;
      stroke-width: 1px;
    }

    ::v-deep .x6-edge-selected path:nth-child(2) {
      stroke: #1890ff;
      stroke-width: 1.5px !important;
    }
  }
}
</style>
