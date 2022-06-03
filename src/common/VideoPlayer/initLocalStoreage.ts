/**
 * 初始化持久存储对象
 */
import wLocalStoreage, { VIDEO_VOLUME } from '@/utils/localStorage'

function initLocalStoreage(): void {
  if (wLocalStoreage.getItem(VIDEO_VOLUME) === undefined || wLocalStoreage.getItem(VIDEO_VOLUME) === null) {
    wLocalStoreage.setItem(VIDEO_VOLUME, '1')
  }
}

export default initLocalStoreage
