/**
 * 视频每项
 */
import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { MV, VIDEO, ARTIST } from 'pages/path'
import LazyLoad from '@/utils/LazyLoad'
import { formatDate } from 'utils'
import styles from './styles/index.module.less'

interface IProps {
  video: { [propsName: string]: any }
}

function Video(props: IProps) {
  const { video } = props
  const { coverUrl, title, playTime, durationms, vid, type, creator } = video

  useEffect(() => {
    LazyLoad.update()
  }, [])

  return (
    <li className={styles.video}>
      {/* 图片 */}
      <div className='cover'>
        <img data-src={coverUrl + '?param=159y90'} alt={title} width={159} height={90} />
        <p className='tr u-msk u-msk-1'>
          <span className='icon2 u-icn2-mv'></span>
          {playTime >= 100000 ? (playTime / 10000).toFixed(1).toString() + '万' : playTime}
        </p>
        <p className='bl u-msk u-msk-2'>{formatDate(new Date(durationms), 'mm:ss')}</p>
        <Link className='link' to={(type ? VIDEO : MV) + `?id=${vid}`}></Link>
      </div>
      {/* 标题 */}
      <h4 className='title f-thide'>
        {type === 0 ? <i className='icon2 tag u-icn2-smvtag'></i> : ''}
        <Link className='hover s-fc0' to={(type ? VIDEO : MV) + `?id=${vid}`} title={title}>{title}</Link>
      </h4>
      {/* 作者 */}
      <h5 className='name f-thide' title={creator.map((item: any) => item.userName).join(' / ')}>
        {type === 0 ? '' : 'by '}
        {
          creator.map((item: any, index: number) => {
            const { userId, userName } = item

            if (index === creator.length - 1) {
              return (
                <Link className='s-fc3 hover' key={userId} to={ARTIST + `?id=${userId}`}>{userName}</Link>
              )
            } else {
              return (
                <Fragment key={userId}><Link className='s-fc3 hover' to={ARTIST + `?id=${userId}`}>{userName}</Link>&nbsp;/&nbsp;</Fragment>
              )
            }
          })
        }
      </h5>
    </li>
  )
}

export default Video
