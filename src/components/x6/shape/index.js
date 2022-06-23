import "@antv/x6-vue-shape";

import Test from "./Test.vue";

const shapeList = [
  {
    name: "dag-test",
    group: "组1",
    node: {
      template: `<Test />`,
      components: {
        Test,
      },
    },
  },
];

export { shapeList };
