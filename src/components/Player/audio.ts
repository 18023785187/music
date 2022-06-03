/**
 * 音频
 */
import onChange from './useFunc/useChange'
import onButterChange from './useFunc/useBuffterChange'
import onStop from './useFunc/useStop'
import wLocalStoreage, { PLAY_LIST, PLAY_POS, PLAY_MODE, PLAY_LYRIC } from '@/utils/localStorage'
import { getSongUrl, getLyric, cancelGetSong } from 'network/song'
import setState from './setState'
import('./useFunc/usePlay').then(res => oPlay = res.default())
import('./useFunc/useNext').then(res => oNext = res.default())
import('./useFunc/usePlaySong').then(res => oPlaySong = res.default())

let flag: boolean = true
let timer: number

const audio: HTMLAudioElement = new Audio()
const urlMap: Map<string, string> = new Map()

audio.preload = 'auto'

const oChange = onChange()
const oButterChange = onButterChange()
const oStop = onStop()
let oPlay = () => { }
let oNext = () => { }
let oPlaySong = (info: { [propName: string]: any }) => { }

// 事件
// 改变时长触发
audio.ontimeupdate = function (e: any) {
  const { currentTime, duration } = e.target

  flag && oChange(duration ? currentTime / duration : 0)
  oButterChange(duration ? bufferedAudio() / duration : 0)

}
// 用户改变时长时触发
audio.onseeking = function () {
  window.clearTimeout(timer)
  flag = false

  timer = window.setTimeout(() => {
    flag = true
  }, 300)
}
// 播放结束时触发
audio.onended = function () {
  oStop()
  const mode = Number(wLocalStoreage.getItem(PLAY_MODE) ?? 0)

  resetAudio()
  switch (mode) {
    // 单曲循环
    case 0:
      oPlay()
      break
    // 循环
    case 1:
      oNext()
      break
    // 随机
    case 2:
      const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
      const pos: number = Math.floor(Math.random() * playlist.length)

      oPlaySong(playlist[pos])
      break
  }
}

// 切换音频
function addAudio(callback?: () => void) {
  cancelGetSong.cancelGetSongUrl && cancelGetSong.cancelGetSongUrl()
  oStop()

  const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
  if (!playlist || playlist.length === 0) return
  const curPos: number = Number(wLocalStoreage.getItem(PLAY_POS))

  if (playlist[curPos]) {
    if (urlMap.has(playlist[curPos].id)) {

      audio.src = urlMap.get(playlist[curPos].id) as string

      callback && callback()
    } else {
      cancelGetSong.cancelGetSongUrl && cancelGetSong.cancelGetSongUrl()

      getSongUrl(playlist[curPos].id).then(res => {
        try {
          audio.src = 'https://' + res.data[0].url.substring(7)
          urlMap.set(playlist[curPos].id, 'https://' + res.data[0].url.substring(7))

          callback && callback()
        } catch (e) {

        }
      })
    }

    // 发歌词请求
    const lyriclist: { [propName: string]: any } = JSON.parse(wLocalStoreage.getItem(PLAY_LYRIC) as string)

    getLyric(playlist[curPos].id).then((res: any) => {

      if (res) {
        lyriclist[playlist[curPos].id] = res
        wLocalStoreage.setItem(PLAY_LYRIC, JSON.stringify(lyriclist))
        setState.setLyricMap && setState.setLyricMap(lyriclist)
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
  if (!Object.is(NaN, curTime)) {
    audio.currentTime = curTime
  }
}

// 改变音量 0 ~ 1
function changeAudioVolume(volume: number) {
  audio.volume = volume
}

// 返回缓冲时间
function bufferedAudio(): number {
  const buffered = audio.buffered
  return buffered.length ? buffered.end(0) : 0
}

// 清除音轨
function clearAudioUrl() {
  audio.src = ''
}

export default audio
export {
  addAudio,
  playAudio,
  stopAudio,
  resetAudio,
  changeAudio,
  changeAudioVolume,
  clearAudioUrl
}