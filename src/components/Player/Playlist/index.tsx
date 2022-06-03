/**
 * 播放列表与歌词
 */
import React, { useState, useRef, useEffect, memo } from 'react'
import { useClearPlaylist } from '../useFunc'
import List from './List'
import Lyric from './Lyric'
import setState from '../setState'

interface IProps {
  playlist: { [propName: string]: any }[],
  curPos: number
}

function Playlist(props: IProps) {
  const { playlist, curPos } = props
  const { al, name } = playlist[curPos] ?? { al: { picUrl: '' }, name: '' }
  const { picUrl } = al

  // 关闭弹窗
  const [close, setClose] = useState<boolean>(true)
  // 添加提示
  const [addShow, setAddShow] = useState<boolean>(false)
  const timerRef = useRef<number>()

  setState.setAddShow = setAddShow

  //
  const clearPlaylist = useClearPlaylist()

  //
  useEffect(() => {
    window.clearTimeout(timerRef.current)

    timerRef.current = window.setTimeout(() => {
      setAddShow(false)
    }, 2000)
  }, [addShow])

  return (
    <>
      {/* 按钮 */}
      <div className='playlist' onClick={() => { close ? setClose(false) : setClose(true) }}>
        <span className="tip playbar-img" style={{ display: addShow ? 'block' : 'none' }}>已添加到播放列表</span>
        <i className='icn-list s-fc3 playbar-img pointer' title="播放列表">{playlist.length}</i>
      </div>
      {/* 播放列表与歌词 */}
      <div className='list' style={{ display: close ? 'none' : 'block' }}>
        {/* 标题与操控栏 */}
        <div className='listhd playlist_bg'>
          <div className='listhdc'>
            <h4>播放列表(<span>{playlist.length}</span>)</h4>
            <i className="addall pointer hover">
              <span className="ico ico-add playlist_img"></span>
              收藏全部
            </i>
            <span className="line"></span>
            <i className="clear pointer hover" onClick={() => clearPlaylist()}>
              <span className="ico icn-del playlist_img"></span>
              清除
            </i>
            <p className="lytit f-ff0 f-thide">{name}</p>
            <span className="close playlist_img pointer" onClick={() => setClose(true)}>关闭</span>
          </div>
        </div>
        {/* 内容区，播放列表与歌词 */}
        <div className='listbd playlist_bg'>
          <img className='imgbg' src={picUrl} alt={name} />
          <div className='msk'></div>
          {/* 歌曲列表 */}
          <List playlist={playlist} curPos={curPos} />
          {/* 疑问按钮 */}
          <div className='ask'>
            <i className='ico-ask playlist playlist_img pointer'></i>
          </div>
          <div className='msk2'></div>
          {/* 歌词位 */}
          <Lyric id={playlist[curPos]?.id ?? 0} />
        </div>
      </div>
    </>
  )
}

export default memo(Playlist)
