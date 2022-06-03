/**
 * Toplist每列
 */
import React, { memo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ROOT_NAVPATH } from '@/pages/path'
import { useSelector, useDispatch } from 'react-redux'
import { IRootReducer } from 'store'
import { playlistAcion } from 'store/acions'
import _getPlaylistDetail, { cancelGetPlaylistDetail } from 'network/playlist/getPlaylistDetail'
import Item from './Item'
import LazyLoad from '@/utils/LazyLoad'

interface IProps {
  id: number,
  name: string,
  imgUrl: string
}

function List(props: IProps) {
  const { id, name, imgUrl } = props
  const dispatch = useDispatch()
  const playlist = useSelector((state: IRootReducer) => state.toplistReducer.playlistDetail)

  useEffect(() => {
    // 获取排行榜，用于展示
    getPlaylistDetail(id)

    function getPlaylistDetail(id: number) {
      _getPlaylistDetail(id).then((res: any) => {
        try {
          if (res.code === 200) {
            dispatch(playlistAcion({ [id]: res }))
            LazyLoad.update()
          } else {
            getPlaylistDetail(id)
          }
        } catch (e) {
          // console.log(e)
        }
      })
    }

    return () => {
      cancelGetPlaylistDetail.cancelGetPlaylistDetail && cancelGetPlaylistDetail.cancelGetPlaylistDetail()
    }
  }, [id, dispatch])

  // 获取排行榜前10名
  const listItem = useCallback(() => {
    if (playlist[id]) {
      const tracks = playlist[id].playlist.tracks
      const res: any[] = []
      for (let i = 0; i < 10; i++) {
        res.push(tracks[i])
      }
      return res.map((item: any, index) => <Item key={item.id} item={item} index={index + 1} />)
    } else {
      return <></>
    }
  }, [id, playlist])

  return (
    <dl className='blk'>
      <dt className='top'>
        <div className='cover'>
          <img className='j-img' data-src={imgUrl + '?param=100y100'} alt={name} width={100} height={100} />
          <Link className='coverall msk-coverall' to={`${ROOT_NAVPATH.TOPLIST}?id=${id}`} title={name}></Link>
        </div>
        <div className='tit'>
          <Link className='hover' to={`${ROOT_NAVPATH.TOPLIST}?id=${id}`} title={name}>
            <h3>{name}</h3>
          </Link>
          <div className='btn'>
            <i className='v-hd2 pointer s-bg-9' title='播放'>播放</i>
            <i className='v-hd2 pointer s-bg-10' title='收藏'>收藏</i>
          </div>
        </div>
      </dt>
      <dd>
        <ol>
          {listItem()}
        </ol>
        <div className='more'>
          <Link className='hover' to={`${ROOT_NAVPATH.TOPLIST}?id=${id}`}>查看全部&gt;</Link>
        </div>
      </dd>
    </dl>
  )
}

export default memo(List)
