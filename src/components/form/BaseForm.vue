<template>
  <div class="drawer__content">
    <el-form :model="schemasData" :rules="rules" :disabled="!editable" size="small">
      <el-row>
        <el-form-item label="节点名称" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="schemasData.name"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="运行标志" :label-width="formLabelWidth" prop="runMask">
          <el-radio-group v-model="schemasData.runMask">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁止执行</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="描述" :label-width="formLabelWidth"  prop="desc">
          <el-input type="textarea" v-model="schemasData.desc"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="任务优先级" :label-width="formLabelWidth" prop="task">
          <el-select v-model="schemasData.task">
            <el-option v-for="item in task" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Worker分组" :label-width="formLabelWidth" prop="workGroup">
            <el-select v-model="schemasData.workGroup">
              <el-option v-for="item in workGroup" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="环境名称" :label-width="formLabelWidth" prop="environment">
            <el-select v-model="schemasData.environment">
              <el-option v-for="item in environment" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="errorStyle">
          <el-form-item label="失败重试次数" :label-width="formLabelWidth" prop="errorTimes">
            <el-input v-model.number="schemasData.errorTimes">
              <span slot="append">(次)</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="errorStyle">
          <el-form-item label="失败重试间隔" :label-width="formLabelWidth" prop="errorGap">
            <el-input v-model.number="schemasData.errorGap">
              <span slot="append">(分)</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="errorStyle">
          <el-form-item label="延时执行时间" :label-width="formLabelWidth" prop="layoutTimes">
            <el-input v-model.number="schemasData.layoutTimes">
              <span slot="append">(分)</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="超时告警" prop="timeWarn">
          <el-switch v-model="schemasData.timeWarn"></el-switch>
        </el-form-item>
      </el-row>
      <el-row v-if="schemasData.timeWarn">
        <el-col>
          <el-form-item label=" 超时策略" prop="timeout">
            <el-checkbox-group v-model="schemasData.timeout">
              <el-checkbox label="timeoutwarn">超时告警</el-checkbox>>
              <el-checkbox label="timeerror">超时失败</el-checkbox>>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="schemasData.timeWarn">
        <el-col>
          <el-form-item label=" 超时时长" prop="longTimes" :label-width="formLabelWidth">
            <el-input v-model.number="schemasData.longTimes">
              <span slot="append">分</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    schemasDataAll: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    schemasData (val) {
      this.$emit('update:schemasDataAll', val)
    }
  },
  data () {
    return {
      formLabelWidth: '100px',
      task: [
        { label: 'HIGHT', value: 'hight' },
        { label: 'MEDIUM', value: 'medium' },
        { label: 'LOW', value: 'low' }
      ],
      workGroup: [
        { label: 'default', value: 'default' },
        { label: 's2', value: 's2' },
        { label: 's1', value: 's1' }
      ],
      environment: [
        { label: 'xx', value: 'xx' },
        { label: 'aa', value: 'aa' },
        { label: 'cc', value: 'cc' }
      ],
      schemasData: {},
      rules: {
        layoutTimes: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
        errorTimes: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
        longTimes: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
        errorGap: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
      }
    }
  },
  mounted () {
    this.schemasData = Object.assign({}, this.schemasDataAll)
  },
  methods: {
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
::v-deep .errorStyle .el-input-group__append,
.el-input-group__prepend {
  background-color: #fff;
  border: 0px;
  padding: 0 10px;
}
::v-deep .el-form-item__label {
  width: 100px;
}
.el-input-group {
  width: 200px;
}
</style>