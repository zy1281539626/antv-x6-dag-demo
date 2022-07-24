import Vue from 'vue'
const dataSetCell = {
  commonData: [
    { label: '节点名称',
      prop: 'name',
      component: 'input',
      value: '111'
    },
    { label: '运行标志',
      prop: 'runMask',
      component: 'radio-group',
      value: '1',
      children: [
        {
          component: 'radio',
          label: '正常',
          prop: 'normal',
          value: '1'
        },
        {
          component: 'radio',
          label: '禁止执行',
          prop: 'ban',
          value: '0'
        }
      ]
    },
    { label: '描述',
      prop: 'desc',
      component: 'input',
      value: '',
      attrs: {
        type: 'textarea',
        placeholder: 'textareaContent'
      }
    },
    { label: '任务优先级',
      prop: 'task',
      component: 'select',
      value: 'medium',
      children: [
        {
          component: 'option',
          label: 'HIGHT',
          prop: 'hight',
          value: 'hight'
        },
        {
          component: 'option',
          label: 'MEDIUM',
          prop: 'medium',
          value: 'medium'
        },
        {
          component: 'option',
          label: 'LOW',
          prop: 'low',
          value: 'low'
        }
      ]
    },
    { label: '失败重试次数',
      prop: 'errorTimes',
      component: 'input-number',
      value: 0,
      attrs: {
        controls: false
      },
      itemSlot: 'times',
    },
    { label: '超时告警',
      prop: 'timeWarn',
      component: 'switch',
      value: false,
      events: {
        change: function handleToggleShow(val) {
          val === true ? console.log(111) : console.log(222)
        }
      }
    },
  ],
  Shell: [
    { label: 'test名称', prop: 'testname', component: 'input', value: '222' }
  ]
}
export default dataSetCell