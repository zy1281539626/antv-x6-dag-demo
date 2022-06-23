<template>
  <div class="x6-wrap">
    <div class="stencil-container" ref="stencilContainer"></div>
    <div class="graph-container" ref="graphContainer"></div>
  </div>
</template>

<script>
import { Graph, Addon, Shape } from '@antv/x6';
import { shapeList } from './shape'
export default {
  name: 'x6',
  data() {
    return {
      stencil: null,
      graph: null,
    }
  },
  mounted() {
    // 初始化画布
    this.graph = new Graph({
      container: this.$refs['graphContainer'],
      background: {
        color: '#fffbe6'
      },
      grid: {
        size: 10,
        visible: true
      },
      snapline: true, // 对齐线
      scroller: {
        enabled: true,
        pannable: true,
        pageVisible: true,
        pageBreak: false,
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
    })

    // 初始化组件面板
    const { Stencil } = Addon
    this.stencil = new Stencil({
      title: '组件',
      target: this.graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1
      },
      placeholder: 'Search by shape name',
      notFoundText: 'Not Found',
      collapsable: true,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      groups: [
        {
          name: 'group1',
          title: 'Group',
          collapsable: false,
        },
        {
          name: 'group2',
          title: 'Group(Collapsable)',
        },
      ],
    })
    this.$refs['stencilContainer'].appendChild(this.stencil.container)



    // 注册组件
    shapeList.forEach(item => {
      Graph.registerNode(item.name, item.node)

      // const { Rect } = Shape
      // const r = new Rect({
      //   width: 70,
      //   height: 40,
      //   attrs: {
      //     rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
      //     text: { text: 'rect', fill: 'white' },
      //   },
      // })
      // this.stencil.load([r], 'group1')
      console.log(item.name)
      this.stencil.load({ shape: item.name }, 'group1')
    })

  }
}
</script>

<style lang="scss" scoped>
.x6-wrap {
  display: flex;
  height: 100vh;

  .stencil-container {
    position: relative;
    width: 250px;
  }

  .graph-container {
    flex: 1;
  }
}
</style>