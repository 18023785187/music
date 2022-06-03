/**
 * 播放
 */
import setState from '../setState'
import { playAudio } from '../audio'

function usePlay(): () => void {

  return () => {
    setState.setIsPlay && setState.setIsPlay(true)
    playAudio()
  }
}

export default usePlay
