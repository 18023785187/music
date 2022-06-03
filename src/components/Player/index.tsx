/**
 * 播放器
 */
import React, { useState, useCallback, useEffect } from 'react'
import Btns from './Btns'
import Head from './Head'
import Play from './Play'
import Open from './Open'
import Ctrl from './Ctrl'
import Playlist from './Playlist'
import setState from './setState'
import wLocalStoreage, { PLAY_LOCK, PLAY_LIST, PLAY_POS } from '@/utils/localStorage'
import initLocalStoreageOfPlayer from './initLoalStoreageOfPlayer'
import PubSub, { PUBSUB } from '@/utils/PubSub'
import styles from './styles/index.module.less'

initLocalStoreageOfPlayer()

const transition = {
  in: 'bottom .1s',
  out: 'bottom .7s ease .7s'
}

function Player() {
  const [playlist, setPlaylist] = useState<{ [propName: string]: any }[]>(JSON.parse(wLocalStoreage.getItem(PLAY_LIST) as string))
  const [curPos, setCurPos] = useState<number>(Number(wLocalStoreage.getItem(PLAY_POS)))
  const [lock, setLock] = useState<boolean>(Boolean(Number(wLocalStoreage.getItem(PLAY_LOCK))))
  const [isDown, setIsDown] = useState<boolean>(false)

  const [show, setShow] = useState<boolean>(true)

  // 收集setState（外部调用）
  setState.setPlaylist = setPlaylist
  setState.setCurPos = setCurPos

  // 锁的逻辑
  const lockClick = useCallback(() => {
    setLock(!lock)
    wLocalStoreage.setItem(PLAY_LOCK, !lock ? '1' : '0')
  }, [lock])
  const isDownMouseMove = useCallback(() => {
    if (!lock) {
      setIsDown(false)
    }
  }, [lock])
  const isDownMouseOut = useCallback(() => {
    if (!lock) {
      setIsDown(true)
    }
  }, [lock])

  // 锁状态
  useEffect(() => {
    const timer = window.setTimeout(isDownMouseOut, 1000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isDownMouseOut])

  // 订阅show
  useEffect(() => {
    const token = PubSub.subscribe(PUBSUB.PLAYER_SHOW, (_: PUBSUB, isShow: boolean) => {

      setShow(isShow)
    })

    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  return (
    <div
      className={`${styles['playbar']} ${isDown ? styles['down'] : ''}`}
      style={{ transition: isDown ? transition['out'] : transition['in'], display: show ? 'block' : 'none' }}
      onMouseMove={isDownMouseMove}
      onMouseOut={isDownMouseOut}>
      {/* 右侧锁样式 */}
      <div className="updn">
        <div className="left playbar-img">
          <i className={`pointer playbar-img ${lock ? 'btn' : 'btn-lock'}`} onClick={lockClick}></i>
        </div>
        <div className="right playbar-img"></div>
      </div>
      {/* 提示框 */}
      <div className="hand pointer" title="展开播放条"></div>
      {/* 背景 */}
      <div className='bg playbar-img'></div>
      {/* 逻辑样式往下写 */}
      <div className='w wrap'>
        {/* 播放切换按钮 */}
        <Btns />
        {/* 头像 */}
        <Head id={playlist.length ? playlist[curPos]?.id : undefined} imgUrl={playlist.length ? playlist[curPos]?.al?.picUrl : undefined} />
        {/* 播放器 */}
        <Play play={playlist[curPos] ? playlist[curPos] : {}} />
        {/* 分享和收藏 */}
        <Open />
        {/* 控制器 */}
        <Ctrl />
        {/* 播放列表 */}
        <Playlist playlist={playlist ?? []} curPos={curPos ?? 0} />
      </div>
    </div>
  )
}

export default Player
