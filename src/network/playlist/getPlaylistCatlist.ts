/**
 * 获取歌单分类,category以区分类别
 */
import request from '../request'

function getPlaylistCatlist() {
  return request({
    url: '/playlist/catlist',
  })
}

export default getPlaylistCatlist