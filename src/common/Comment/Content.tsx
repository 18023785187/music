/**
 * 评论内容区
 */
import React, { memo } from 'react'
import ContentItem from './ContentItem'

interface IProps {
  title: string,
  comments: []
}

function Content(props: IProps) {
  const { title, comments } = props

  return (
    <div>
      <h3 className='u-hd4'>{title}</h3>
      {
        comments && comments.map((comment: any) => <ContentItem key={comment.commentId} comment={comment} />)
      }
    </div>
  )
}

export default memo(Content)
