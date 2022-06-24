<template>
  <img :src="base64Img[typeName]" :alt="alt" class="img-box" aria-hidden="true" v-on="$listeners" />
</template>

<script>
import { base64Img as designerBase64Img } from "@/assets/icons/base64/designer-components.js";
export default {
  name: 'DesignerImg',
  props: {
    imgType: {
      type: String,
      required: true
    },
    title: {
      type: String,
    },
  },
  computed: {
    // 图片提示
    alt() {
      return this.title || this.imgType;
    },
    // 图片类型
    typeName() {
      return this.imgType;
    },
  },
  data() {
    return {
      base64Img: designerBase64Img,
    }
  },
}
</script>

<style lang="less" scoped>
.img-box {
  width: 100%;
  height: 100%;
}
</style>
