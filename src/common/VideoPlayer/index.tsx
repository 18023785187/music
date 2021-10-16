/**
 * 视频播放器
 */
import React, { useRef, useEffect } from 'react'
import { getMvUrl, cancelMv } from 'network/video'
import { IVideoPlayerProps } from './typing'
import Ctrl from './Ctrl'
import styles from './styles/index.module.less'

/**
 * 根据isMv判断是否是mv决定使用哪个获取地址请求，
 * 还能判断作者是否是歌手，如果不是歌手需要在名字前加 by
 */

function VideoPlayer(props: IVideoPlayerProps) {
    const { isMv, id, duration, name, artistName, brs } = props
    console.log(isMv, id, duration, name, artistName, brs)

    const videoElRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        id && getMvUrl(id).then(res => {
            console.log(res)
        })

        return () => {
            cancelMv.cancelGetMvUrl && cancelMv.cancelGetMvUrl()
        }
    }, [props])

    return (
        <div className={styles['video-player']}>
            <div className='player'>
                <video ref={videoElRef} className='media' src=""></video>
            </div>
            <Ctrl />
        </div>
    )
}

export default VideoPlayer
