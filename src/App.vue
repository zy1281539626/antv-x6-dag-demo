<template>
  <div id="app">
    <X6 :nodesData="nodesData" :editable="true" />
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
          id: "6c4d80b5-2250-499a-b2bc-e39ad310967d",
          zIndex: -1,
          source: { cell: "8a0aa46b-7e6d-4807-9b09-4cbddd95e0cf" },
          target: { cell: "35f51105-fd37-47b8-b0a4-9c1522edaca7" },
        },
        {
          x: 70,
          y: 200,
          shape: "dag-node",
          id: "8a0aa46b-7e6d-4807-9b09-4cbddd95e0cf",
          data: { title: "Shell", icon: "powershell" },
          zIndex: 1,
        },
        {
          x: 120,
          y: 300,
          shape: "dag-node",
          id: "35f51105-fd37-47b8-b0a4-9c1522edaca7",
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
