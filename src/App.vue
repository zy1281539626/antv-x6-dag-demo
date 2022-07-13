<template>
  <div id="app">
    <X6 :nodesData="nodesData" />
  </div>
</template>

<script>
import X6 from "./components/x6/index.vue"
export default {
  name: 'App',
  components: {
    X6
  },
  data() {
    return {
      nodesData: [
        {
          shape: "dag-edge",
          id: "d7b48a0c-25ca-4016-ac06-d25691d4b14c",
          zIndex: -1,
          source: { cell: "9a714ef1-a49d-417e-8f7a-69be151d2004" },
          target: { cell: "7c5031f9-ed4a-46fa-8bf2-dbbc590d017b" },
        },
        {
          x: 250,
          y: 190,
          shape: "dag-node",
          id: "9a714ef1-a49d-417e-8f7a-69be151d2004",
          data: { aa: 22 },
          zIndex: 1,
        },
        {
          x: 130,
          y: 320,
          shape: "dag-node",
          id: "7c5031f9-ed4a-46fa-8bf2-dbbc590d017b",
          data: { aa: 22 },
          zIndex: 2,
        },
      ]
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
