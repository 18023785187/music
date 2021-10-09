/**
 * 初始化持久存储操作集合
 */
import wLocalStoreage, { PLAY_LOCK, PLAY_LIST, PLAY_POS } from '@/localStorage'

function initLocalStoreageOfPlayer(): void {
    if (wLocalStoreage.getItem(PLAY_LOCK) === undefined || wLocalStoreage.getItem(PLAY_LOCK) === null) {
        wLocalStoreage.setItem(PLAY_LOCK, '0')
    }
    if (wLocalStoreage.getItem(PLAY_LIST) === undefined || wLocalStoreage.getItem(PLAY_LIST) === null) {
        wLocalStoreage.setItem(PLAY_LIST, '[]')
    }
    if (wLocalStoreage.getItem(PLAY_POS) === undefined || wLocalStoreage.getItem(PLAY_POS) === null) {
        wLocalStoreage.setItem(PLAY_POS, '0')
    }
}

export default initLocalStoreageOfPlayer
