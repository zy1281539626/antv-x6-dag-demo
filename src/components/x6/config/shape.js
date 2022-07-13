export const nodes= [
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
]