<template>
  <div class="x6-wrap">
    <div class="stencil-container" ref="stencilContainer"></div>
    <div class="graph-container" ref="graphContainer"></div>
  </div>
</template>

<script>
import { Graph, Addon } from "@antv/x6";
import { shapeList } from "./shape";

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


    // TODO 根据模板组件来自动生成分组
    // 定义组件面板分组
    const stencilGroups = [{
      name: "group1",
      title: "Group1",
      collapsable: false,
      layoutOptions: {
        columns: 1,
        dx: 250 / 4, // columns 为1时偏移量（宽度/4）居中
        rowHeight: 30, // 每行的行高
        dy: 15 // y轴偏移量（边距）
      }
    }, {
      name: "group2",
      title: "Group(Collapsable)",
    }]
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
      groups: stencilGroups,
    });
    this.$refs["stencilContainer"].appendChild(this.stencil.container);

    // 注册组件
    shapeList.forEach((item) => {
      Graph.registerVueComponent(item.name, item.node, true);
    });
    stencilGroups.forEach((group) => {
      const filterShapes = shapeList.filter(x => x.group == group.name)
      this.stencil.load(
        filterShapes.map((shape) => ({
          shape: "vue-shape",
          component: shape.name,
          width: shape.width || 100, // 模板组件宽度
          height: shape.height || 24 // 模板组件高度
        })),
        group.name
      );
      this.stencil.resizeGroup(group.name, { height: filterShapes.length * group?.layoutOptions?.rowHeight + group?.layoutOptions?.dy * 2 })
    })

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
