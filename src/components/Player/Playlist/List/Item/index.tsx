/**
 * 每项歌曲
 */
import React, { useCallback, Fragment, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { usePlaySong, useDeteleSong } from '../../../useFunc'
import { ARTIST } from 'pages/path'
import { formatDate } from 'utils'

interface IProps {
  item: { [propName: string]: any },
  curPlay: boolean
}

function Item(props: IProps) {
  const { item, curPlay } = props
  const { id, name, ar, dt } = item

  const playSong = usePlaySong()
  const deteleSong = useDeteleSong()

  const deleteClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()

    deteleSong(id)
  }, [deteleSong, id])

  return (
    <li className={curPlay ? 'z-sel' : ''} onClick={() => playSong(item)}>
      {/* 播放按钮 */}
      <div className='col col-1'>
        {curPlay ? <div className='playicn playlist_img'></div> : ''}
      </div>
      <div className='col col-2'>{name}</div>
      {/* 收藏等 */}
      <div className='col col-3'>
        <div className='icns'>
          <i className="ico icn-del playlist_img pointer" title="删除" onClick={deleteClick}>删除</i>
          <i className="ico ico-dl playlist_img pointer" title="下载">下载</i>
          <i className="ico ico-share playlist_img pointer" title="分享">分享</i>
          <i className="j-t ico ico-add playlist_img pointer" title="收藏">收藏</i>
        </div>
      </div>
      <div className='col col-4'>
        {ar ? (
          <span title={ar.map((item: any) => item.name).join('/')}>
            {
              ar.map((item: any, index: number) => <Fragment key={item.id + id}>
                <Link className='hover' to={ARTIST + `?id=${item.id}`}>{item.name}</Link>{ar.length - 1 !== index ? '/' : ''}
              </Fragment>)
            }
          </span>
        ) : ''}
      </div>
      <div className='col col-5'>{formatDate(new Date(dt), 'mm:ss')}</div>
      <div className='col col-6'>
        <i className='ico-src playlist_img'></i>
      </div>
    </li>
  )
}

export default Item
