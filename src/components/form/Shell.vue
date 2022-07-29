import { index } from '@antv/x6/lib/util/dom/elem';
<template>
  <div class="drawer__content">
    <el-form :model="shellData" :rules="rules">
      <el-row>
        <el-form-item label="资源" prop="resource" :label-width="formLabelWidth">
          <el-select
            v-model="parentName"
            multiple
            clearable
            @clear="clearAllChecked"
            @remove-tag='clearChecked'
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
              node-key="id"
              :check-on-click-node="true"
              default-expand-all
              :props="defaultProps"
              @check="handleCheckChange"
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
        value: '1',
        label: 'HTML'
      }, {
        value: '2',
        label: 'CSS'
      }, {
        value: '3',
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
      parentName: [],
      originResource: [],
      rules: {}
    }
  },
  methods: {
    clearChecked (e) {
      this.originResource.map((item, index) => {
        if (item.label === e) {
          this.shellData["resource"].splice(index, 1)
          this.originResource.splice(index, 1)
          this.$refs.tree.setChecked(item.id, false)
        }
      })
    },
    clearAllChecked () {
      this.shellData["resource"] = []
      this.originResource = []
      this.$refs.tree.setCheckedKeys([])
    },
    handleCheckChange (e, checked) {
      console.log(e, checked)
      const checkValue = checked.checkedKeys.includes(e.id)
      if (!checkValue) {
        if (checked.checkedKeys.length === 0) {
          this.shellData["resource"] = []
          this.originResource = []
          this.parentName = []
        } else {
          if (this.shellData["resource"].length > 0) {
            const index = this.shellData["resource"].findIndex(item => item === e.id)
            this.shellData["resource"].splice(index, 1)
            this.parentName.splice(index, 1)
            this.originResource.splice(index, 1)
          }
        }
      } else {
        this.handleNodeClick(e)
      }
    },
    handleNodeClick (e) {
      const list = this.getTreeName(this.resource, e.id)
      const resourceLen = this.shellData["resource"].length > 0 ? this.shellData["resource"] : false
      if (resourceLen) {
        for (let i = 0; i < resourceLen.length; i++) {
          const item = resourceLen[i]
          if (item === e.id) {
            return
          } else {
            if (i === (resourceLen.length - 1)) {
              this.shellData["resource"].push(list.id)
              this.parentName.push(list.label)
              this.originResource.push(list)
            }
          }
        }
      } else {
        this.shellData["resource"].push(list.id)
        this.parentName.push(list.label)
        this.originResource.push(list)
      }
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