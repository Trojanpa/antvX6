import { Graph } from "@antv/x6";
import svgs from "@/utils/importSvgIcon";
import { NodeBaseData } from "./nodesBar";
import StartNode from '../components/StartNode';
import EndNode from '../components/EndNode';
import TaskNode from '../components/TaskNode';

const shapeList = ['agv', 'agv-charger', 'carrier-plate', 'carrier-plate-frame', 'docking-mechanism-double', 'docking-mechanism-top', 'elevator', 'double-carport', 'double-carport-widen', 'passage-carport', 'passage-carport-widen', 'rotatable-passage-carport', 'rotatable-passage-carport-widen', 'junction-area', 'up-down-junction-area'];

export default (self) => {
  // 注册 vue 组件
  Graph.registerVueComponent('start-node-component', {
    template: `<start-node></start-node>`,
    components: {
      StartNode
    }
  }, true)
  Graph.registerVueComponent('end-node-component', {
    template: `<end-node></end-node>`,
    components: {
      EndNode
    }
  }, true)
  Graph.registerVueComponent('task-node-component', {
    template: `<task-node :node-data="nodeData"></task-node>`,
    data() {
      return {
        nodeData: self.nodeData
      }
    },
    components: {
      TaskNode
    }
  }, true)
  shapeList.forEach(key => {
    const { width, height } = NodeBaseData[key]?.size;
    Graph.registerNode(
      `${key}-node`, {
        width: width,
        height: height,
        attrs: {
          body: {
            stroke: '#000000',
            strokeWidth: 0,
            fill: 'rgba(95,149,255,0.05)',
            refWidth: 1,
            refHeight: 1,
          },
          image: {
            'xlink:href': svgs[`${key}`],
            width: width,
            height: height,
            x: 0,
            y: 0,
          },
        },
        markup: [{
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'image',
            selector: 'image',
          },
        ],
      },
      true,
    );
  });
}
