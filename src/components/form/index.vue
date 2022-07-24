<template>
  <div class="drawer__content">
    <el-form :model="schemasData">
      <el-row v-for="(item, index) in commonData" :key="index">
        <el-form-item
          :label="item.label"
          :label-width="formLabelWidth">
          <component
            :is="'el-' + item.component"
            v-model="schemasData[item.prop]"
            v-bind="item.attrs"
            v-on="item.events || {}">
            <template v-if="item.children && item.children.length">
              <template
                v-if="
                  typeof item.component === 'string' &&
                  ['radio-group', 'checkbox-group'].includes(item.component)">
                <component
                  :is="'el-' + child.component"
                  v-for="(child, idx) in item.children"
                  :key="idx"
                  :label="child.value"
                  >{{ child.label }}</component
                >
              </template>
              <template v-else>
                <component
                  :is="'el-' + child.component"
                  v-for="(child, idx) in item.children"
                  :key="idx"
                  :label="child.label"
                  :value="child.value"
                  ></component
                >
              </template>
            </template>
          </component>
          <slot v-if="item.itemSlot" :name="item.itemSlot"></slot>
        </el-form-item>
      </el-row>
    </el-form>
    <div v-if="action" class="drawer__footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="handleClose" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    schemasDataAll: {
      type: Object,
      default: () => {}
    },
    cellDialog: {
      type: Boolean,
      default: true
    },
    action: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: '100px',
      commonData: [],
      schemasData: {},
      loading: false,
      timer: null
    }
  },
  mounted() {
    const schemas = Object.assign({}, this.schemasDataAll)
    this.commonData = schemas?.commonData
    for(let i = 0; i < schemas['Shell'].length; i++) {
      this.commonData.push(schemas['Shell'][i])
    }
    this.schemasData = this.commonData.reduce((pre, cur) => {
      pre[cur.prop] = cur.value
      return pre
    }, {})
  },
  methods: {
    handleClose(done) {
      if (this.loading) {
        return;
      }
      console.log(this.schemasData)
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
              this.$emit('update:cellDialog', false)
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.$emit('update:cellDialog', false)
      clearTimeout(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer__content {
  padding: 0px 20px;
}
.drawer__footer {
  text-align: center;
}
</style>