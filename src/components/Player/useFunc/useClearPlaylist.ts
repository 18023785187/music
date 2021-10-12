/**
 * 清空歌曲列表
 */
import wLocalStoreage, { PLAY_LIST, PLAY_POS } from '@/localStorage'
import setState from '../setState'
import onChange from './useChange'
import onStop from './useStop'
import { clearAudioUrl } from '../audio'

const oChange = onChange()
const oStop = onStop()

function useClearPlaylist(): () => void {

    return () => {
        setState.setCurPos && setState.setCurPos(0)
        setState.setPlaylist && setState.setPlaylist([])

        wLocalStoreage.setItem(PLAY_POS, '0')
        wLocalStoreage.setItem(PLAY_LIST, '[]')

        oChange(0)
        oStop()

        clearAudioUrl()
    }
}

export default useClearPlaylist
