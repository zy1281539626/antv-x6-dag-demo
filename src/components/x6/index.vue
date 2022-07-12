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
import { Graph, Addon, Path } from "@antv/x6";
import { shapeGroups, portsGroup } from "./shape";
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
              name: "classic",
              args: { size: 8 },
            },
          },
        },
      },
      true
    );

    // 初始化画布
    this.graph = new Graph({
      container: this.$refs["graphContainer"],
      background: {
        color: "#f5f7fa",
      },
      grid: {
        // 网格样式
        size: 10,
        type: "doubleMesh",
        visible: true,
        args: [
          {
            color: "#E7E8EA",
            thickness: 1,
          },
          {
            color: "#dce0e5",
            thickness: 1,
            factor: 5,
          },
        ],
      },
      snapline: true, // 对齐线
      scroller: {
        enabled: true,
        pannable: true,
        pageVisible: true,
        pageBreak: false,
      },
      mousewheel: {
        // 鼠标滚轮放大缩小
        enabled: true,
        modifiers: ["ctrl", "meta"],
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5,
      },
      highlighting: {
        // 指定触发某种交互时的高亮样式
        magnetAdsorbed: {
          // 当链接桩可以被链接时
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#31d0c6",
              strokeWidth: 4,
            },
          },
        },
      },
      connecting: {
        // 全局的连线规则
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: "rounded",
        // connectionPoint: "anchor",
        // anchor: "center",
        router: "manhattan",
        // validateMagnet({ magnet }) {
        //   return magnet.getAttribute('port-group') !== 'top'
        // },
        createEdge: () => {
          return this.graph.createEdge({
            shape: "dag-edge",
            zIndex: -1,
          });
        },
      },
      selecting: {
        enabled: true,
        multiple: true, // 启动多选
        rubberEdge: true, // 框选包含边线
        rubberNode: true, // 框选包含节点
        modifiers: "shift",
        rubberband: true, // 启用框选,按'modifiers'配置
      },
    });

    // 确保连线为node，而不是port
    this.graph.on("edge:connected", ({ isNew, edge }) => {
      if (isNew) {
        const sourceNode = edge.getSourceNode();
        const targetNode = edge.getTargetNode();
        edge.setSource(sourceNode);
        edge.setTarget(targetNode);
      }
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
      let aa = [
        {
          shape: "dag-edge",
          id: "d7b48a0c-25ca-4016-ac06-d25691d4b14c",
          zIndex: -1,
          source: { cell: "9a714ef1-a49d-417e-8f7a-69be151d2004" },
          target: { cell: "7c5031f9-ed4a-46fa-8bf2-dbbc590d017b" },
        },
        {
          x: 250,
          y: 190,
          shape: "dag-node",
          id: "9a714ef1-a49d-417e-8f7a-69be151d2004",
          data: { aa: 22 },
          zIndex: 1,
        },
        {
          x: 130,
          y: 320,
          shape: "dag-node",
          id: "7c5031f9-ed4a-46fa-8bf2-dbbc590d017b",
          data: { aa: 22 },
          zIndex: 2,
        },
      ];

      const cells = [];
      aa.forEach((item) => {
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
      console.log(originData);
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
