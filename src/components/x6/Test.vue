<template>
  <div>
    <div class="test-wrap">
      <button type="button">123</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestShape",
  inject: ["getGraph", "getNode"],
};
</script>

<style lang="scss" scoped>
.test-wrap {
  text-align: center;
  border: 1px solid red;
}
</style>
