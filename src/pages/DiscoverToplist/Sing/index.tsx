/**
 *  歌曲单
 */
import React, { useState, useEffect, useMemo, useCallback, Fragment, memo } from 'react'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import { SONG, ARTIST, MV } from 'pages/path'
import LazyLoad from '@/utils/LazyLoad'
import Comment from 'common/Comment'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import _getComment, { cancelGetComment } from 'network/comment'
import _getPlaylistDetail, { cancelGetPlaylistDetail } from 'network/playlist/getPlaylistDetail'
import { formatDate, songFilter } from 'utils'

interface IProps extends RouteComponentProps {
  defaultId: string
}

function Sing(props: IProps) {
  const { defaultId, location } = props
  const { search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])

  const [detail, setDetail] = useState<{ [propName: string]: any }>({})
  const [commentHot, setCommentHot] = useState<{ [propName: string]: any } | null>(null)
  const [comment, setComment] = useState<{ [propName: string]: any }>({})

  const addSong = useAddSong()
  const playSong = usePlaySong()

  const addSongClick = useCallback((id: number | string) => {

    songFilter(id, addSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
  }, [addSong])

  const playSongClick = useCallback((id: number | string) => {

    songFilter(id, playSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
  }, [playSong])

  useEffect(() => {
    let { id } = parse
    if (!id) id = defaultId

    getPlaylistDetail()

    async function getPlaylistDetail() {
      const res: any = await _getPlaylistDetail(id as string)

      try {
        if (res.code === 200) {
          setDetail(res)
          LazyLoad.update()
        }
      } catch (e) {

      }
    }

    return () => {
      cancelGetPlaylistDetail.cancelGetPlaylistDetail && cancelGetPlaylistDetail.cancelGetPlaylistDetail()
    }
  }, [defaultId, parse])

  // 发评论请求
  useEffect(() => {
    let { id } = parse
    if (!id) id = defaultId

    getCommentHot()

    async function getCommentHot() {
      const res: any = await _getComment(id as string)

      try {
        setCommentHot(res.data)
        getComment()
      } catch (e) {

      }
    }

    async function getComment() {
      const res: any = await _getComment(id as string, 2, 3, 1, 20)

      try {
        setComment(res.data)
      } catch (e) {

      }
    }

    return () => {
      cancelGetComment.cancelGetComment && cancelGetComment.cancelGetComment()
    }
  }, [defaultId, parse])

  // 发最新评论请求的方法，需要传给Comment组件
  const getComment = useCallback((page: string | number = 0) => {
    cancelGetComment.cancelGetComment && cancelGetComment.cancelGetComment()
    let { id } = parse
    if (!id) id = defaultId
    const { cursor } = comment ?? {}

    _getComment(id as string, 2, 3, Number(page) + 1, 20, cursor).then(res => {
      try {
        setComment(res.data)
      } catch (e) {

      }
    })

  }, [parse, defaultId, comment])

  return (
    <div className='g-wrap12'>
      {/* 导航栏 */}
      <div className='u-title u-title-1'>
        <div className='title-left'>
          <h3><span className="f-ff2">歌曲列表</span></h3>
          <span className="sub s-fc3"><span>{detail?.playlist?.trackCount}</span>首歌</span>
        </div>
        <div className="more s-fc3">播放：<strong className="s-fc6" id="play-count">{detail?.playlist?.playCount}</strong>次</div>
      </div>
      {/* 歌曲列表 */}
      <div className='song-list'>
        <table className='m-table m-table-rank'>
          <thead>
            <tr>
              <th className="first w1"></th>
              <th><div className="wp">标题</div></th>
              <th className="w2-1"><div className="wp">时长</div></th>
              <th className="w3-1"><div className="wp">歌手</div></th>
            </tr>
          </thead>
          <tbody>
            {
              detail.playlist ? detail.playlist.tracks.map((item: any, index: number) => {
                const { id, al, name, ar, dt, mv, alia } = item
                const { picUrl } = al
                const unm: string[] = ar.map((item: any) => item.name)

                return (
                  <tr key={id} className={`${index % 2 === 0 ? 'even' : ''}`}>
                    <td>
                      <div className='hd'>
                        <span className='num'>{index + 1}</span>
                        <div className="rk">
                          <span className="icon1 u-icn75"></span>
                        </div>
                      </div>
                    </td>
                    {
                      index < 3 ? (
                        <td className='rank'>
                          <div className='tt clearfix'>
                            <Link to={`${SONG}?id=${id}`}>
                              <img className='rpic' data-src={`${picUrl}?param=50y50`} alt={name} width={50} height={50} />
                            </Link>
                            <span className='ply' onClick={() => playSongClick(item.id)}></span>
                            <div className='ttc'>
                              <span className='txt'>
                                <Link title={name} className='hover' to={`${SONG}?id=${id}`}>{name}</Link>
                                {alia?.[0] ? <span className='s-fc8' title={alia?.[0]}>{` - (${alia?.[0]})`}</span> : <></>}
                                {mv ? <Link to={MV + `?id=${mv}`} title="播放mv" className="mv">MV</Link> : ''}
                              </span>
                            </div>
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className='tt clearfix'>
                            <span className='ply' onClick={() => playSongClick(item.id)}></span>
                            <div className='ttc'>
                              <span className='txt'>
                                <Link title={name} className='hover' to={`${SONG}?id=${id}`}>{name}</Link>
                                {alia?.[0] ? <span className='s-fc8' title={alia?.[0]}>{` - (${alia?.[0]})`}</span> : <></>}
                                {mv ? <Link to={MV + `?id=${mv}`} title="播放mv" className="mv">MV</Link> : ''}
                              </span>
                            </div>
                          </div>
                        </td>
                      )
                    }
                    <td className='s-fc3'>
                      <span className='u-dur'>{formatDate(new Date(dt), 'mm:ss')}</span>
                      <div className='hshow'>
                        <span className='pointer icon1 u-btn u-icn81' title="添加到播放列表" onClick={() => addSongClick(id)}></span>
                        <span className='pointer icon1 u-btn icn icn-fav' title="收藏"></span>
                        <span className='pointer icon1 u-btn icn icn-share' title="分享"></span>
                        <span className='pointer table-img u-btn icn icn-dl' title="下载"></span>
                      </div>
                    </td>
                    <td>
                      <div className='text' title={unm.join('/')}>
                        <span title={unm.join('/')}>
                          {
                            ar.map((item: any, index: number) => {
                              const { id, name } = item

                              return index !== (ar.length - 1) ? (
                                <Fragment key={id + name}>
                                  <Link className='hover' to={`${ARTIST}?id=${id}`}>{name}</Link>
                                  /
                                </Fragment>
                              ) : <Link className='hover' key={id + name} to={`${ARTIST}?id=${id}`}>{name}</Link>
                            })
                          }
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              }) : <></>
            }
          </tbody>
        </table>
      </div>
      {/* 评论 */}
      <Comment commentHot={commentHot} comment={comment} callback={getComment} />
    </div>
  )
}

export default memo(withRouter(Sing))
