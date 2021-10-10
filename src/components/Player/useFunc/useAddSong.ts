// 向列表添加歌曲
import setState from '../setState'
import wLocalStoreage, { PLAY_LIST } from '@/localStorage'

function useAddSong(): (info: { [propName: string]: any }) => void {

    return (info: { [propName: string]: any }) => {

        const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)

        if (playlist.findIndex(song => song.al.id === info.al.id) !== -1) return

        playlist.push(info)

        wLocalStoreage.setItem(PLAY_LIST, JSON.stringify(playlist))

        setState.setPlaylist && setState.setPlaylist(playlist)
    }
}

export default useAddSong
