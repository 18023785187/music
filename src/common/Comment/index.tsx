/**
 * 评论组件
 */
import React, { memo } from 'react'
import UserComment from './UserComment'
import Content from './Content'
import Page from '../Page'
import styles from './styles/index.module.less'

interface IProps {
  commentHot: { [propName: string]: any } | null,
  comment: { [propName: string]: any },
  callback: (page: string | number) => void
}

function Comment(props: IProps) {
  const { commentHot, comment, callback } = props

  return (
    <div className={styles['comment']}>
      {/* 大标题 */}
      <div className='u-title u-title-1'>
        <div className='title-left'>
          <h3>
            <span className="f-ff2">评论</span>
          </h3>
          <span className='sub s-fc3'>共{comment?.totalCount}条评论</span>
        </div>
      </div>
      {/* 发表评论框 */}
      <UserComment />
      {
        comment?.totalCount ? (<>
          {/* 精彩评论 */}
          {commentHot ? <Content title={'精彩评论'} comments={commentHot?.comments} /> : <></>}
          <br />
          <br />
          {/* 最新评论 */}
          <Content title={`最新评论(${comment?.totalCount})`} comments={comment?.comments} />
        </>) : <></>
      }
      {/* 页码 */}
      <Page count={comment?.totalCount} limit={20} initPage={0} callback={callback} />
    </div>
  )
}

export default memo(Comment)
