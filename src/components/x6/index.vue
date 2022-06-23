<template>
  <div class="x6-wrap">
    <div class="stencil-container" ref="stencilContainer"></div>
    <div class="graph-container" ref="graphContainer"></div>
  </div>
</template>

<script>
import { Graph, Addon, Shape } from "@antv/x6";
import { shapeList } from "./shape";

import Count from "./shape/Test.vue";

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
    const { Stencil } = Addon;
    this.stencil = new Stencil({
      title: "组件",
      target: this.graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: "Search by shape name",
      notFoundText: "Not Found",
      collapsable: true,
      stencilGraphWidth: 250,
      stencilGraphHeight: 200,
      groups: [
        {
          name: "group1",
          title: "Group",
          collapsable: false,
          layout() {
            return {
              columns: 1,
              dx: 10,
              dy: 10,
            };
          },
        },
        {
          name: "group2",
          title: "Group(Collapsable)",
        },
      ],
    });
    this.$refs["stencilContainer"].appendChild(this.stencil.container);

    // 注册组件
    shapeList.forEach((item) => {
      Graph.registerVueComponent(item.name, item.node, true);
    });
    this.stencil.load(
      shapeList.map((item) => ({
        shape: "vue-shape",
        component: item.name,
        width: 250,
        height: 40,
      })),
      "group1"
    );
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
