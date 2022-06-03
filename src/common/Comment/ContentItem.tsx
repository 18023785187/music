/**
 * 评论子内容
 */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { USER } from 'pages/path'
import LazyLoad from '@/utils/LazyLoad'
import { formatDate } from 'utils'

interface IProps {
  comment: { [propsName: string]: any }
}

function ContentItem(props: IProps) {
  const { comment } = props
  const { user, content, time, likedCount } = comment
  const { userId, avatarUrl, nickname } = user
  // console.log(comment)

  useEffect(() => {
    LazyLoad.update()
  }, [])

  return (
    <div className='comment-item'>
      <div className='head'>
        <Link to={`${USER.HOME}?id=${userId}`}>
          <img data-src={avatarUrl + '?param=50y50'} alt="nickname" width={50} height={50} />
        </Link>
      </div>
      <div className='cntwrap'>
        <div className='cnt f-brk'>
          <Link className='s-fc7 hover' to={`${USER.HOME}?id=${userId}`}>{nickname}</Link>
          <span dangerouslySetInnerHTML={{ __html: `：${content}` }}></span>
        </div>
        <div className='rp'>
          <div className='s-fc4'>{formatDate(new Date(time), "yyyy年MM月dd日 hh:mm:ss")}</div>
          <div className='interact'>
            <span className='pointer hover'>
              <i className='icon2 u-icn2 u-icn2-12'></i>
              {likedCount ? ` (${likedCount})` : ''}
            </span>
            <span className='sep'>|</span>
            <span className='pointer hover'>回复</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentItem
