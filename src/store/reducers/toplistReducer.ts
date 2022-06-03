/**
 * 所有榜单，榜单详情等
 */
import { toplistState, IToplistState } from '../states'
import { IToplistAcion, IPlaylistAcion } from '../acionTypes'
import { TOPLIST } from '../constants'

const toplistReducer = (state = toplistState, acion: IToplistAcion | IPlaylistAcion): IToplistState => {

  switch (acion.type) {
    case TOPLIST.TOPLIST:
      return {
        ...state,
        toplist: acion.toplist
      }
    case TOPLIST.PLAYLIST:
      const playlist = state.playlistDetail
      return {
        ...state,
        playlistDetail: {
          ...playlist,
          ...acion.playlist
        }
      }
    default:
      return state
  }
}

export default toplistReducer
