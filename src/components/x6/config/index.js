import "@antv/x6-vue-shape";
import { Graph, Addon } from "@antv/x6";
import { nodes, edges, ports } from "./shape";

// 初始化画布
export function initGraph(container){
  const graph = new Graph({
    container,
    background: {
      color: "#f5f7fa",
    },
    grid: {
      // 网格样式
      size: 10,
      type: "doubleMesh",
      visible: true,
      args: [
        {
          color: "#E7E8EA",
          thickness: 1,
        },
        {
          color: "#dce0e5",
          thickness: 1,
          factor: 5,
        },
      ],
    },
    snapline: true, // 对齐线
    scroller: {
      enabled: true,
      pannable: true,
      pageVisible: true,
      pageBreak: false,
    },
    mousewheel: {
      // 鼠标滚轮放大缩小
      enabled: true,
      modifiers: ["ctrl", "meta"],
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    highlighting: {
      // 指定触发某种交互时的高亮样式
      magnetAdsorbed: {
        // 当链接桩可以被链接时
        name: "stroke",
        args: {
          attrs: {
            stroke: "#31d0c6",
            strokeWidth: 4,
          },
        },
      },
    },
    connecting: {
      // 全局的连线规则
      snap: true,
      allowBlank: false,
      allowLoop: false,
      highlight: true,
      connector: "rounded",
      router: {
        name: "manhattan",
        args: {
          step: 15,
        },
      },
      // validateMagnet({ magnet }) {
      //   return magnet.getAttribute('port-group') !== 'top'
      // },
      createEdge: () => {
        return graph.createEdge({
          shape: "dag-edge",
          zIndex: -1,
        });
      },
    },
    selecting: {
      enabled: true,
      multiple: true, // 启动多选
      rubberEdge: true, // 框选包含边线
      rubberNode: true, // 框选包含节点
      modifiers: "shift",
      rubberband: true, // 启用框选,按'modifiers'配置
    },
    clipboard: true, // 启用剪贴板
    keyboard: {      // 启用键盘操作
      enabled: true,
      global: true,
    },
  });
  return graph;
}

// 注册自定义node、edge、port
export function registerComponents(){
  nodes.forEach((item) => {
    Graph.registerNode(item.name, {
      inherit: "vue-shape",
      width: item.width || 100, // 模板组件宽度
      height: item.height || 24, // 模板组件高度
      component: item.vNode,
      ports: ports[0],
      // propHooks(metadata) {
      //   metadata.config = item.config
      //   return metadata
      // }
    });
  });

  edges.forEach((item) => {
    Graph.registerEdge(item.name, item.edgeNode, true)
  })
}

// 初始化组件面板
export function initStencilPanel(graph, container){
  const panelWidth = 250; // 模板画布宽度
  const rowHeight = 40; // 每行的行高
  const paddingY = 15;  // y轴偏移量（边距）
  const layoutOptions = {
    columns: 1,  // 单列
    dx: panelWidth / 4, // columns 为1时偏移量（宽度/4）居中
    rowHeight, 
    dy: paddingY, 
  }
  const groups = [
    {
      name: "group1",
      title: "常用组件",
      collapsable: false,
      layoutOptions,
      nodes: [
        { shape: "dag-node", title: "Shell", config: [] },
        { shape: "dag-node", title: "Sql", config: [] },
      ]
    },
    // {
    //   name: "group2",
    //   title: "Group(Collapsable)",
    //   layoutOptions
    // }
  ]
  const stencil = new Addon.Stencil({
    title: "组件",
    target: graph,
    search(cell, keyword) {
      if(keyword){
        // const searchName = cell.store.data?.config?.title?.toLowerCase()
        // return searchName && searchName.indexOf(keyword?.toLowerCase()) !== -1
      }
      return true
    },
    placeholder: "请输入组件名",
    notFoundText: "无数据",
    collapsable: true,
    stencilGraphWidth: panelWidth, 
    groups
  })
  container.appendChild(stencil.container);

  groups.forEach(g=>{
    stencil.load(g.nodes, g.name)
    stencil.resizeGroup(g.name, {height: g.nodes.length * rowHeight + paddingY * 2})
  })
}

// 渲染数据
export function renderGraphData(graph, data){
  const cells = [];
  data.forEach((item) => {
    if (item.shape === "dag-node") {
      cells.push(graph.createNode(item));
    } else if (item.shape === "dag-edge") {
      cells.push(graph.createEdge(item));
    }
  });
  graph.resetCells(cells);
}

// 获取数据
export function getGraphData(graph){
  const originData = graph.toJSON();
  const formatData = originData.cells.map((item) => {
    if (item.shape === "dag-node") {
      return {
        ...item.position,
        shape: item.shape,
        id: item.id,
        data: item.data,
        zIndex: item.zIndex,
      };
    } else if (item.shape === "dag-edge") {
      return item;
    }
  });
  return formatData;
}