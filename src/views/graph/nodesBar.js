// 初始化 节点栏 元素列表
import { ActionType } from "./enums";
import { cloneDeep } from "lodash-es";

const {
  AGV,
  AGV_CHARGER,
  CARRIER_PLATE,
  CARRIER_PLATE_FRAME,
  DOCKING_MECHANISM_DOUBLE,
  DOCKING_MECHANISM_TOP,
  ELEVATOR,
  DOUBLE_CARPORT,
  DOUBLE_CARPORT_WIDEN,
  PASSAGE_CARPORT,
  PASSAGE_CARPORT_WIDEN,
  ROTATABLE_PASSAGE_CARPORT,
  ROTATABLE_PASSAGE_CARPORT_WIDEN,
  JUNCTION_AREA,
  UP_DOWN_JUNCTION_AREA,
} = ActionType;

// 节点基础数据
export const NodeBaseData = {
  // AGV
  'agv': {
    shape: 'agv-node',
    angle: 0,
    zIndex: 10,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 17.83,
      height: 42,
    },
    data: {
      actionType: AGV,
      name: 'AGV',
    },
  },
  // AGV充电桩
  'agv-charger': {
    shape: 'agv-charger-node',
    angle: 0,
    zIndex: 3,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 24.6,
      height: 55,
    },
    data: {
      actionType: AGV_CHARGER,
      name: 'AGV充电桩',
    },
  },
  // 载车板
  'carrier-plate': {
    shape: 'carrier-plate-node',
    angle: 0,
    zIndex: 11,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 21.6,
      height: 45,
    },
    data: {
      actionType: CARRIER_PLATE,
      name: '载车板',
    },
  },
  // 载车板架
  'carrier-plate-frame': {
    shape: 'carrier-plate-frame-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 24.6,
      height: 55,
    },
    data: {
      actionType: CARRIER_PLATE_FRAME,
      name: '载车板架',
    },
  },
  // 双层充电
  'docking-mechanism-double': {
    shape: 'docking-mechanism-double-node',
    angle: 0,
    zIndex: 4,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 24.6,
      height: 55,
    },
    data: {
      actionType: DOCKING_MECHANISM_DOUBLE,
      name: '双层充电',
    },
  },
  // 过道充电
  'docking-mechanism-top': {
    shape: 'docking-mechanism-top-node',
    angle: 0,
    zIndex: 4,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 24.6,
      height: 55,
    },
    data: {
      actionType: DOCKING_MECHANISM_TOP,
      name: '过道充电',
    },
  },
  // 升降机
  'elevator': {
    shape: 'elevator-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 40,
      height: 58,
    },
    data: {
      actionType: ELEVATOR,
      name: '升降机',
    },
  },
  // 双层车位
  'double-carport': {
    shape: 'double-carport-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 24.6,
      height: 55,
    },
    data: {
      actionType: DOUBLE_CARPORT,
      name: '双层车位',
    },
  },
  // 双层车位(加宽)
  'double-carport-widen': {
    shape: 'double-carport-widen-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 25.2,
      height: 55,
    },
    data: {
      actionType: DOUBLE_CARPORT_WIDEN,
      name: '双层车位(加宽)',
    },
  },
  // 过道车位
  'passage-carport': {
    shape: 'passage-carport-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 24.6,
      height: 55,
    },
    data: {
      actionType: PASSAGE_CARPORT,
      name: '过道车位',
    },
  },
  // 过道车位(加宽)
  'passage-carport-widen': {
    shape: 'passage-carport-widen-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 25.2,
      height: 55,
    },
    data: {
      actionType: PASSAGE_CARPORT_WIDEN,
      name: '过道车位(加宽)',
    },
  },
  // 可旋转过道车位
  'rotatable-passage-carport': {
    shape: 'rotatable-passage-carport-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 24.6,
      height: 58,
    },
    data: {
      actionType: ROTATABLE_PASSAGE_CARPORT,
      name: '可旋转过道车位',
    },
  },
  // 可旋转过道车位(加宽)
  'rotatable-passage-carport-widen': {
    shape: 'rotatable-passage-carport-widen-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 25.2,
      height: 58,
    },
    data: {
      actionType: ROTATABLE_PASSAGE_CARPORT_WIDEN,
      name: '可旋转过道车位(加宽)',
    },
  },
  // 停取交接区
  'junction-area': {
    shape: 'junction-area-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 37,
      height: 65,
    },
    data: {
      actionType: JUNCTION_AREA,
      name: '停取交接区',
    },
  },
  // 电梯交接区
  'up-down-junction-area': {
    shape: 'up-down-junction-area-node',
    angle: 0,
    zIndex: 2,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 48,
      height: 65,
    },
    data: {
      actionType: UP_DOWN_JUNCTION_AREA,
      name: '电梯交接区',
    },
  },
}

// 根据类型获取节点数据
export function getNodeData(type) {
  let node;
  switch (type) {
      // 设备组件
    case AGV:
      node = cloneDeep(NodeBaseData['agv']);
      break;
    case AGV_CHARGER:
      node = cloneDeep(NodeBaseData['agv-charger']);
      break;
    case CARRIER_PLATE:
      node = cloneDeep(NodeBaseData['carrier-plate']);
      break;
    case CARRIER_PLATE_FRAME:
      node = cloneDeep(NodeBaseData['carrier-plate-frame']);
      break;
    case DOCKING_MECHANISM_DOUBLE:
      node = cloneDeep(NodeBaseData['docking-mechanism-double']);
      break;
    case DOCKING_MECHANISM_TOP:
      node = cloneDeep(NodeBaseData['docking-mechanism-top']);
      break;
    case ELEVATOR:
      node = cloneDeep(NodeBaseData['elevator']);
      break;

      // 车位组件
    case DOUBLE_CARPORT:
      node = cloneDeep(NodeBaseData['double-carport']);
      break;
    case DOUBLE_CARPORT_WIDEN:
      node = cloneDeep(NodeBaseData['double-carport-widen']);
      break;
    case PASSAGE_CARPORT:
      node = cloneDeep(NodeBaseData['passage-carport']);
      break;
    case PASSAGE_CARPORT_WIDEN:
      node = cloneDeep(NodeBaseData['passage-carport-widen']);
      break;
    case ROTATABLE_PASSAGE_CARPORT:
      node = cloneDeep(NodeBaseData['rotatable-passage-carport']);
      break;
    case ROTATABLE_PASSAGE_CARPORT_WIDEN:
      node = cloneDeep(NodeBaseData['rotatable-passage-carport-widen']);
      break;

      // 交接区组件
    case JUNCTION_AREA:
      node = cloneDeep(NodeBaseData['junction-area']);
      break;
    case UP_DOWN_JUNCTION_AREA:
      node = cloneDeep(NodeBaseData['up-down-junction-area']);
      break;
    default:
      console.error(type);
      break;
  }
  return node;
}

export const nodesList = [
  {
    label: '设备组件',
    type: 'equipment-com',
    children: [
      {
        label: "AGV",
        isShow: false,
        ...getNodeData(AGV),
      },
      {
        label: "AGV充电桩",
        isShow: true,
        ...getNodeData(AGV_CHARGER),
      },
      {
        label: "载车板",
        isShow: false,
        ...getNodeData(CARRIER_PLATE),
      },
      {
        label: "载车板架",
        isShow: true,
        ...getNodeData(CARRIER_PLATE_FRAME),
      },
      {
        label: "双层充电",
        isShow: false,
        ...getNodeData(DOCKING_MECHANISM_DOUBLE),
      },
      {
        label: "过道充电",
        isShow: false,
        ...getNodeData(DOCKING_MECHANISM_TOP),
      },
      {
        label: "升降机",
        isShow: false,
        ...getNodeData(ELEVATOR),
      },
    ],
  },
  {
    label: '车位组件',
    type: 'carport-com',
    children: [
      {
        label: "双层车位",
        isShow: true,
        ...getNodeData(DOUBLE_CARPORT),
      },
      {
        label: "双层车位(加宽)",
        isShow: true,
        ...getNodeData(DOUBLE_CARPORT_WIDEN),
      },
      {
        label: "过道车位",
        isShow: true,
        ...getNodeData(PASSAGE_CARPORT),
      },
      {
        label: "过道车位(加宽)",
        isShow: true,
        ...getNodeData(PASSAGE_CARPORT_WIDEN),
      },
      {
        label: "可旋转过道车位",
        isShow: true,
        ...getNodeData(ROTATABLE_PASSAGE_CARPORT),
      },
      {
        label: "可旋转过道车位(加宽)",
        isShow: true,
        ...getNodeData(ROTATABLE_PASSAGE_CARPORT_WIDEN),
      },
    ]
  },
  {
    label: '交接区组件',
    type: 'junction-com',
    children: [
      {
        label: "停取交接区",
        isShow: true,
        ...getNodeData(JUNCTION_AREA),
      },
      {
        label: "电梯交接区",
        isShow: false,
        ...getNodeData(UP_DOWN_JUNCTION_AREA),
      },
    ]
  },
]
