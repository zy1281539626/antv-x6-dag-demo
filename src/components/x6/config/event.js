export function bindNodeEvent(graph){
  // 确保连线为node，而不是port
  graph.on("edge:connected", ({ isNew, edge }) => {
    if (isNew) {
      const sourceNode = edge.getSourceNode();
      const targetNode = edge.getTargetNode();
      edge.setSource(sourceNode);
      edge.setTarget(targetNode);
    }
  });
  // 选择边线，显示颜色
  graph.on('cell:selected', ({ cell }) => {
    if (cell.isEdge()) {
      cell.attr({
        line: {
          targetMarker: {
            stroke: '#1890ff',
            fill: '#1890ff'
          }
        }
      })
    }
  })
  graph.on('cell:unselected', ({ cell }) => {
    if (cell.isEdge()) {
      cell.attr({
        line: {
          targetMarker: {
            stroke: '#b2b7c3',
            fill: '#b2b7c3'
          }
        }
      })
    }
  })
  // 校验两个节点只能链接一条线
  graph.on('edge:connected', ({ isNew, edge }) => {
    if (isNew) {
      // 对新创建的边进行插入数据库等持久化操作
      console.log(isNew)
      console.log(edge)
    }
  })
}

export function bindKeyEvent(graph){
  // 删除节点
  graph.bindKey(['delete', 'backspace'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
    return false
  })

  // 复制
  graph.bindKey('ctrl+c', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })

  // 粘贴
  graph.bindKey('ctrl+v', () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
}