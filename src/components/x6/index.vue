<template>
  <div class="graph-wrap">
    <!-- <div>
      <button @click="getJSON">获取JSON数据</button>
      <button @click="start">开始</button>
    </div> -->
    <div v-if="editable" class="stencil-container" ref="stencilContainer"></div>
    <div class="graph-container" :class="{ editMode: editable }">
      <div style="flex: 1" ref="graphContainer"></div>
    </div>
    <div  @click="cellDialog = true">111</div>
    <el-drawer
      title="我嵌套了 Form !"
      :before-close="cancelForm"
      :visible.sync="cellDialog"
      direction="rtl"
      size="50%"
      ref="drawer"
      >
      <div class="drawer__content">
        <el-form :model="schemasData">
          <el-row v-for="(item, index) in commonData" :key="index">
            <el-form-item
              :label="item.label"
              :label-width="formLabelWidth">
              <component :is="'el-' + item.component"  v-model="schemasData[item.prop]"></component>
            </el-form-item>
          </el-row>
        </el-form>
        <div class="drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="handleClose" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
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
import dataSetCell from "@/mock/index"

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
            id: "1",
            status: "running",
          },
          {
            id: "2",
            status: "default",
          },
        ],
        [
          {
            id: "1",
            status: "success",
          },
          {
            id: "2",
            status: "running",
          },
        ],
      ],
      cellDialog: false,
      loading: false,
      form: {},
      formLabelWidth: '80px',
      commonData: [],
      schemasData: {}
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
    const schemas = Object.assign([], dataSetCell)
    this.commonData = schemas?.commonData
    this.schemasData = schemas?.commonData.reduce((pre, cur) => {
      pre[cur.prop] = cur.value
      return pre
    }, {})
    console.log(this.schemasData)
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
        this.graph.centerContent();
      }
    },
    showNodeStatus(statusList) {
      const status = statusList.shift();
      status?.forEach((item) => {
        const { id, status } = item;
        const node = this.graph.getCellById(id);
        const data = node.getData();
        node.setData({
          ...data,
          status: status,
        });
      });
      setTimeout(() => {
        this.showNodeStatus(statusList);
      }, 3000);
    },
    getJSON() {
      const result = getGraphData(this.graph);
      // console.log(JSON.stringify(result));
      console.log(result);
      return result;
    },
    start() {
      if (!this.editable) {
        this.showNodeStatus(this.nodeStatusList);
      } else {
        alert("编辑模式不能运行");
      }
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
              this.cellDialog = false
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.cellDialog = false;
      clearTimeout(this.timer);
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
.graph-wrap {
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;
  .stencil-container {
    position: absolute;
    width: 250px;
    height: 100%;
    box-shadow: 0 0 12px #c1c1c1;
    z-index: 1;

    ::v-deep .x6-widget-stencil {
      background: #f8f8f8;
    }
  }

  .graph-container {
    position: relative;
    display: flex;
    height: 100%;
    flex: 1;
    overflow: hidden;

    &.editMode {
      margin-left: 250px;
    }

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
.drawer__content {
  padding: 0px 20px;
}
.drawer__footer {
  text-align: center;
}
</style>
