<template>
  <svg class="svg-icon" :class="svgClass" aria-hidden="true" v-on="$listeners">
    <title>{{ title }}</title>
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    title: {
      type: String,
      default: "",
    },
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      return '' + this.className;
    }
  }
}
</script>

<style scoped>
.svg-icon {
  max-width: 6em;
  max-height: 6em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
/* 组件宽高由真实设备/车位宽高除以100得来，如：6500mm 对应像素换算 6500/100 = 65px */
/* AGV */
.agv {
  width: 17.83px;
  height: 42px;
}
/* AGV充电桩 */
.agv-charger {
  width: 24.6px;
  height: 55px;
}
/* 载车板 */
.carrier-plate {
  width: 21.6px;
  height: 45px;
}
/* 载车板架 */
.carrier-plate-frame {
  width: 24.6px;
  height: 50px;
}
/* 对接机构(双层) */
.docking-mechanism-double {
  width: 24.6px;
  height: 55px;
}
/* 对接机构(顶层) */
.docking-mechanism-top {
  width: 24.6px;
  height: 55px;
}
/* 升降电梯 */
.elevator {
  width: 40px;
  height: 58px;
}
/* 双层车位 */
.double-carport {
  width: 24.6px;
  height: 55px;
}
/* 双层车位(加宽) */
.double-carport-widen {
  width: 25.2px;
  height: 55px;
}
/* 过道车位 */
.passage-carport {
  width: 24.6px;
  height: 55px;
}
/* 过道车位(加宽) */
.passage-carport-widen {
  width: 25.2px;
  height: 55px;
}
/* 可旋转过道车位 */
.rotatable-passage-carport {
  width: 24.6px;
  height: 58px;
}
/* 可旋转过道车位(加宽) */
.rotatable-passage-carport-widen {
  width: 25.2px;
  height: 58px;
}
/* 停取交接区 */
.junction-area {
  width: 40px;
  height: 65px;
}
/* 升降式交接区 */
.up-down-junction-area {
  width: 48px;
  height: 65px;
}
</style>
