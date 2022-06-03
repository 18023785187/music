// 向列表添加歌曲
import setState from '../setState'
import wLocalStoreage, { PLAY_LIST } from '@/utils/localStorage'

function useAddSong(): (info: { [propName: string]: any }) => void {

  return (info: { [propName: string]: any }) => {
    setState.setAddShow && setState.setAddShow(true)

    const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)

    if (playlist.findIndex(song => song.id === info.id) !== -1) return

    playlist.push(info)

    wLocalStoreage.setItem(PLAY_LIST, JSON.stringify(playlist))

    setState.setPlaylist && setState.setPlaylist(playlist)
  }
}

export default useAddSong
