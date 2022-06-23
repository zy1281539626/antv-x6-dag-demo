import '@antv/x6-vue-shape'

import Test from './Test.vue'

const shapeList = [
  {
    name: 'dag-test',
    group: '组1',
    node: {
      inherit: 'vue-shape',
      width: 150,
      height: 100,
      component: {
        template: `<Test>`,
        components: {
          Test
        }
      }
    }
  }
]

export {
  shapeList
}

// function registerShape(stencil){
//   Graph.registerNode('dag-test', {
//     inherit: 'vue-shape',
//     component: {
//       template: `<Test>`,
//       components: {
//         Test
//       }
//     }
//   })
// }

// export {
//   registerShape
// }