/**
 * 左边的主体
 */
import React, { useState, useEffect, useCallback, memo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ARTIST } from 'pages/path'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import getAlbum, { cancelGetAlbum } from 'network/album/getAlbum'
import { getCheckMusic } from 'network/song'
import { LazyLoad, formatDate, songFilter } from 'utils/index'
import PubSub, { PUBSUB } from '@/utils/PubSub'
import Buttons from 'common/Buttons'
import Songs from './Songs'

interface IProps {
  id: string
}

function Content(props: IProps) {
  const { id } = props

  const addSong = useAddSong()
  const playSong = usePlaySong()

  // 专辑详情
  const [albumDetail, setAlbumDetail] = useState<{ [propName: string]: any }>({})
  // 专辑里的歌
  const [songs, setSongs] = useState<{ [propName: string]: any }[]>([])

  const { name, picUrl, description, status, company, publishTime, artists, info } = albumDetail
  const { commentCount, shareCount } = info ?? {}

  const addSongsClick = useCallback(() => {
    songs.forEach((song: { [propName: string]: any }) => {
      const { id } = song

      getCheckMusic(id).then((res: any) => {
        try {
          if (res.success) {
            addSong(song)
          }
        } catch (e) {
          PubSub.publish(PUBSUB.TOAST_SHOW, {
            showWran: 'err',
            txt: '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）'
          })
        }
      })
    })
  }, [songs, addSong])
  const playSongsClick = useCallback(() => {
    addSongsClick()
    songFilter(songs[0]?.id ?? 0, playSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
  }, [addSongsClick, playSong, songs])

  useEffect(() => {
    getAlbum(id).then((res: any) => {
      if (res?.album && res?.songs) {
        setAlbumDetail(res.album)
        setSongs(res.songs)
        LazyLoad.update()
      }
    }).catch(rej => {

    })

    return () => {
      cancelGetAlbum.cancelGetAlbum && cancelGetAlbum.cancelGetAlbum()
    }
  }, [id])

  return (
    <div className='album-content'>
      {/* 专辑详情 */}
      <div className='m-info'>
        {/* 头像 */}
        <div className='u-cover u-cover-alb'>
          <img data-src={picUrl + '?param=177y177'} alt={name} />
          <span className='msk coverall'></span>
        </div>
        {/* 内容 */}
        <div className='cnt'>
          <div className='topblk'>
            <div className='hd'>
              <div className='lab'>
                {status === 1 ? <i className='icon1 u-icn-98'>VIP专辑</i> : <i className='icon1 u-icn-16'></i>}
              </div>
              <h2 className='f-ff2'>{name}</h2>
            </div>
            <p className='intr'>
              歌手：<span title={artists && artists.map((a: any) => a.name).join('/')}>
                {
                  artists && artists.map((a: any, i: number) => {
                    const { name, id } = a

                    return i !== artists.length - 1 ? <Fragment key={id}>
                      <Link className='s-fc7' to={ARTIST + `?id=${id}`}>{name}</Link>
                      /
                    </Fragment> : <Link className='s-fc7' key={id} to={ARTIST + `?id=${id}`}>{name}</Link>
                  })
                }
              </span>
            </p>
            <p className='intr'>
              发行时间：{formatDate(new Date(publishTime), 'yyyy-MM-dd')}
            </p>
            <p className='intr'>
              发行公司：{` ${company} `}
            </p>
          </div>
          <Buttons dynamic={{
            commentCount: commentCount < 100000 ? commentCount : (commentCount / 10000).toFixed(1) + '万',
            shareCount: shareCount < 100000 ? shareCount : (shareCount / 10000).toFixed(1) + '万'
          }} playFunc={playSongsClick} addFunc={addSongsClick} />
        </div>
      </div>
      {/* 专辑概述内容 */}
      <div className='n-albdesc'>
        <h3>专辑介绍：</h3>
        <div className='f-brk'>
          {description?.split('\n').map((p: string) => p && <p key={p}>{p}</p>)}
        </div>
      </div>
      {/* 歌曲列表 */}
      <Songs id={id} songs={songs} />
    </div>
  )
}

export default memo(Content)
