<template>
  <div class="node" :class="status">
    <i class="iconfont" :class="'icon-' + icon"></i>
    <span class="label">{{ label }}</span>
    <img
      class="status-img"
      v-if="!!status && showStatus"
      :src="require(imgCot[status] + '')"
    />
  </div>
</template>

<script>
export default {
  name: "dragnode",
  inject: ["getGraph", "getNode"],
  data() {
    return {
      status: "",
      label: "",
      icon: "",
      imgCot: {
        success: "./assets/success.png",
        failed: "./assets/failed.png",
        running: "./assets/running.png",
      },
    };
  },
  computed: {
    showStatus() {
      // 主graph中的节点在非编辑状态才显示状态图标
      const graphOptions = this.getGraph().options;
      return !graphOptions.interacting?.nodeMovable;
    },
  },
  mounted() {
    const self = this;
    const node = this.getNode();
    // console.log(this.getGraph());
    // const config = node.store.data.config;
    // console.log(node);

    // setTimeout(() => {
    //   // self.status = "success";
    //   node.setData({ "aa": 22 })
    // }, 1000);
    this.label = node.getData().title;
    this.icon = node.getData().icon;
    node.on("change:data", ({ current }) => {
      console.log(current);
      // self.label = current.label;
      // self.status = current.status;
    });
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  color: #666;
}

.node {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5f95ff;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);

  img {
    width: 20px;
    height: 20px;
  }

  .label {
    flex: 1;
    margin-left: 8px;
    color: #666;
    font-size: 12px;
  }

  &.success {
    border-left: 4px solid #52c41a;
  }

  &.failed {
    border-left: 4px solid #ff4d4f;
  }

  &.running .status-img {
    animation: spin 1s linear infinite;
  }
}

.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}

.x6-node-selected .node.success {
  border-color: #52c41a;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #ccecc0;
}

.x6-node-selected .node.failed {
  border-color: #ff4d4f;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #fedcdc;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
