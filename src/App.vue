<template>
  <div id="app">
    <div>
      <button @click="getJSON">获取JSON数据</button>
      <button @click="start">开始</button>
    </div>
    <div class="x6-wrap">
      <X6 ref="graphRef" :nodesData="nodesData" :editable="false" />
    </div>
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
  methods: {
    getJSON() {
      this.$refs.graphRef.getJSON();
      // const result = getGraphData(this.graph);
      // // console.log(JSON.stringify(result));
      // console.log(result);
    },
    start() {
      this.$refs.graphRef.start();
      // if (!this.editable) {
      //   this.showNodeStatus(this.nodeStatusList);
      // } else {
      //   alert("编辑模式不能运行");
      // }
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.x6-wrap {
  width: 80%;
  height: 600px;
  margin: 100px auto;
  border: 1px solid red;
}
</style>
