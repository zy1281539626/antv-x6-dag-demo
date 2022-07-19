<template>
  <div id="app">
    <X6 :nodesData="nodesData" :editable="false" />
  </div>
</template>

<script>
import X6 from "./components/x6/index.vue";
export default {
  name: "App",
  components: {
    X6,
  },
  data() {
    return {
      nodesData: [
        {
          shape: "dag-edge",
          id: "3",
          zIndex: -1,
          source: { cell: "1" },
          target: { cell: "2" },
        },
        {
          x: 70,
          y: 200,
          shape: "dag-node",
          id: "1",
          data: { title: "Shell", icon: "powershell" },
          zIndex: 1,
        },
        {
          x: 120,
          y: 300,
          shape: "dag-node",
          id: "2",
          data: { title: "Sql", icon: "icon_SQL" },
          zIndex: 2,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
