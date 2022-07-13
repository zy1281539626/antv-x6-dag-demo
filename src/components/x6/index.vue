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
import { Graph, Addon } from "@antv/x6";
import { initGraph, shapeGroups, portsGroup } from "./config/index";
import _ from "lodash-es";

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
    // this.initGraph()
    this.graph = initGraph(this.$refs["graphContainer"])

    bindNodeEvent(this.graph)
    bindKeyEvent(this.graph)

    // 注册边线
    Graph.registerEdge(
      "dag-edge",
      {
        inherit: "edge",
        attrs: {
          line: {
            stroke: "#b2b7c3",
            strokeWidth: 1,
            targetMarker: {
              name: 'block',
              height: 8
            },
          },
        },
      },
      true
    );

    // 初始化组件面板
    this.stencil = new Addon.Stencil({
      title: "组件",
      target: this.graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: "Search by shape name",
      notFoundText: "Not Found",
      collapsable: true,
      stencilGraphWidth: 250, // 模板画布宽度
      // stencilGraphHeight: 140,
      groups: _.cloneDeep(shapeGroups).map((item) => {
        delete item.nodes;
        return item;
      }),
    });

    this.$refs["stencilContainer"].appendChild(this.stencil.container);

    // 注册组件
    shapeGroups.forEach((group) => {
      group.nodes.forEach((item) => {
        Graph.registerNode(item.name, {
          inherit: "vue-shape",
          width: item.width || 100, // 模板组件宽度
          height: item.height || 24, // 模板组件高度
          component: item.node,
          ports: portsGroup,
        });
      });
      this.stencil.load(
        group.nodes.map((node) => ({
          shape: node.name,
          ports: node.ports,
          data: {
            aa: 11,
          },
        })),
        group.name
      );
      this.stencil.resizeGroup(group.name, {
        height:
          group.nodes.length * group?.layoutOptions?.rowHeight +
          group?.layoutOptions?.dy * 2,
      });
    });


    this.initData();
  },
  methods: {
    initData() {
      const cells = [];
      this.nodesData.forEach((item) => {
        if (item.shape === "dag-node") {
          cells.push(this.graph.createNode(item));
        } else if (item.shape === "dag-edge") {
          cells.push(this.graph.createEdge(item));
        }
      });
      this.graph.resetCells(cells);
    },
    getJSON() {
      const originData = this.graph.toJSON();
      const formatData = originData.cells.map((item) => {
        if (item.shape === "dag-node") {
          return {
            ...item.position,
            shape: item.shape,
            id: item.id,
            data: item.data,
            zIndex: item.zIndex,
          };
        } else if (item.shape === "dag-edge") {
          return item;
        }
      });
      console.log(JSON.stringify(formatData));
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
