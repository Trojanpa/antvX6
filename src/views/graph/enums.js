/**
 * 节点作用类型
 */
export const ActionType = {
  /**@type {String} AGV */
  AGV: 'AGV',
  /**@type {String} AGV充电桩 */
  AGV_CHARGER: 'AGV_CHARGER',
  /**@type {String} 载车板 */
  CARRIER_PLATE: 'CARRIER_PLATE',
  /**@type {String} 载车板架 */
  CARRIER_PLATE_FRAME: 'CARRIER_PLATE_FRAME',
  /**@type {String} 双层充电 */
  DOCKING_MECHANISM_DOUBLE: 'DOCKING_MECHANISM_DOUBLE',
  /**@type {String} 过道充电 */
  DOCKING_MECHANISM_TOP: 'DOCKING_MECHANISM_TOP',
  /**@type {String} 升降机 */
  ELEVATOR: 'ELEVATOR',
  /**@type {String} 双层车位 */
  DOUBLE_CARPORT: 'DOUBLE_CARPORT',
  /**@type {String} 双层车位(加宽) */
  DOUBLE_CARPORT_WIDEN: 'DOUBLE_CARPORT_WIDEN',
  /**@type {String} 过道车位 */
  PASSAGE_CARPORT: 'PASSAGE_CARPORT',
  /**@type {String} 过道车位(加宽) */
  PASSAGE_CARPORT_WIDEN: 'PASSAGE_CARPORT_WIDEN',
  /**@type {String} 可旋转过道车位 */
  ROTATABLE_PASSAGE_CARPORT: 'ROTATABLE_PASSAGE_CARPORT',
  /**@type {String} 可旋转过道车位(加宽) */
  ROTATABLE_PASSAGE_CARPORT_WIDEN: 'ROTATABLE_PASSAGE_CARPORT_WIDEN',
  /**@type {String} 停取交接区 */
  JUNCTION_AREA: 'JUNCTION_AREA',
  /**@type {String} 电梯交接区 */
  UP_DOWN_JUNCTION_AREA: 'UP_DOWN_JUNCTION_AREA',
}