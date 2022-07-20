import DagNode from "../DagNode.vue";

// 自定义节点列表 (相类似的组件不需要重复注册)
export const nodes = [
  {
    name: "dag-node",         // name
    vNode: {                  // vue组件
      template: `<dag-node />`,
      components: {
        DagNode,
      },
    },
    width: 180,
    height: 36,
  }
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
export const port = {
  items: [{ group: "common", id: "in1", args: { dx:-20 }}],
  groups: {
    common: {
      position: { name: "right" },
      attrs: {
        fo: {
          width: 14,
          height: 14,
          x: -7,
          y: -7,
          magnet: true
        }
      },
      zIndex: 2
    }
  }
}
