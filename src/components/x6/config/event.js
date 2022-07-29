export function bindNodeEvent(graph, callbacks){
  // 确保连线为node，而不是port
  graph.on("edge:connected", ({ isNew, edge }) => {
    if (isNew) {
      const sourceNode = edge.getSourceNode();
      const targetNode = edge.getTargetNode();
      edge.setSource(sourceNode);
      edge.setTarget(targetNode);
    }
  });
  // 选择边线，显示箭头颜色
  graph.on('cell:selected', ({ cell }) => {
    if (cell.isEdge()) {
      cell.attr("line/targetMarker/stroke", "#1890ff");
      cell.attr("line/targetMarker/fill", "#1890ff");
    }
  })
  graph.on('cell:unselected', ({ cell }) => {
    if (cell.isEdge()) {
      cell.attr("line/targetMarker/stroke", "#b2b7c3");
      cell.attr("line/targetMarker/fill", "#b2b7c3");
    }
  })

  graph.on('node:dblclick', ({ cell }) => {
    callbacks['node:dblclick'](cell.store.data.type);
  })

  // 运行时边线动画
  graph.on('edge:connected', ({ edge }) => {
    edge.attr({
      line: {
        strokeDasharray: '',
      },
    })
  })
  graph.on('node:change:data', ({ node }) => {
    const edges = graph.getIncomingEdges(node)
    const { status } = node.getData()
    edges?.forEach((edge) => {
      const sourceNode = edge.getSourceNode();
      const sourceStatus = sourceNode.getData().status
      if (status === 'running' && sourceStatus === 'success') {
        edge.attr('line/strokeDasharray', 5)
        edge.attr('line/style/animation', 'running-line 30s infinite linear')
      } else {
        edge.attr('line/strokeDasharray', '')
        edge.attr('line/style/animation', '')
      }
    })
  })
}

export function bindKeyEvent(graph){
  // 删除节点
  graph.bindKey(['delete', 'backspace'], () => {
    if (!graph.options.editable) return;
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
    return false
  })

  // 复制
  graph.bindKey('ctrl+c', () => {
    if (!graph.options.editable) return;
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })

  // 粘贴
  graph.bindKey('ctrl+v', () => {
    if (!graph.options.editable) return;
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
}