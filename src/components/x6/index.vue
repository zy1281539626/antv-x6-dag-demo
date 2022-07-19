<template>
  <div class="x6-wrap">
    <div>
      <button @click="getJSON">获取JSON数据</button>
      <button @click="start">开始</button>
    </div>
    <div v-if="editable" class="stencil-container" ref="stencilContainer"></div>
    <div class="graph-container">
      <div style="flex: 1" ref="graphContainer"></div>
    </div>
  </div>
</template>

<script>
import {
  initGraph,
  registerComponents,
  initStencilPanel,
  renderGraphData,
  getGraphData,
} from "./config/index";
import { bindKeyEvent, bindNodeEvent } from "./config/event";

import "./assets/iconfont/iconfont.css";

export default {
  name: "x6",
  data() {
    return {
      stencil: null,
      graph: null,
      nodeStatusList: [
        [
          {
            id: '1',
            status: 'running',
          },
          {
            id: '2',
            status: 'default',
          }
        ],
        [
          {
            id: '1',
            status: 'success',
          },
          {
            id: '2',
            status: 'running',
          }
        ]
      ]
    };
  },
  props: {
    nodesData: {
      type: Array,
      default: () => [],
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      this.graph = initGraph(this.$refs["graphContainer"], this.editable);
      registerComponents(this.editable);
      bindNodeEvent(this.graph);
      bindKeyEvent(this.graph);
      if (this.editable) {
        initStencilPanel(this.graph, this.$refs["stencilContainer"]);
      }

      if (this.nodesData.length > 0) {
        renderGraphData(this.graph, this.nodesData);
        this.graph.centerContent()
      }
    },
    showNodeStatus(statusList){
      const status = statusList.shift()
      status?.forEach((item) => {
        const { id, status } = item
        const node = this.graph.getCellById(id)
        const data = node.getData()
        node.setData({
          ...data,
          status: status,
        })
      })
      setTimeout(() => {
        this.showNodeStatus(statusList)
      }, 3000)
    },
    getJSON() {
      const result = getGraphData(this.graph);
      // console.log(JSON.stringify(result));
      console.log(result);
    },
    start(){
      this.showNodeStatus(this.nodeStatusList)
    }
  },
};
</script>

<style>
@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>
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
    position: relative;
    display: flex;
    height: 100%;
    flex: 1;
    overflow: hidden;

    // ::v-deep .x6-edge:hover path:nth-child(2) {
    //   stroke: #1890ff;
    //   stroke-width: 1px;
    // }

    ::v-deep .x6-edge-selected path:nth-child(2) {
      stroke: #1890ff;
      stroke-width: 1.5px !important;
    }

    ::v-deep .dag-node-port {
      position: relative;
      border: 1px solid #c3c3c3;
      background-color: #fff;
      border-radius: 50%;
      box-sizing: border-box;
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #c3c3c3;
      }
    }
  }
}
</style>
