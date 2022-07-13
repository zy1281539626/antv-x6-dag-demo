import "@antv/x6-vue-shape";
import { Graph, Addon } from "@antv/x6";

import Test from "../Test.vue";
import DagNode from "../DagNode.vue";

// port 定义
let portsGroup = {
  groups: {
    group1: {
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: "#C2C8D5",
          strokeWidth: 1,
          fill: "#fff",
        },
      },
      position: {
        name: "right",
      },
    },
  },
  items: [
    {
      id: "port1",
      group: "group1",
      args: {
        dx: -20,
      },
      markup: [
        {
          tagName: "g",
          selector: "body",
          children: [
            {
              tagName: "circle",
              selector: "circle-outer",
            },
            {
              tagName: "circle",
              selector: "plus-text",
            },
          ],
        },
      ],
      attrs: {
        body: {
          magnet: false,
        },
        "circle-outer": {
          r: 8,
        },
        "plus-text": {
          fill: "#C2C8D5",
        },
      },
    },
  ],
};

// nodes 定义
const shapeGroups = [
  {
    name: "group1",
    title: "Group1",
    collapsable: false,
    layoutOptions: {
      columns: 1,
      dx: 250 / 4, // columns 为1时偏移量（宽度/4）居中
      rowHeight: 40, // 每行的行高
      dy: 15, // y轴偏移量（边距）
    },
    nodes: [
      {
        name: "dag-node",
        group: "group1",
        node: {
          template: `<dag-node />`,
          components: {
            DagNode,
          },
        },
        width: 180,
        height: 36,
      },
      {
        name: "dag-test1",
        group: "group1",
        node: {
          template: `<Test />`,
          components: {
            Test,
          },
        },
      },
    ],
  },
  {
    name: "group2",
    title: "Group(Collapsable)",
    layoutOptions: {
      columns: 1,
      dx: 250 / 4, // columns 为1时偏移量（宽度/4）居中
      rowHeight: 30, // 每行的行高
      dy: 15, // y轴偏移量（边距）
    },
    nodes: [
      {
        name: "dag-test3",
        group: "group1",
        node: {
          template: `<Test />`,
          components: {
            Test,
          },
        },
      },
    ],
  },
];

export { shapeGroups, portsGroup };


export function initGraph(container){
  const graph = new Graph({
    container,
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
      router: {
        name: "manhattan",
        args: {
          step: 15,
        },
      },
      // validateMagnet({ magnet }) {
      //   return magnet.getAttribute('port-group') !== 'top'
      // },
      createEdge: () => {
        return graph.createEdge({
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
    clipboard: true, // 启用剪贴板
    keyboard: {      // 启用键盘操作
      enabled: true,
      global: true,
    },
  });
  return graph;
}
