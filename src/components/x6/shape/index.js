import "@antv/x6-vue-shape";

import Test from "./Test.vue";
import DagNode from "./DagNode.vue";

let portsGroup = ["top","bottom","left","right"].reduce((caculate, item)=>{
  caculate.groups[item] = {
    position: item,
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: "#C2C8D5",
        strokeWidth: 1,
        fill: "#fff",
      },
    },
  }
  return caculate
}, {groups: {}})

portsGroup = {
  groups: {
    group1: {
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: '#C2C8D5',
          strokeWidth: 1,
          fill: '#fff',
        }
      },
      position: {
        name: 'right'
      },
    },
  },
  items: [
    {
      id: 'port1',
      group: 'group1',
      args: {
        dx: -20
      },
      markup: [
        {
          tagName: 'g',
          selector: 'body',
          children: [
            {
              tagName: 'circle',
              selector: 'circle-outer'
            },
            {
              tagName: 'text',
              selector: 'plus-text'
            },
            // {
            //   tagName: 'circle',
            //   selector: 'circle-inner'
            // }
          ]
        }
      ],
      attrs: {
        body: {
          magnet: true
        },
        'plus-text': {
          fontSize: 12,
          fill: '#C2C8D5',
          text: '+',
          textAnchor: 'middle',
          x: 0,
          y: 3
        },
        'circle-outer': {
          stroke: '#C2C8D5',
          strokeWidth: 1,
          r: 6,
          fill: '#FFFFFF'
        },
        // 'circle-inner': {
        //   r: 4,
        //   fill: 'transparent'
        // }
      },
    },
  ],
}


const shapeGroups = [
  {
    name: "group1",
    title: "Group1",
    collapsable: false,
    layoutOptions: {
      columns: 1,
      dx: 250 / 4, // columns 为1时偏移量（宽度/4）居中
      rowHeight: 40, // 每行的行高
      dy: 15, // y轴偏移量（边距）
    },
    nodes: [
      {
        name: "dag-node",
        group: "group1",
        node: {
          template: `<dag-node />`,
          components: {
            DagNode,
          }
        },
        width: 180,
        height: 36,
        // ports: [
        //   {
        //     id: 'port1',
        //     group: 'top',
        //   },
        //   {
        //     id: 'port2',
        //     group: 'bottom',
        //   },
        //   {
        //     id: 'port3',
        //     group: 'bottom',
        //   },
        //   {
        //     id: 'port4',
        //     group: 'right',
        //   }
        // ]
      },
      {
        name: "dag-test1",
        group: "group1",
        node: {
          template: `<Test />`,
          components: {
            Test,
          },
        },
      }
    ],
  },
  {
    name: "group2",
    title: "Group(Collapsable)",
    layoutOptions: {
      columns: 1,
      dx: 250 / 4, // columns 为1时偏移量（宽度/4）居中
      rowHeight: 30, // 每行的行高
      dy: 15, // y轴偏移量（边距）
    },
    nodes: [
      {
        name: "dag-test3",
        group: "group1",
        node: {
          template: `<Test />`,
          components: {
            Test,
          },
        },
      },
    ],
  },
];

export { shapeGroups, portsGroup };
