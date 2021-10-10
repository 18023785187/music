/**
 * 下一首歌
 */
import { resetAudio, addAudio } from '../audio'
import onPlay from './usePlay'
import wLocalStoreage, { PLAY_LIST, PLAY_POS } from '@/localStorage'
import setState from '../setState'

const oPlay = onPlay()

function usePrev(): () => void {

    return () => {
        const playlist: { [propName: string]: any }[] = JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string)
        const curPos: number = Number(wLocalStoreage.getItem(PLAY_POS))

        let resPos: number = curPos

        if (curPos === playlist.length - 1) {
            resPos = 0
        } else {
            resPos = curPos + 1
        }

        setState.setCurPos && setState.setCurPos(resPos)
        wLocalStoreage.setItem(PLAY_POS, resPos.toString())

        addAudio(() => {
            oPlay()
            resetAudio()
        })
    }
}

export default usePrev
