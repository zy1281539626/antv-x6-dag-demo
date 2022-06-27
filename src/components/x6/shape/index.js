import "@antv/x6-vue-shape";

import Test from "./Test.vue";

const shapeList = [
  {
    name: "dag-test",
    group: "group1",
    node: {
      template: `<Test />`,
      components: {
        Test,
      },
    },
    width: 100,
    height: 24
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
];

export { shapeList };
