/**
 * 歌单页
 */

import React, { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { PLAY_LIST, USER } from 'pages/path'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import { getSongDetail } from 'network/song'
import LazyLoad from '@/utils/LazyLoad'

interface IProps {
  data: { [propsName: string]: any }
}

function Playlists(props: IProps) {
  const { data: playlists } = props
  const addSong = useAddSong()
  const playSong = usePlaySong()

  const addSongClick = useCallback((id: number | string) => {
    getSongDetail(id).then((res: any) => {
      try {
        addSong(res.songs[0])
      } catch (e) {

      }
    })
  }, [addSong])

  const playSongClick = useCallback((id: number | string) => {
    getSongDetail(id).then((res: any) => {
      try {
        playSong(res.songs[0])
      } catch (e) {

      }
    })
  }, [playSong])

  useEffect(() => {
    LazyLoad.update()
  })

  return (
    <div className='playlists'>
      <table className='m-table' cellSpacing="0" cellPadding="0">
        <tbody>
          {
            playlists.playlists && playlists.playlists.map((playlist: any, index: number) => {
              const { id, coverImgUrl, name, trackCount, creator, bookCount, playCount } = playlist
              const { userId, nickname } = creator

              return (
                <tr key={id} className={`h-flag ${index % 2 === 1 ? 'even' : ''}`}>
                  <td className='first w0'>
                    <div className='hd'>
                      <i className='ply table-img' title='播放' onClick={() => playSongClick(playlist.id)}></i>
                    </div>
                  </td>
                  <td className='w7'>
                    <Link className='link' to={PLAY_LIST + `?id=${id}`}>
                      <img data-src={coverImgUrl + '?param=50y50'} alt={name} width={50} height={50} />
                      <span title={name} className="msk coverall"></span>
                    </Link>
                  </td>
                  <td>
                    <div className='hshow'>
                      <span className='pointer icon1 u-btn u-icn81' title="添加到播放列表" onClick={() => addSongClick(playlist.id)}></span>
                      <span className='pointer icon1 u-btn icn icn-fav' title="收藏"></span>
                      <span className='pointer icon1 u-btn icn icn-share' title="分享"></span>
                    </div>
                    <div className='tt'>
                      <div className='ttc'>
                        <span className='txt'>
                          <Link className='hover' to={PLAY_LIST + `?id=${id}`} title={name}>{name}</Link>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='w11 s-fc4'>{trackCount}首</td>
                  <td className='w4'>
                    <div className='txt'>
                      <span className="s-fc3">by</span>
                      &nbsp;&nbsp;
                      <Link className='hover s-fc3' to={USER.HOME + `?id=${userId}`} title={nickname}>{nickname}</Link>
                    </div>
                  </td>
                  <td className='w6 s-fc4'>
                    收藏：{bookCount >= 100000 ? (bookCount / 10000).toFixed(1).toString() + '万' : bookCount}
                  </td>
                  <td className='last w6 s-fc4'>
                    收听：{playCount >= 100000 ? (playCount / 10000).toFixed(1).toString() + '万' : playCount}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Playlists
