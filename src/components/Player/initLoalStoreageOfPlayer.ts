/**
 * 初始化持久存储操作集合
 */
import wLocalStoreage, { PLAY_LOCK, PLAY_LIST, PLAY_POS, PLAY_MODE, PLAY_VOLUME, PLAY_LYRIC } from '@/utils/localStorage'

function initLocalStoreageOfPlayer(): void {
  if (wLocalStoreage.getItem(PLAY_LOCK) === undefined || wLocalStoreage.getItem(PLAY_LOCK) === null) {
    wLocalStoreage.setItem(PLAY_LOCK, '0')
  }
  if (wLocalStoreage.getItem(PLAY_LIST) === undefined || wLocalStoreage.getItem(PLAY_LIST) === null) {
    wLocalStoreage.setItem(PLAY_LIST, '[]')
  }
  if (wLocalStoreage.getItem(PLAY_LIST) === undefined || wLocalStoreage.getItem(PLAY_LIST) === null || wLocalStoreage.getItem(PLAY_LIST) === '[]' || wLocalStoreage.getItem(PLAY_POS) === undefined || wLocalStoreage.getItem(PLAY_POS) === null) {
    wLocalStoreage.setItem(PLAY_POS, '0')
  }
  if (wLocalStoreage.getItem(PLAY_MODE) === undefined || wLocalStoreage.getItem(PLAY_MODE) === null) {
    wLocalStoreage.setItem(PLAY_MODE, '0')
  }
  if (wLocalStoreage.getItem(PLAY_VOLUME) === undefined || wLocalStoreage.getItem(PLAY_VOLUME) === null) {
    wLocalStoreage.setItem(PLAY_VOLUME, '1')
  }
  if (wLocalStoreage.getItem(PLAY_LYRIC) === undefined || wLocalStoreage.getItem(PLAY_LYRIC) === null) {
    wLocalStoreage.setItem(PLAY_LYRIC, '{}')
  }
}

export default initLocalStoreageOfPlayer
