/**
 * 视频播放器
 */
import React, { useState, useEffect, useLayoutEffect, useRef, memo, useCallback } from 'react'
import Context from './context'
import { getMvUrl, getVideoUrl, cancelMv } from 'network/video'
import { IVideoPlayerProps, ICtrlRef } from './typing'
import PubSub, { PUBSUB } from '@/utils/PubSub'
import { useStop } from 'components/Player/useFunc'
import initLocalStoreage from './initLocalStoreage'
import FullscreenNav from './FullscreenNav'
import Ctrl from './Ctrl'
import styles from './styles/index.module.less'

initLocalStoreage()

/**
 * 根据isMv判断是否是mv决定使用哪个获取地址请求，
 * 还能判断作者是否是歌手，如果不是歌手需要在名字前加 by
 */

function VideoPlayer(props: IVideoPlayerProps) {
  //const { isMv, id, duration, name, artistName, brs, cover } = props
  const { isMv, id, duration, cover, name } = props

  const [url, setUrl] = useState<string>('')
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null)

  // 包裹元素（主元素）
  const [fullscreenEl, setFullscreenEl] = useState<HTMLDivElement | null>(null)

  // 显示播放键
  const [show, setShow] = useState<boolean>(false)
  // 显示全屏标题
  const [showNav, setShowNav] = useState<boolean>(false)

  const ctrlRef = useRef<ICtrlRef>(null)
  const flagRef = useRef<number>()

  const onStop = useStop()

  useEffect(() => {
    PubSub.publish(PUBSUB.PLAYER_SHOW, false)
    onStop()

    return () => {
      PubSub.publish(PUBSUB.PLAYER_SHOW, true)
    }
  })

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

  /**
   * 调整分辨率
   */
  const setBr = useCallback((br: number) => {
    // 由于接口原因，目前只有mv能换分辨率
    if (isMv) {
      id && getMvUrl(id, br).then(res => {
        try {
          setUrl('https://' + res.data.url.substring(7))
        } catch (e) {

        }
      })
    }
  }, [id, isMv])

  // 全屏事件
  useLayoutEffect(() => {
    fullscreenEl?.addEventListener('fullscreenchange', fullscreenchange)

    function fullscreenchange() {
      setShowNav(!!document.fullscreenElement)
    }

    return () => {
      fullscreenEl?.removeEventListener('fullscreenchange', fullscreenchange)
    }
  }, [fullscreenEl])

  return (
    <Context.Provider value={{ setBr, ...props }}>
      <div
        ref={(e) => setFullscreenEl(e)}
        className={styles['video-player']}
        onMouseMove={MouseMove}
        onMouseOut={MouseOut}
      >
        <div className='player' onClick={flagClick}>
          <video
            key='video'
            ref={(e) => setVideoEl(e)}
            className='media' src={url}
            autoPlay
            controls={false}
            poster={cover}
          />
          <div className='ffull' style={{ visibility: show ? 'visible' : 'hidden' }}>
            <i className='icn pointer'></i>
          </div>
          {showNav ? <FullscreenNav titleName={name ?? ''} /> : <></>}
        </div>
        <Ctrl
          ref={ctrlRef}
          duration={duration}
          videoEl={videoEl}
          fullscreenEl={fullscreenEl}
          callback={(flag: boolean) => setShow(flag)}
        />
      </div>
    </Context.Provider>
  )
}

export default memo(VideoPlayer)
