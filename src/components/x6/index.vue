<template>
  <div class="graph-wrap">
    <div v-if="editable" class="stencil-container" ref="stencilContainer"></div>
    <div class="graph-container" :class="{ editMode: editable }">
      <div style="flex: 1" ref="graphContainer"></div>
    </div>
    <el-drawer 
      title="当前节点设置" 
      :before-close="cancelForm" 
      :visible.sync="cellDialog" 
      direction="rtl" 
      :size="650" 
      ref="drawer"
      :modal="false"
    >
      <base-form :editable="editable" :schemasDataAll.sync="schemasData" :cellDialog.sync="cellDialog" :action="true">
      </base-form>
      <component :is="drawerFormName"></component>
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
// import BaseForm from '@/components/form/index.vue'
import BaseForm from '@/components/form/BaseForm.vue'
import shell from '@/components/form/Shell.vue'
import "./assets/iconfont/iconfont.css";

export default {
  name: "x6",
  components: {
    BaseForm,
    shell
  },
  data() {
    return {
      schemasData: {
        name: '111',
        runMask: 0,
        desc: '',
        task: 'medium',
        workGroup: '',
        environment: '',
        errorTimes: 0,
        errorGap: 0,
        layoutTimes: 0,
        timeWarn: false,
        timeout: ['timeoutwarn'],
        longTimes: 0
      },
      stencil: null,
      graph: null,
      drawerFormName: '',
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
      schemas: {}
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
    this.initFormSchemas()
  },
  watch: {
    editable: {
      handler (val) {
        this.$nextTick(() => { 
          // 修改编辑状态
          this.graph.options.editable = val
          // 显示port-编辑模式/隐藏port-运行模式
          const ports = this.$refs.graphContainer.querySelectorAll('.x6-port-body');
          ports.forEach(item => {
            item.style.visibility = val ? 'visible' : 'hidden';
          })
          // 初始化左侧组件面板
          if (this.editable) {
            initStencilPanel(this.graph, this.$refs["stencilContainer"]);
            // 编辑模式重置状态
            this.graph.getNodes().forEach(item => {
              const nodeData = item.getData();
              item.setData({
                ...nodeData,
                status: 'default',
              });
            });
          }
          this.graph.centerContent();
        })
      },
      immediate: true,
    },
  },
  methods: {
    initGraph() {
      this.graph = initGraph(this.$refs["graphContainer"], this.editable);
      // 注册组件
      registerComponents(this.editable);
      // 绑定事件
      bindNodeEvent(this.graph, {
        "node:dblclick": (title)=>{
          this.drawerFormName = title
          this.cellDialog = true
        }
      });
      bindKeyEvent(this.graph);
      // 渲染数据
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
        if (statusList.length > 0) { 
          this.showNodeStatus(statusList);
        }
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
        this.showNodeStatus(JSON.parse(JSON.stringify(this.nodeStatusList)));
      } else {
        this.$alert("编辑模式不能运行", "提示", {type:'warning'});
      }
    },
    cancelForm() {
      this.cellDialog = false;
      this.schemasData.timeWarn = false
    },
    initFormSchemas() {
      this.schemas = Object.assign({}, dataSetCell)
      for(let i = 0; i < this.schemas['Shell'].length; i++) {
        this.schemas?.commonData.push(this.schemas['Shell'][i])
      }
      this.schemas?.commonData.map((item, index) => {
        if(item.prop === 'timeWarn') {
          this.$set(this.schemas.commonData[index], 'events', {
            change: this.handleToggleShow
          })
        }
      })
    },
    handleToggleShow(val) {
      this.schemas.commonData.map((item, index) => {
        if(item.prop === 'timeout') {
          this.$set(this.schemas?.commonData[index], 'show', val)
        }
      })
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
</style>
