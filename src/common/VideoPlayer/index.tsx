/**
 * 视频播放器
 */
import React, { useState, useEffect, useRef, memo, useCallback } from 'react'
import { getMvUrl, getVideoUrl, cancelMv } from 'network/video'
import { IVideoPlayerProps, ICtrlRef } from './typing'
import initLocalStoreage from './initLocalStoreage'
import Ctrl from './Ctrl'
import styles from './styles/index.module.less'

initLocalStoreage()

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
    const flagRef = useRef<number>()

    useEffect(() => {

        if (isMv) {
            id && getMvUrl(id).then(res => {
                try {
                    setUrl('https://' + res.data.url.substring(7))
                } catch (e) {

                }
            })
        } else {
            id && getVideoUrl(id).then((res: any) => {
                try {
                    setUrl('https://' + res.urls[0].url.substring(7))
                } catch (e) {

                }
            })
        }

        return () => {
            cancelMv.cancelGetMvUrl && cancelMv.cancelGetMvUrl()
            cancelMv.cancelGetVideoUrl && cancelMv.cancelGetVideoUrl()
        }
    }, [props, id, isMv])

    const flagClick = useCallback(() => {

        if (show) {
            ctrlRef.current?.flagCallback(true);
            setShow(false)
        } else {
            ctrlRef.current?.flagCallback(false);
            setShow(true)
        }
    }, [show])

    const MouseMove = useCallback(() => {
        window.clearTimeout(flagRef.current)

        ctrlRef.current?.ctrlShowFlag(true)
    }, [])

    const MouseOut = useCallback(() => {

        flagRef.current = window.setTimeout(() => {
            ctrlRef.current?.ctrlShowFlag(false)
        }, 3000)
    }, [])

    return (
        <div className={styles['video-player']} onMouseMove={MouseMove} onMouseOut={MouseOut}>
            <div className='player' onClick={flagClick}>
                <video ref={(e) => setVideoEl(e)} className='media' src={url} autoPlay controls={false} />
                <div className='ffull' style={{ visibility: show ? 'visible' : 'hidden' }}>
                    <i className='icn pointer'></i>
                </div>
            </div>
            <Ctrl ref={ctrlRef} duration={duration} videoEl={videoEl} callback={(flag: boolean) => setShow(flag)} />
        </div>
    )
}

export default memo(VideoPlayer)