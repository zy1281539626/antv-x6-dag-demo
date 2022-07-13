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