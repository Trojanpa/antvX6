// 事件监听

export default (that, containerRef, FunctionExt) => {
  // 监听历史版本
  that.graph.history.on('change', () => {
    that.canRedo = that.graph.history.canRedo()
    that.canUndo = that.graph.history.canUndo()
  })
  // 是否显示右则菜单
  that.graph.on('blank:click', () => {
    that.nodeId = ''
    that.showRight = false
  })
  // 节点点击
  that.graph.on('node:click', ({ node }) => {
    const data = node.store.data
    const { type, id } = data
    
    if (type === 'taskNode') {
      that.nodeId = id
      that.showRight = true
    } else {
      that.nodeId = ''
      that.showRight = false
    }
  })
  // 节点鼠标移入
  that.graph.on('node:mouseenter', FunctionExt.debounce(() => {
      // 添加连接点
      const ports = containerRef.querySelectorAll('.x6-port-body')
      that.showPorts(ports, true)
    }),
    500
  )
  // 节点鼠标移出
  that.graph.on('node:mouseleave', ({ node }) => {
    // 添加连接点
    const ports = containerRef.querySelectorAll('.x6-port-body');
    that.showPorts(ports, false);
    // 移除删除
    node.removeTools()
  })
  // 连接线鼠标移入
  that.graph.on('edge:mouseenter', ({ edge }) => {
    edge.addTools([
      'source-arrowhead',
      'target-arrowhead',
      {
        name: 'button-remove',
        args: {
          distance: -30,
        }
      }
    ])
  })
  // 连接线鼠标移出
  that.graph.on('edge:mouseleave', ({ edge }) => {
    edge.removeTools()
  })
  // cell 节点时才触发
  that.graph.on('node:added', ({ node }) => {
    const data = node.store.data

    if (data.type === 'taskNode') {
      const obj = {
        id: data.id,
        name: '任务节点',
        desc: '节点内容'
      }
      that.nodeData.push(obj);
    }
  })
  that.graph.on('node:removed', ({ node }) => {
    const data = node.store.data;
    if (data.type === 'taskNode') {
      const posIndex = that.nodeData.findIndex((item) => item.id === data.id);
      that.nodeData.splice(posIndex, 1);
    }
  })
  that.graph.on('selection:changed', (args) => {
    args.added.forEach(cell => {
      console.log(cell)
      that.selectCell = cell
    })
  });
}
