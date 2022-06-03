/**
 * acion返回值类型
 */
import { TOPLIST } from './constants'

// 榜单，榜单详情等
interface IToplistAcion {
  type: TOPLIST.TOPLIST,
  toplist: Array<{ [key: string]: any }>
}

interface IPlaylistAcion {
  type: TOPLIST.PLAYLIST,
  playlist: {
    [propName: string]: any
  }
}

export type {
  IToplistAcion,
  IPlaylistAcion
}