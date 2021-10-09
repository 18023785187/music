/**
 * 播放器提供的hooks方法集合,调用这些hooks可以改变播放器组件的状态,触发渲染
 */
import useAddSong from './useAddSong'
import usePlaySong from './usePlaySong'
import usePrev from './usePrev'
import useNext from './useNext'

export {
    useAddSong,
    usePlaySong,
    usePrev,
    useNext
}
