/**
 * 展示区一组
 */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from '@/utils/LazyLoad'
import { PLAY_LIST } from 'pages/path'

function Item(props: any) {
  const { picUrl, name, playCount, id, coverImgUrl } = props

  useEffect(() => {
    LazyLoad.update()
  }, [])

  return (
    <div className='recommend-item'>
      <div className='cover'>
        <img data-src={coverImgUrl ? coverImgUrl + '?param=140y140' : picUrl + '?param=140y140'} alt={name} width={140} height={140} />
        <Link className='coverall u-cover-1' title={name} to={`${PLAY_LIST}?id=${id}`}></Link>
        <div className='bottom coverall'>
          <span className='icon-play iconall pointer' title='播放'></span>
          <span className='icon-headset iconall'></span>
          <span className='nb'>{playCount > 100000 ? `${(playCount / 10000).toFixed(0)}万` : playCount}</span>
        </div>
      </div>
      <p className='dec'>
        <Link className='hover' title={name} to={`${PLAY_LIST}?id=${id}`}>{name}</Link>
      </p>
    </div>
  )
}

export default Item
