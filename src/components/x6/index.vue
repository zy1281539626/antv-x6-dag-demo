<template>
  <div class="x6-wrap">
    <div class="stencil-container" ref="stencilContainer"></div>
    <div class="graph-container" ref="graphContainer"></div>
  </div>
</template>

<script>
import { Graph, Addon } from "@antv/x6";
import { shapeGroups } from "./shape";
import _ from "lodash-es";

export default {
  name: "x6",
  data() {
    return {
      stencil: null,
      graph: null,
    };
  },
  mounted() {
    // 初始化画布
    this.graph = new Graph({
      container: this.$refs["graphContainer"],
      background: {
        color: "#fffbe6",
      },
      grid: {
        size: 10,
        visible: true,
      },
      snapline: true, // 对齐线
      scroller: {
        enabled: true,
        pannable: true,
        pageVisible: true,
        pageBreak: false,
      },
      mousewheel: {
        enabled: true,
        modifiers: ["ctrl", "meta"],
      },
    });

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
        Graph.registerVueComponent(item.name, item.node, true);
      });
      this.stencil.load(
        group.nodes.map((node) => ({
          shape: "vue-shape",
          component: node.name,
          width: node.width || 100, // 模板组件宽度
          height: node.height || 24, // 模板组件高度
        })),
        group.name
      );
      this.stencil.resizeGroup(group.name, {
        height:
          group.nodes.length * group?.layoutOptions?.rowHeight +
          group?.layoutOptions?.dy * 2,
      });
    });
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
  }
}
</style>
