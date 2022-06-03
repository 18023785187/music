/**
 * 播放
 */
import setState from '../setState'

function useChange(): (curTime: number) => void {

  return (curTime: number) => {
    setState.setCurTime && setState.setCurTime(curTime ?? 0)
  }
}

export default useChange
