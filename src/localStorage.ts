/**
 * 持久存储对象及其收集的变量在此文件声明
 */
// window.localStorage对象
const LocalStorage: Storage = window.localStorage

// 国家区号列表
const COUNTRIES_CODE_LIST = 'countriesCodeList'

// 歌单分类
const CATLIST = 'catlist'

// 底部播放器锁
const PLAY_LOCK = 'play_lock'

export default LocalStorage
export {
    COUNTRIES_CODE_LIST,
    CATLIST,
    PLAY_LOCK
}
