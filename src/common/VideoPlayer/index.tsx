/**
 * 视频播放器
 */
import React, { useState, useEffect, useRef, memo, useCallback, MouseEvent } from 'react'
import { getMvUrl, cancelMv } from 'network/video'
import { IVideoPlayerProps, ICtrlRef } from './typing'
import Ctrl from './Ctrl'
import styles from './styles/index.module.less'

/**
 * 根据isMv判断是否是mv决定使用哪个获取地址请求，
 * 还能判断作者是否是歌手，如果不是歌手需要在名字前加 by
 */

function VideoPlayer(props: IVideoPlayerProps) {
    const { isMv, id, duration, name, artistName, brs } = props
    console.log(isMv, id, duration, name, artistName, brs)

    const [url, setUrl] = useState<string>('')
    const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null)

    // 显示播放键
    const [show, setShow] = useState<boolean>(false)

    const ctrlRef = useRef<ICtrlRef>(null)

    useEffect(() => {
        id && getMvUrl(id).then(res => {
            try {
                setUrl('https://' + res.data.url.substring(7))
            } catch (e) {

            }
        })

        return () => {
            cancelMv.cancelGetMvUrl && cancelMv.cancelGetMvUrl()
        }
    }, [props, id])

    const stopClick = useCallback(() => {

        ctrlRef.current?.flagCallback(false);
        setShow(true)
    }, [])

    const playClick = useCallback((e: MouseEvent) => {
        e.stopPropagation()

        ctrlRef.current?.flagCallback(true);
        setShow(false)
    }, [])

    return (
        <div className={styles['video-player']}>
            <div className='player'>
                <video ref={(e) => setVideoEl(e)} className='media' src={url} autoPlay />
                <div className='ffull' style={{ opacity: show ? '1' : '0' }} onClick={stopClick}>
                    <i className='icn pointer' onClick={playClick}></i>
                </div>
            </div>
            <Ctrl ref={ctrlRef} duration={duration} videoEl={videoEl} callback={(flag: boolean) => setShow(flag)} />
        </div>
    )
}

export default memo(VideoPlayer)
