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
// 播放列表
const PLAY_LIST = 'play_list'
// 播放指针
const PLAY_POS = 'play_pos'
// 歌曲播放模式
const PLAY_MODE = 'play_mode'
// 歌曲播放音量
const PLAY_VOLUME = 'play_volume'
// 歌词
const PLAY_LYRIC = 'play_lyric'

// 视频音量
const VIDEO_VOLUME = 'video_volume'

export default LocalStorage
export {
  COUNTRIES_CODE_LIST,
  CATLIST,
  PLAY_LOCK,
  PLAY_LIST,
  PLAY_POS,
  PLAY_MODE,
  PLAY_VOLUME,
  PLAY_LYRIC,
  VIDEO_VOLUME
}
