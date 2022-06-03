/**
 * 播放、添加到播放列表、添加收藏、分享、下载、评论按钮
 */
import React from 'react'
import styles from './styles/index.module.less'

interface IProps {
  dynamic: { [propName: string]: any },
  playFunc: () => void,
  addFunc: () => void
}

function Buttons(props: IProps) {
  const { dynamic, playFunc, addFunc } = props

  return (
    <div className={styles['btns']}>
      <i className='u-btn2 btn-img u-btn2-2 play' title="播放" onClick={playFunc}>
        <i className='btn-img u-btn2'>
          <em className="ply btn-img"></em>
          播放
        </i>
      </i>
      <i className='btn-img u-btni btn-add' title="添加到播放列表" onClick={addFunc}></i>
      <i className='btn-img u-btni btni u-btn-3'>
        <i className='btn-fav btn-img'>{dynamic.bookedCount ? `(${dynamic.bookedCount})` : '收藏'}</i>
      </i>
      <i className='btn-img u-btni btni u-btn-3'>
        <i className='btn-share btn-img'>{dynamic.shareCount ? `(${dynamic.shareCount})` : '分享'}</i>
      </i>
      <i className='btn-img u-btni btni u-btn-3'>
        <i className='btn-download btn-img'>下载</i>
      </i>
      <i className='btn-img u-btni btni u-btn-3'>
        <i className='btn-cmmt btn-img'>{dynamic.commentCount ? `(${dynamic.commentCount})` : '评论'}</i>
      </i>
    </div>
  )
}

export default Buttons
