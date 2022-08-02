<template>
  <div class="drawer__content">
    <el-form :model="shellData" :rules="rules">
      <el-row>
        <el-form-item label="数据源" prop="datasource" :label-width="formLabelWidth">
          <el-select v-model="shellData.datasource" @change="changeDataSour">
            <el-option
              v-for="item in datasource"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
          <el-select v-model="shellData.selectsource" prop="selectsource" :label-width="formLabelWidth">
            <el-option
              v-for="item in selectsource"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="sql类型" prop="search" :label-width="formLabelWidth">
            <el-select v-model="shellData.search" @change="changeSearch">
              <el-option
                v-for="item in searchOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="showSqlData" :span="8">
          <el-form-item label="发送邮件" prop="emialvalue" :label-width="formLabelWidth">
            <el-switch v-model="shellData.emialvalue"></el-switch>
          </el-form-item>
        </el-col>
        <el-col v-if="showSqlData" :span="8">
          <el-form-item label="日志显示" prop="logView" :label-width="formLabelWidth">
            <el-select
              v-model="shellData.logView"
              filterable>
              <el-option
                v-for="item in logOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
            <span slot="append">行查询结果</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="脚本" prop="script" :label-width="formLabelWidth">
          <div id="container"></div> 
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item
          :label="schemas['paramsLabel']"
          :prop="schemas['params']"
          :label-width="formLabelWidth">
          <DynamicParams :schemasType="schemas" :paramsArray.sync="paramsArray"></DynamicParams>
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
import * as monaco from 'monaco-editor'
import dataParams from "@/mock/paramsForm";
import DynamicParams from './component/DynamicParams.vue';
export default {
  name: "Sql",
  components: { DynamicParams },
  data() {
    return {
      formLabelWidth: "100px",
      editor: null,
      preTask: [{
        value: "1",
        label: "HTML"
      }, {
        value: "2",
        label: "CSS"
      }, {
        value: "3",
        label: "JavaScript"
        }],
      datasource: [{
        label: 'MYSQL',
        value: '1'
      }, {
        label: 'POSTGRESQL',
        value: '2'
      }, {
        label: 'HIVE',
        value: '3'
        }],
      searchOption: [{
        label: '查询',
        value: '1'
      }, {
        label: '非查询',
        value: '2'
        }],
      logOption: [{
        label: '1',
        value: '1'
      }, {
        label: '10',
        value: '10'
      }, {
        label: '25',
        value: '25'
        }],
      selectsource: [],
      shellData: {
        preTask: [],
        script: null,
        params: [],
        datasource: '',
        selectsource: '',
        emialvalue: false
      },
      schemas: {},
      paramsArray: [],
      rules: {},
      oldValue: "",
      isSave: true,
      showSqlData: false
    };
  },
  watch: {
    shellData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$emit('paramsCom', val)
      }
    },
    paramsArray: {
      immediate: true,
      deep: true,
      handler (val) {
        this.shellData.params = val
      }
    }
  },
  mounted() {
    this.initEditor();
    this.initSchemas();
  },
  methods: {
    initSchemas() {
      const schemas = Object.assign({}, dataParams);
      this.schemas = schemas?.shellForm;
      const paramsObject = {
        prop: 'ss',
        inOut: 'in',
        paramsOption: 'var',
        value: 'aa'
      }
      this.paramsArray.push(paramsObject);
    },
    changeSearch (val) {
      this.showSqlData = val === '1' ? true : false
    },
    changeDataSour (val) {
      if (val === '1') {
        const datasource = {
          label: 'dev',
          value: 'dev'
        }
        this.selectsource.push(datasource)
      } else {
        this.selectsource = []
        this.shellData.selectsource = ''
      }
    },
    initEditor() {
      // 初始化编辑器，确保dom已经渲染
      this.editor = monaco.editor.create(document.getElementById("container"), {
        value: "",
        language: "sql",
        automaticLayout: true,
        theme: "vs-dark" //官方自带三种主题vs, hc-black, or vs-dark
      });
      this.editor.onKeyUp(() => {
        // 当键盘按下，判断当前编辑器文本与已保存的编辑器文本是否一致
        if (this.editor.getValue() != this.oldValue) {
          this.isSave = false;
          this.shellData.script = this.editor.getValue()
        }
      });
    },
    //保存编辑器方法
    saveEditor() {
      this.oldValue = this.editor.getValue();
      // ...保存逻辑
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer__content {
  padding: 0px 20px;
}
#container {
  min-height: 100px;
}
</style>