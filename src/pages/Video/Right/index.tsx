/**
 * 视频右边
 */
import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import About from 'common/About'
import { related, cancelMv } from 'network/video'
import { MV, VIDEO, ARTIST, USER } from 'pages/path'
import LazyLoad from 'utils/LazyLoad'
import { formatDate, checkNum } from 'utils'

interface IProps {
  data: { [propName: string]: any }
}

function Right(props: IProps) {
  const { data } = props
  const { publishTime, playTime, briefDesc, description, vid } = data

  const [mvs, setMvs] = useState<{ [propName: string]: any }[]>([])

  useEffect(() => {
    vid && related(vid).then((res: any) => {
      try {
        setMvs(res.data)

        LazyLoad.update()
      } catch (e) {

      }
    })

    return () => {
      cancelMv.cancelRelated && cancelMv.cancelRelated()
    }
  }, [data, vid])

  return (
    <div className='g-sd4'>
      <div className='g-wrap7'>
        {/* 简介 */}
        <h3 className="u-hd3">
          <span>视频简介</span>
        </h3>
        <div className='m-mvintr'>
          <p className="s-fc4">发布时间：{formatDate(new Date(publishTime || 0), 'yyyy-MM-dd')}</p>
          <p className="s-fc4">播放次数：{playTime > 10000 ? Math.floor((playTime / 10000)) + '万' : playTime}次</p>
          <p className='intr'>
            {briefDesc ? <>{briefDesc}<br /></> : ''}{description}
          </p>
        </div>
        {/* 推荐 */}
        <h3 className="u-hd3">
          <span>相关推荐</span>
        </h3>
        <ul className='n-mvlist'>
          {
            mvs.map(mv => {
              const { title, coverUrl, durationms, vid, creator, playTime } = mv
              const { userId, userName } = creator[0]

              return (
                <li key={vid}>
                  {/* 图片 */}
                  <div className='u-cover u-cover-8'>
                    <img data-src={coverUrl + '?param=96y54'} alt={title} />
                    <p className='ci u-msk u-msk-1'>
                      <span className='icon2 u-icn2-mv'></span>
                      {playTime > 100000 ? Math.floor(playTime / 10000) + '万' : playTime}
                    </p>
                    <Link className='f-link' to={(checkNum(vid) ? MV : VIDEO) + `?id=${vid}`} title={title}></Link>
                  </div>
                  {/* 描述 */}
                  <div className='cnt'>
                    <p className='tit f-thide'>
                      {!checkNum(vid) ? '' : <i className='tag icon2 u-icn2-smvtag'></i>}
                      <Link className='hover' to={(checkNum(vid) ? MV : VIDEO) + `?id=${vid}`} title={title}>{title}</Link>
                    </p>
                    <p className='s-fc4'>{formatDate(new Date(durationms), 'mm:ss')}</p>
                    <p className='s-fc4 f-thide'>
                      <span>
                        {checkNum(vid) ? '' : 'by '}
                        <Link className='s-fc4 hover' to={(checkNum(vid) ? ARTIST : USER.HOME) + `?id=${userId}`}>{userName}</Link>
                      </span>
                    </p>
                  </div>
                </li>
              )
            })
          }
        </ul>
        {/* 关于 */}
        <About />
      </div>
    </div>
  )
}

export default memo(Right)
