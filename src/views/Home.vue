<template>
  <div class="antv-x6">
    <div class="node-c">
      <dl @mousedown="startDragToGraph('startNode', $event)">
        <dt class="circle start"></dt>
        <dd>开始节点</dd>
      </dl>
      <dl @mousedown="startDragToGraph('endNode', $event)">
        <dt class="circle end"></dt>
        <dd>结束节点</dd>
      </dl>
      <dl @mousedown="startDragToGraph('taskNode', $event)">
        <dt class="rect end"></dt>
        <dd>任务节点</dd>
      </dl>
      <dl>
        <el-button @click="getData">获取数据</el-button>
      </dl>
      <el-collapse v-model="nodesCollapse">
        <el-collapse-item :title="nodes.label" :name="nodes.type" v-for="(nodes, index) in nodesList" :key="nodes.type + index">
          <div class="node-warp">
            <div v-show="node.isShow" v-for="(node, index) in nodes.children" :key="node.shape + '' + index" class="node-card">
              <span class="svg-box">
                <designer-img :img-type="node.data.actionType" class="img-wh" @mousedown="startDrag(node, $event)" />
              </span>
              <span>{{ node.label }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="mini-map-container" ref="miniMapContainerRef"></div>
    <div class="container" ref="containerRef"></div>
    <div class="operating">
      <el-tooltip class="item" effect="light" content="撤销" placement="bottom">
        <i class="el-icon-refresh-left" :class="{opacity: !canUndo}" @click="undoFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="重做" placement="bottom">
        <i class="el-icon-refresh-right" :class="{opacity: !canRedo}" @click="redoFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="放大" placement="bottom">
        <i class="el-icon-zoom-in" @click="zoomInFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="缩小" placement="bottom">
        <i class="el-icon-zoom-out" :class="{opacity: !canZoomOut}" @click="zoomOutFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="导出PNG" placement="bottom">
        <i class="el-icon-picture-outline" @click="exportPNGFn"></i>
      </el-tooltip>
    </div>
    <right-drawer v-if="showRight" @updateVisable="updateVisableFn" :node-data="filterFn(nodeData)" :select-cell="selectCell"></right-drawer>
  </div>
</template>

<script>
import '@antv/x6-vue-shape';
import { Graph, Shape, FunctionExt, Addon, DataUri } from '@antv/x6';
import { ports } from './graph/methods';
import registerNodes from "./graph/registerNodes";
import eventListener from "./graph/event";
import bindKey from "./graph/bindKey";
import { nodesList } from "./graph/nodesBar";
import RightDrawer from './components/RightDrawer';
import { preloadImage } from "@/utils/common";

export default {
  components: {
    RightDrawer
  },
  data() {
    return {
      dnd: {},
      graph: null,
      selectCell: '',
      canRedo: false,
      canUndo: false,
      canZoomOut: true,
      showRight: false,
      nodeData: [],
      nodeId: '',
      nodesCollapse: 'equipment-com',
      nodesList,
    }
  },
  mounted() {
    this.initAntvX6();
    this.initDnd();
  },
  methods: {
    // 初始化拖拽插件
    initDnd() {
      this.dnd = new Addon.Dnd({
        target: this.graph,
        validateNode() {
          return true;
        },
      });
    },
    initAntvX6() {
      const containerRef = this.$refs.containerRef;
      const miniMapContainerRef = this.$refs.miniMapContainerRef;
      const graph = new Graph({
        container: containerRef, // 画布的容器
        autoResize: true,
        // 网格
        grid: {
          size: 1,
          visible: true,
          type: 'doubleMesh',
          args: [
            {
              color: '#E7E8EA',
              thickness: 1
            },
            {
              color: '#CBCED3',
              thickness: 1,
              factor: 5
            }
          ]
        },
        background: {
          color: '#ffffff'
        },
        snapline: {
          enabled: true,
          sharp: true,
          tolerance: 3,
          // clean: false,
        },
        history: true, // 启动历史记录
        clipboard: true, // 剪切板
        keyboard: {
          enabled: true,
          global: true,
        },
        panning: {
          enabled: true,
          eventTypes: ["leftMouseDown", "rightMouseDown", "mouseWheel"],
        },
        // Scroller 后可开启小地图
        minimap: {
          enabled: true,
          container: miniMapContainerRef
        },
        // 鼠标滚轮的默认行为是滚动页面
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta'],
          minScale: 0.1,
          maxScale: 16
        },
        // 点选/框选，默认禁用。
        selecting: {
          enabled: true,
          multiple: true,
          movable: true,
          showNodeSelectionBox: true,
          following: true,
          rubberband: true, // 启用框选
          modifiers: "ctrl", // 组合键
        },
        // 节点连接
        connecting: {
          anchor: 'center',
          connectionPoint: 'anchor',
          snap: true, // 自动吸附
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
          createEdge () {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#1890ff',
                  strokeWidth: 1,
                  targetMarker: {
                    name: 'classic',
                    size: 8
                  },
                  strokeDasharray: 0, //虚线
                  style: {
                    animation: 'ant-line 30s infinite linear'
                  }
                }
              },
              label: {
                text:''
              },
              connector: 'normal',
              router: {
                name: 'manhattan'
              },
              zIndex: 0
            })
          }
        },
        // 高亮
        highlighting: {
          magnetAvailable: {
            name: 'stroke',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 4,
                stroke: '#6a6c8a'
              }
            }
          }
        }
      });
      this.graph = graph;
      // 清除 history 版本
      this.graph.history.redo();
      this.graph.history.undo();
      eventListener(this, containerRef, FunctionExt);
      registerNodes(this);
      bindKey(this.graph);
      // this.redrawGraphBg();
    },
    // 显示连线节点
    showPorts (ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    // 开始拖拽
    startDrag(currentTarget, event) {
      console.log(currentTarget);
      const node = this.graph.createNode(currentTarget);
      this.dnd.start(node, event);
    },
    // 拖拽节点新增
    startDragToGraph(type, e) {
      const graph = this.graph
      let node = null
      this.showRight = false
      this.nodeId = ''

      // 验证 startNode endNode 是否已存在，只能添加一个
      if (['startNode', 'endNode'].includes(type)) {
        const graphData = this.graph.toJSON()
        const posIndex = graphData.cells.findIndex((item) => item.type === type)

        if (posIndex >= 0) return
      }

      switch(type) {
        case 'startNode':
          node = graph.createNode({
            type: 'startNode',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 60,
            height: 60,
            ports,
            component: 'start-node-component'
          });
          break;
        case 'endNode':
          node = graph.createNode({
            type: 'endNode',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 60,
            height: 60,
            ports,
            component: 'end-node-component'
          });
          break;
        case 'taskNode':
          node = graph.createNode({
            type: 'taskNode',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 300,
            height: 121,
            ports,
            data: {
              name: '任务节点',
              desc: '节点内容'
            },
            component: 'task-node-component'
          });
        break;
      }
      this.dnd.start(node, e)
    },
    // 获取数据
    getData() {
      console.log(this.nodeData)
      console.log(this.graph)
      console.log(this.graph.toJSON())
    },
    // 更新 RightDrawer visable
    updateVisableFn(val) {
      this.nodeData.taskId = ''
      this.showRight = val
    },
    // 过滤任务节点数据
    filterFn(data) {
      const nodeId = this.nodeId
      let result = {}
      
      if (nodeId && data.length > 0) {
        const posIndex = data.findIndex(item => item.id === nodeId)
        if (posIndex >= 0) {
          result = data[posIndex]
        }
      }

      return result
    },
    // 导出PNG
    exportPNGFn() {
      this.$nextTick(()=>{
        this.graph.toPNG((dataUri) => {
          // 下载
          DataUri.downloadDataUri(dataUri, '资产拓扑图.png')
        },{
          backgroundColor: 'white',
          padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          },
          quality: 1,
          serializeImages: true,
          copyStyles: false
        })
      })
    },
    // 放大
    zoomInFn() {
      this.graph.zoom(0.1)
      this.canZoomOut = true
    },
    // 缩小
    zoomOutFn() {
      if (!this.canZoomOut) return
      const Num = Number(this.graph.zoom().toFixed(1))

      if(Num > 0.1){
        this.graph.zoom(-0.1)
      } else {
        this.canZoomOut = false
      }
    },
    // 重做
    redoFn() {
      if (!this.canRedo) return
      this.graph.history.redo()
    },
    // 撤消
    undoFn() {
      if (!this.canUndo) return
      this.graph.history.undo()
    },
    // 重绘画布背景
    async redrawGraphBg() {
      const path = 'https://s2.loli.net/2022/06/29/uj4zWIYa2rtd6VF.jpg';
      const result = await preloadImage(path);
      console.log(result);
      const bgImage = result;
      this.graph.drawBackground({
        color: '#ccc',
        image: path,
        size: {
          width: bgImage?.width,
          height: bgImage?.height
        },
        position: {
          x: 0,
          y: 0
        },
      });
      const cells = this.graph.getCells();
      if (cells.length > 0) {
        this.graph.centerContent();
      } else {
        this.graph.positionPoint({ x: 0, y: 0 }, 0, 0);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.antv-x6 {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  box-sizing:border-box;
  .node-c {
    width: 250px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    border-right: 1px solid #ccc;
    padding: 20px;
    user-select: none;
    dl {
      margin-bottom: 20px;
      line-height: 30px;
      display: flex;
      cursor: move;
      dt {
        &.circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          &.start {
            border: 1px solid green;
            background: greenyellow;
          }
          &.end {
            border: 1px solid salmon;
            background: red;
          }
        }
        &.rect {
          width: 30px;
          height: 30px;
          border: 1px solid #ccc;
        }
      }
      dd {
        font-size: bold;
        font-size: 14px;
        padding: 0 0 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .node-warp {
      display: flex;
      flex-flow: wrap;
      box-sizing: border-box;
      overflow: hidden;

      .node-card {
        display: inline-block;
        width: 60px;
        margin: 2px;
        > .svg-box {
          display: inline-block;
          width: 100%;
          height: 60px;
          text-align: center;
          padding: 10px 0;
          background:rgba(0, 0, 0, 0.3);
          /deep/ svg {
            width: 4em;
            height: 4em;
            &:hover {
              transform: scale(1.1);
            }
          }
          .img-wh {
            height: 60px;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
  .container {
    flex: 1;
  }
  .operating {
    position: fixed;
    top: 0;
    left: 250px;
    z-index: 999;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 1px 1px 4px 0 #0a0a0a2e;
    i {
      font-size: 24px;
      cursor: pointer;
      margin: 0 10px;
      color: #515a6e;
      &:hover {
        color: #2d8cf0;
      }
      &.opacity {
        opacity: .5;
      }
    }
  }
}
.mini-map-container {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}
</style>
