/**
 * 懒加载组件单例模式
 */
import { LazyLoad } from "h-tools-js";
import temp from 'assets/img/temp.jpg'

export default new LazyLoad({
  preload: 1.2,
  loading: temp,
  error: temp,
  eventListener: ['scroll', 'resize']
})
