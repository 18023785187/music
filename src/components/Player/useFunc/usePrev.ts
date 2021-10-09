/**
 * 下一首歌
 */
import wLocalStoreage, { PLAY_LIST, PLAY_POS } from '@/localStorage'
import setState from '../setState'

function usePrev(): () => void {

    return () => {
        const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
        const curPos: number = Number(wLocalStoreage.getItem(PLAY_POS))

        let resPos: number = curPos

        if (curPos === 0) {
            resPos = playlist.length - 1
        } else {
            resPos = curPos - 1
        }

        setState.setCurPos && setState.setCurPos(resPos)
        wLocalStoreage.setItem(PLAY_POS, resPos.toString())
    }
}

export default usePrev
