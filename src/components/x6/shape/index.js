import "@antv/x6-vue-shape";

import Test from "./Test.vue";
import DagNode from "./DagNode.vue";

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
