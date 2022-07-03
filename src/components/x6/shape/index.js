import "@antv/x6-vue-shape";

import Test from "./Test.vue";
import DagNode from "./DagNode.vue";

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
        ports: {
          groups: {
            top: {
              position: "top",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#C2C8D5",
                  strokeWidth: 1,
                  fill: "#fff",
                },
              },
            },
            bottom: {
              position: "bottom",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#C2C8D5",
                  strokeWidth: 1,
                  fill: "#fff",
                },
              },
            },
          },
        },
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
      {
        name: "dag-test2",
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

export { shapeGroups };
