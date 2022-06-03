// 播放歌曲
import onPlay from './usePlay'
import { addAudio, resetAudio } from '../audio'
import wLocalStoreage, { PLAY_LIST, PLAY_POS } from '@/utils/localStorage'
import setState from '../setState'

const oPlay = onPlay()

function usePlaySong(): (info: { [propName: string]: any }) => void {
  return (info: { [propName: string]: any }) => {
    const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
    const curIdx: number = playlist.findIndex(song => song.id === info.id)

    if (curIdx === -1) {
      playlist.unshift(info)

      wLocalStoreage.setItem(PLAY_LIST, JSON.stringify(playlist))
      wLocalStoreage.setItem(PLAY_POS, '0')

      setState.setPlaylist && setState.setPlaylist(playlist)
      setState.setCurPos && setState.setCurPos(0)

      addAudio(() => {
        resetAudio()
        oPlay()
      })
      return
    }

    wLocalStoreage.setItem(PLAY_LIST, JSON.stringify(playlist))
    wLocalStoreage.setItem(PLAY_POS, curIdx.toString())

    setState.setPlaylist && setState.setPlaylist(playlist)
    setState.setCurPos && setState.setCurPos(curIdx)

    addAudio(() => {
      resetAudio()
      oPlay()
    })
  }
}

export default usePlaySong
