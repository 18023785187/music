/**
 * 歌曲过滤器
 */
import { getSongDetail, getCheckMusic } from 'network/song'
import PubSub, { PUBSUB } from '@/utils/PubSub'

function songFilter(id: number | string, handler: Function, message: string) {
  getCheckMusic(id).then((res: any) => {
    try {
      if (res.success) {
        getSongDetail(id).then((res: any) => {
          try {
            handler(res.songs[0])
          } catch (e) {

          }
        })
      }
    } catch (e) {
      PubSub.publish(PUBSUB.TOAST_SHOW, {
        showWran: 'err',
        txt: message
      })
    }
  })
}

export default songFilter
