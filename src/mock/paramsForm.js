const dataParams = {
  shellForm: {
    paramsLabel: '自定义参数',
    params: 'params',
    paramsValue: [
      {
        label: '节点名称',
        prop: 'prop',
        component: 'input',
        value: '',
        attrs: {
          placeholder: '请选择',
        },
      },
      {
        label: '任务优先级',
        prop: 'inOut',
        component: 'select',
        value: 'in',
        children: [
          {
            component: 'option',
            label: 'In',
            prop: 'In',
            value: 'in',
          },
          {
            component: 'option',
            label: 'Out',
            prop: 'Out',
            value: 'out',
          },
        ],
      },
      {
        label: '任务优先级',
        prop: 'paramsOption',
        component: 'select',
        value: 'int',
        children: [
          {
            component: 'option',
            label: 'VARCHAR',
            prop: 'VARCHAR',
            value: 'var',
          },
          {
            component: 'option',
            label: 'INTEGER',
            prop: 'INTEGER',
            value: 'int',
          },
        ],
      },
      {
        label: '111',
        prop: 'value',
        component: 'input',
        value: '',
        attrs: {
          placeholder: '请选择',
        },
      },
    ],
  },
};
export default dataParams;
