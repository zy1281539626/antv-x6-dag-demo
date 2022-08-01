<template>
  <div class="drawer__content">
    <el-form :model="shellData" :rules="rules">
      <el-row>
        <el-form-item label="脚本" prop="script" :label-width="formLabelWidth">
          <div id="container"></div> 
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="资源" prop="resource" :label-width="formLabelWidth">
          <el-select
            v-model="shellData.resource"
            multiple
            clearable
            @change="changeSelect"
          >
            <el-option
              v-for="item in selectOptions"
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
              default-expand-all
              @check="handleCheckChange"
            />
          </el-select>
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
  name: "Shell",
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
      resource: [{
        id: 1,
        label: "一级 1",
        children: [{
          id: 3,
          label: "二级 1-1",
          children: [{
            id: 4,
            label: "三级 1-1-1"
            }, {
              id: 5,
              label: "三级 1-1-2"
          }]
        }]
      }, {
        id: 2,
        label: "一级 2",
        children: [{
          id: 6,
          label: "二级 2-1",
          children: [{
            id: 7,
            label: "三级 2-1-1"
          }]
        }]
      }],
      shellData: {
        resource: [],
        preTask: [],
        script: null,
        params: []
      },
      selectOptions: [{}],
      schemas: {},
      paramsArray: [],
      rules: {},
      oldValue: "",
      isSave: true
    };
  },
  watch: {
    editor(val) {
      console.log(val.getValue());
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
      // const paramsObject = this.schemas.paramsValue.reduce((pre, cur) => {
      //   pre[cur.prop] = cur.value;
      //   return pre;
      // }, {});
      const paramsObject = {
        prop: 'ss',
        inOut: 'in',
        paramsOption: 'var',
        value: 'aa'
      }
      this.paramsArray.push(paramsObject);
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
          }
      });
    },
      //保存编辑器方法
      saveEditor() {
          this.oldValue = this.editor.getValue();
          // ...保存逻辑
      },
      handleCheckChange() {
          const checkNodes = this.$refs.tree.getCheckedNodes(true);
          this.selectOptions = checkNodes.length > 0 ? checkNodes : [{}];
          this.shellData.resource = this.selectOptions.filter(item => !!item.id).map((item) => item.id);
      },
      changeSelect(data) {
          this.$refs.tree.setCheckedKeys(data);
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