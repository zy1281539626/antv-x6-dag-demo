import DagNode from "../DagNode.vue";
import Test from "../Test.vue";

// dag-node 组件配置
// export const nodeConfig = {
//   SHELL: {
//     title: "Shell",
//     attrs: []
//   },
//   SQL: {
//     title: "Sql",
//     attrs: []
//   },
// }

// 自定义节点列表 (相类似的组件不需要重复注册)
export const nodes = [
  {
    name: "dag-node",         // name
    group: "group1",          // 分组
    vNode: {                  // vue组件
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
    vNode: {
      template: `<Test />`,
      components: {
        Test,
      },
    },
  },
]

// 自定义边线列表
export const edges = [
  {
    name: "dag-edge",
    edgeNode: {
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
    }
  }
]

// 自定义port
export const ports = [
  {
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
  }
]