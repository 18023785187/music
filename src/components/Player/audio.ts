/**
 * 音频
 */
import onChange from './useFunc/useChange'
import onStop from './useFunc/useStop'
import wLocalStoreage, { PLAY_LIST, PLAY_POS } from '@/localStorage'
import { getSongUrl } from 'network/song'

let flag: boolean = true
let timer: number

const audio: HTMLAudioElement = new Audio()
const urlMap: Map<string, string> = new Map()

const oChange = onChange()
const oStop = onStop()

// 事件
audio.ontimeupdate = function (e: any) {
    const { currentTime, duration } = e.target

    flag && oChange(currentTime / duration)
}
audio.onseeking = function () {
    window.clearTimeout(timer)
    flag = false

    timer = window.setTimeout(() => {
        flag = true
    }, 300)
}

// 切换音频
function addAudio(callback?: () => void) {
    oStop()

    const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
    if (!playlist || playlist.length === 0) return
    const curPos: number = Number(wLocalStoreage.getItem(PLAY_POS))

    if (urlMap.has(playlist[curPos].id)) {

        audio.src = urlMap.get(playlist[curPos].id) as string

        callback && callback()
    } else {

        getSongUrl(playlist[curPos].id).then(res => {
            try {
                audio.src = res.data[0].url
                urlMap.set(playlist[curPos].id, res.data[0].url)

                callback && callback()
            } catch (e) {

            }
        })
    }
}

// 播放
function playAudio() {
    audio.play()
}

// 停止
function stopAudio() {
    audio.pause()
}

// 重置音频时长等
function resetAudio() {
    audio.currentTime = 0
    oChange(0)
}

// 改变audio播放位置
function changeAudio(curTime: number) {
    audio.currentTime = curTime
}

export default audio
export {
    addAudio,
    playAudio,
    stopAudio,
    resetAudio,
    changeAudio
}