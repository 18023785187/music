/**
 * 所有榜单，榜单详情等
 */
import { TOPLIST } from '../constants'

// 所有榜单
const toplistAcion = (toplist: Array<{}>) => {
  return {
    type: TOPLIST.TOPLIST,
    toplist
  }
}
// 详情页
const playlistAcion = (playlist: { [propName: string]: any }) => {
  return {
    type: TOPLIST.PLAYLIST,
    playlist
  }
}

export {
  toplistAcion,
  playlistAcion
}