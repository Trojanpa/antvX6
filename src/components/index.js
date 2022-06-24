// import ImgNode from "./uni-components/img-node";
// import SvgIcon from "./uni-components/svg-icon";
// import SvgImg from "./uni-components/svg-img";
import DesignerImg from "./designer-img/index.vue"

const install = function (Vue) {
  Vue.component(DesignerImg.name, DesignerImg);
  // Vue.component(ImgNode.name, ImgNode);
  // Vue.component(SvgIcon.name, SvgIcon);
  // Vue.component(SvgImg.name, SvgImg);
};

// install
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
