/**
 * 改变缓冲时间
 */
import setState from '../setState'

function useBuffterChange(): (buffterTime: number) => void {

  return (buffterTime: number) => {
    setState.setBufferTime && setState.setBufferTime(buffterTime ?? 0)
  }
}

export default useBuffterChange

