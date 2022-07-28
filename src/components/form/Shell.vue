<template>
  <div class="drawer__content">
    <el-form :model="shellData" :rules="rules">
      <el-row>
        <el-form-item label="资源" prop="resource" :label-width="formLabelWidth">
          <el-select
            v-model="shellData.resource"
            value-key="id"
            multiple
            clearable
          >
            <el-option
              v-for="item in resource"
              :key="item.id"
              :value="item.id"
              :label="item.label"
              style="height: auto"
              hidden
            />
            <el-tree
              ref="tree"
              :data="resource"
              show-checkbox
              :props="defaultProps"
              :node-key="defaultProps.value"
              @node-click="handleCheckChange"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="前置任务" prop="preTask" :label-width="formLabelWidth">
          <el-select
            v-model="shellData.preTask"
            multiple
            filterable
            clearable
            allow-create
            default-first-option
            placeholder="请选择文章标签">
            <el-option
              v-for="item in preTask"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Shell',
  data () {
    return {
      formLabelWidth: '100px',
      preTask: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
        }],
      resource: [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
        value: 'id'
      },
      shellData: {
        resource: [],
        preTask: []
      },
      rules: {}
    }
  },
  methods: {
    handleCheckChange (e) {
      // console.log(e)
      const list = this.getTreeName(this.resource, e.id)
      // console.log(list)
      this.shellData["resource"].push(list)
    },
    getTreeName(list, id) {
      if (list?.length) {
        for (let i = 0; i < list.length; i++) {
          const a = list[i];
          if (a.id === id) {
            return a;
          } else {
            if (a.children && a.children.length > 0) {
              const res = this.getTreeName(a.children, id);
              if (res) {
                return res;
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer__content {
  padding: 0px 20px;
}
</style>