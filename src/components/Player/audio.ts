/**
 * 音频
 */
import wLocalStoreage, { PLAY_LIST, PLAY_POS } from '@/localStorage'
import { getSongUrl } from 'network/song'

const audio: HTMLAudioElement = new Audio()
const urlMap: Map<string, string> = new Map()

function addAudio() {
    const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
    if (!playlist || playlist.length === 0) return
    const curPos: number = Number(wLocalStoreage.getItem(PLAY_POS))

    console.log(playlist[curPos].id)

    getSongUrl(playlist[curPos].id).then(res => {
        console.log(res)
        try {
            audio.src = res.data[0].url
            urlMap.set(playlist[curPos].id, res.data[0].url)
            
            audio.play()
        } catch (e) {

        }
    })
}

export default audio
export {
    addAudio
}