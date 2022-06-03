/**
 * 
 */
import { NAVPATH, ROOT_NAVPATH } from 'pages/path'

const nav: { name: string, link: string, path: NAVPATH }[] = [
  {
    name: '发现音乐',
    link: '',
    path: NAVPATH.ROOT
  },
  {
    name: '我的音乐',
    link: '',
    path: NAVPATH.MY
  },
  {
    name: '朋友',
    link: '',
    path: NAVPATH.FRIEND
  },
  {
    name: '商城',
    link: 'https://music.163.com/store/product',
    path: NAVPATH.NULL
  },
  {
    name: '音乐人',
    link: 'https://music.163.com/st/musician',
    path: NAVPATH.NULL
  },
  {
    name: '下载客户端',
    link: '',
    path: NAVPATH.DOWNLOAD
  }
]

const rootNav: { name: string, path: ROOT_NAVPATH }[] = [
  {
    name: '推荐',
    path: ROOT_NAVPATH.DISCOVER
  },
  {
    name: '排行榜',
    path: ROOT_NAVPATH.TOPLIST
  },
  {
    name: '歌单',
    path: ROOT_NAVPATH.PLAYLIST
  },
  {
    name: '主播电台',
    path: ROOT_NAVPATH.DJRADIO
  },
  {
    name: '歌手',
    path: ROOT_NAVPATH.ARTIST
  },
  {
    name: '新碟上架',
    path: ROOT_NAVPATH.ALBUM
  }
]

// 初始化登录数据
interface IInitData {
  profile: { [propsName: string]: any },
  code: number,
  account: { [propsName: string]: any }
}

export type {
  IInitData
}

export {
  NAVPATH,
  ROOT_NAVPATH,
  nav,
  rootNav
}
