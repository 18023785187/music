/**
 * 路由表
 */

// 顶部导航
enum NAVPATH {
  ROOT = '/',
  MY = '/my',
  FRIEND = '/friend',
  DOWNLOAD = '/download',
  NULL = ''
}

// 首页导航
enum ROOT_NAVPATH {
  DISCOVER = '/discover',
  TOPLIST = '/discover/toplist',
  PLAYLIST = '/discover/playlist',
  DJRADIO = '/discover/djradio',
  ARTIST = '/discover/artist',
  ALBUM = '/discover/album'
}

// 歌手
enum ROOT_ARTIST {
  SIGNED = ROOT_NAVPATH.ARTIST,
  CAT = ROOT_NAVPATH.ARTIST + '/cat/'
}

// 用户
enum USER {
  HOME = 'user/home',
  LEVEL = 'user/level',
  MUMBER = 'user/mumber',
  UPDATE = 'user/update'
}

// 个人信息
enum MSG {
  AT = 'mas/at'
}

// 专辑
const ALBUM = '/album'

// 歌单
const PLAY_LIST = '/playlist'

//
const ARTIST = '/artist'

// 歌
const SONG = '/song'

// mv
const MV = '/mv'
// 视频
const VIDEO = '/video'

// 主播
const DJRADIO = '/djradio'

// 搜索
const SEATCH = '/search'

// 404
const NOT_FOUND = '/not_found'

// 歌手页引申的子导航
enum ARTISTS {
  ARTIST = '/artist',
  ALBUM = '/artist/album',
  MV = '/artist/mv',
  DESC = '/artist/desc'
}

export {
  NAVPATH,
  ROOT_NAVPATH,
  ROOT_ARTIST,
  USER,
  MSG,
  ALBUM,
  PLAY_LIST,
  ARTIST,
  SONG,
  MV,
  VIDEO,
  DJRADIO,
  SEATCH,
  NOT_FOUND,
  ARTISTS
}
