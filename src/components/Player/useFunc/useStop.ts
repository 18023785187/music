/**
 * 暂止
 */
import setState from '../setState'
import { stopAudio } from '../audio'

function useStop(): () => void {

  return () => {
    setState.setIsPlay && setState.setIsPlay(false)
    stopAudio()
  }
}

export default useStop
