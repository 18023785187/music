/**
 * 删除歌曲列表的某首歌
 */
import setState from '../setState'
import onPlaySong from './usePlaySong'
import wLocalStoreage, { PLAY_LIST, PLAY_POS } from '@/localStorage'
import { clearAudioUrl } from '../audio'

const oPlaySong = onPlaySong()

function useDeteleSong(): (id: number) => void {

    return (id: number) => {
        const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
        const curPos: number = Number(wLocalStoreage.getItem(PLAY_POS))
        const index: number = playlist.findIndex(song => song.id === id)

        if (index === -1) return

        playlist.splice(index, 1)

        wLocalStoreage.setItem(PLAY_LIST, JSON.stringify(playlist))

        setState.setPlaylist && setState.setPlaylist(playlist)

        if (playlist.length) {
            if (index === curPos) {
                oPlaySong(playlist[index])
            }
        } else {
            clearAudioUrl()
        }
    }
}

export default useDeteleSong
