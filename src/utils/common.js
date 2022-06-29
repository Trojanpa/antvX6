import { message } from "element-ui";

// 预加载图片获取信息
export const preloadImage = function(path) {
  return new Promise((res, rej) => {
    const imageObj = new Image();
    imageObj.onload = () => {
      const result = {
        width: imageObj.width,
        height: imageObj.height,
      };
      res(result);
    }
    imageObj.onerror = err => {
      console.error('加载图片出错：', path);
      message.error('加载图片出错。');
      rej(err);
    }
    imageObj.src = path;
  });
}