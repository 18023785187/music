// 播放歌曲
import wLocalStoreage, { PLAY_LIST, PLAY_POS } from '@/localStorage'
import setState from '../setState'

function usePlaySong(): (info: { [propName: string]: any }) => void {
    return (info: { [propName: string]: any }) => {
        const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
        const curIdx: number = playlist.findIndex(song => song.al.id === info.al.id)

        if (curIdx === -1) {
            playlist.unshift(info)

            wLocalStoreage.setItem(PLAY_LIST, JSON.stringify(playlist))
            wLocalStoreage.setItem(PLAY_POS, '0')

            setState.setPlaylist && setState.setPlaylist(playlist)
            setState.setCurPos && setState.setCurPos(0)
            return
        }

        wLocalStoreage.setItem(PLAY_LIST, JSON.stringify(playlist))
        wLocalStoreage.setItem(PLAY_POS, curIdx.toString())

        setState.setPlaylist && setState.setPlaylist(playlist)
        setState.setCurPos && setState.setCurPos(curIdx)
    }
}

export default usePlaySong