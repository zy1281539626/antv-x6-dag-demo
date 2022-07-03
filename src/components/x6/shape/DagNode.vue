<template>
  <div class="node" :class="status">
    <img :src="imgCot.setting" />
    <span class="label">{{ label }}</span>
    <img class="status-img" v-if="!!status" :src="imgCot[status]" />
  </div>
</template>

<script>
export default {
  name: "dragnode",
  inject: ["getGraph", "getNode"],
  data() {
    return {
      status: "",
      label: "读数据",
      imgCot: {
        setting:
          "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ",
        success:
          "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ",
        failed:
          "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ",
        running:
          "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ",
      },
    };
  },
  mounted() {
    const self = this;
    const node = this.getNode();
    console.log(node);
    // this.label = node.data.label;
    node.on("change:data", ({ current }) => {
      self.label = current.label;
      self.status = current.status;
    });
  },
};
</script>

<style lang="scss" scoped>
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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
