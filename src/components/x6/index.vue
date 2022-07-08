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
    // 注册连接器
    Graph.registerConnector(
      'algo-connector',
      (s, e) => {
        const offset = 4
        const deltaY = Math.abs(e.y - s.y)
        const control = Math.floor((deltaY / 3) * 2)
        const v1 = { x: s.x, y: s.y + offset + control }
        const v2 = { x: e.x, y: e.y - offset - control }
        return Path.normalize(
          `M ${s.x} ${s.y}
          L ${s.x} ${s.y + offset}
          C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
          L ${e.x} ${e.y}
          `,
        )
      },
      true,
    )
    // 注册边线
    Graph.registerEdge(
      'dag-edge',
      {
        inherit: 'edge',
        attrs: {
          line: {
            stroke: '#C2C8D5',
            strokeWidth: 1,
            targetMarker: null,
          },
        },
      },
      true,
    )

    // 初始化画布
    this.graph = new Graph({
      container: this.$refs["graphContainer"],
      background: {
        color: "#f5f7fa",
      },
      grid: {
        size: 10,
        type: "doubleMesh",
        visible: true,
        args: [
          {
            color: '#E7E8EA', // 主网格线颜色
            thickness: 1,     // 主网格线宽度
          },
          {
            color: '#CBCED3', // 次网格线颜色
            thickness: 1,     // 次网格线宽度
            factor: 5,        // 主次网格线间隔
          },
        ]
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
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'algo-connector',
        connectionPoint: 'anchor',
        anchor: 'center',
        validateMagnet({ magnet }) {
          return magnet.getAttribute('port-group') !== 'top'
        },
        createEdge: () => {
          return this.graph.createEdge({
            shape: 'dag-edge',
            attrs: {
              line: {
                strokeDasharray: '5 5',
              },
            },
            zIndex: -1,
          })
        },
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
        Graph.registerNode(item.name, {
          inherit: "vue-shape",
          width: item.width || 100, // 模板组件宽度
          height: item.height || 24, // 模板组件高度
          component: item.node,
          ports: portsGroup
        });
      });
      this.stencil.load(
        group.nodes.map((node) => ({
          shape: node.name,
          ports: node.ports,
          data: {
            aa: 11
          }
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
      const aa = [{ "shape": "dag-edge", "attrs": { "line": { "strokeDasharray": "5 5" } }, "id": "3a58cb37-d859-4571-ad80-d53ef78a81a6", "zIndex": -1, "source": { "cell": "ca9f4d32-a4e3-4a1a-9dee-37db2a3d9bfa", "port": "port2" }, "target": { "cell": "f79f2ec1-336b-4d11-b018-221cbd4cdac2", "port": "port1" } }, { "shape": "dag-edge", "attrs": { "line": { "strokeDasharray": "5 5" } }, "id": "d3c38593-9cd4-4f52-98b3-5b1a2d64dee7", "zIndex": -1, "source": { "cell": "ca9f4d32-a4e3-4a1a-9dee-37db2a3d9bfa", "port": "port3" }, "target": { "cell": "8c9891e2-17d9-4467-bdcc-d57fcc20f11a", "port": "port1" } }, { "shape": "dag-edge", "attrs": { "line": { "strokeDasharray": "5 5" } }, "id": "c3e64495-eaae-469e-94e9-72ac01765156", "zIndex": -1, "source": { "cell": "8c9891e2-17d9-4467-bdcc-d57fcc20f11a", "port": "port4" }, "target": { "cell": "663488cd-62b5-4903-8f26-4c5e85125a2b", "port": "port4" } }, { "shape": "dag-edge", "attrs": { "line": { "strokeDasharray": "5 5" } }, "id": "8eef043d-41c5-4311-a7c9-d7ac056f12dc", "zIndex": -1, "source": { "cell": "f79f2ec1-336b-4d11-b018-221cbd4cdac2", "port": "port3" }, "target": { "cell": "663488cd-62b5-4903-8f26-4c5e85125a2b", "port": "port1" } }, { "x": 300, "y": 120, "width": 180, "height": 36, "shape": "dag-node", "ports": [{ "id": "port1", "group": "top" }, { "id": "port2", "group": "bottom" }, { "id": "port3", "group": "bottom" }, { "id": "port4", "group": "right" }], "id": "ca9f4d32-a4e3-4a1a-9dee-37db2a3d9bfa", "data": { "aa": 22 }, "zIndex": 1 }, { "x": 110, "y": 260, "width": 180, "height": 36, "shape": "dag-node", "ports": [{ "id": "port1", "group": "top" }, { "id": "port2", "group": "bottom" }, { "id": "port3", "group": "bottom" }, { "id": "port4", "group": "right" }], "id": "f79f2ec1-336b-4d11-b018-221cbd4cdac2", "data": { "aa": 22 }, "zIndex": 2 }, { "x": 450, "y": 200, "width": 180, "height": 36, "shape": "dag-node", "ports": [{ "id": "port1", "group": "top" }, { "id": "port2", "group": "bottom" }, { "id": "port3", "group": "bottom" }, { "id": "port4", "group": "right" }], "id": "8c9891e2-17d9-4467-bdcc-d57fcc20f11a", "data": { "aa": 22 }, "zIndex": 3 }, { "x": 330, "y": 420, "width": 180, "height": 36, "shape": "dag-node", "ports": [{ "id": "port1", "group": "top" }, { "id": "port2", "group": "bottom" }, { "id": "port3", "group": "bottom" }, { "id": "port4", "group": "right" }], "id": "663488cd-62b5-4903-8f26-4c5e85125a2b", "data": { "aa": 22 }, "zIndex": 4 }]

      const cells = []
      aa.forEach((item) => {
        if (item.shape === 'dag-node') {
          cells.push(this.graph.createNode(item))
        } else if (item.shape === 'dag-edge') {
          cells.push(this.graph.createEdge(item))
        }
      })
      this.graph.resetCells(cells)
    },
    getJSON() {
      const originData = this.graph.toJSON()
      // console.log(originData)
      const formatData = originData.cells.map(item => {
        if (item.shape === "dag-node") {
          return {
            ...item.position,
            ...item.size,
            shape: item.shape,
            ports: item.ports.items,
            id: item.id,
            data: item.data,
            zIndex: item.zIndex
          }
        } else if (item.shape === "dag-edge") {
          return item
        }
      })
      console.log(JSON.stringify(formatData));
    }
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
