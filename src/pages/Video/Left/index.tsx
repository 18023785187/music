/**
 * 视频左边
 */
import React, { useState, useEffect, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { USER } from 'pages/path'
import VideoPlayer from 'common/VideoPlayer'
import { IVideoPlayerProps } from 'common/VideoPlayer/typing'
import Comment from 'common/Comment'
import _getComment, { cancelGetComment } from 'network/comment'
import { checkNum } from 'utils'

interface IProps {
  data: { [propName: string]: any }
}

function Left(props: IProps) {
  const { data } = props
  const { title, vid, subscribeCount, shareCount, creator } = data
  const { nickname, userId } = creator ?? {}

  const [playerData, setPlayerData] = useState<IVideoPlayerProps>()

  const [commentHot, setCommentHot] = useState<{ [propName: string]: any } | null>(null)
  const [comment, setComment] = useState<{ [propName: string]: any }>({})

  useEffect(() => {

    if (vid) {
      getCommentHot()
    }

    async function getCommentHot() {
      const res: any = await _getComment(vid, 5)

      try {
        setCommentHot(res.data)
        getComment()
      } catch (e) {

      }
    }

    async function getComment() {

      const res: any = await _getComment(vid, 5, 3, 1, 20)

      try {
        setComment(res.data)
      } catch (e) {

      }
    }

    return () => {
      cancelGetComment.cancelGetComment && cancelGetComment.cancelGetComment()
    }
  }, [vid])

  useEffect(() => {
    const { vid, coverUrl, durationms, title, resolutions } = data
    const brs = resolutions ? resolutions.map((item: any) => ({
      size: item.size,
      br: item.resolution
    })) : []

    const playerData: IVideoPlayerProps = {
      isMv: checkNum(vid),
      id: vid,
      cover: coverUrl,
      duration: durationms,
      name: title,
      artistName: nickname,
      brs
    }
    setPlayerData(playerData)
  }, [data, nickname])

  // 发最新评论请求的方法，需要传给Comment组件
  const getComment = useCallback((page: string | number = 0) => {
    const { cursor } = comment ?? {}

    cancelGetComment.cancelGetComment && cancelGetComment.cancelGetComment()

    _getComment(vid, 5, 3, Number(page) + 1, 20, cursor).then(res => {
      try {
        setComment(res.data)
      } catch (e) {

      }
    })

  }, [vid, comment])

  return (
    <div className='mv-left'>
      <div className='g-wrap6'>
        {/* 视频区 */}
        <div className='n-mv'>
          <div className='title'>
            <h2 className='f-ff2 f-thide' title={title}>
              {title}
            </h2>
            <span className='name'>
              &nbsp;by&nbsp;
              <Link className='s-fc7 hover' to={USER.HOME + `?id=${userId}`} title={nickname}>{nickname}</Link>
            </span>
          </div>
          {/* 视频组件 */}
          <div className='mv'>
            <VideoPlayer {...playerData} />
          </div>
        </div>
        {/* 数量区 */}
        <div className='btns'>
          <i className='btn u-btni u-btni-fav u-btn-3 btn-img'>
            <i className='btn-img'>{subscribeCount ? `(${(subscribeCount > 100000 ? (subscribeCount / 10000).toFixed(1) + '万' : subscribeCount)})` : '分享'}</i>
          </i>
          <i className='u-btni btn u-btni-share btn-img u-btn-3'>
            <i className='btn-img'>{shareCount ? `(${(shareCount > 100000 ? (shareCount / 10000).toFixed(1) + '万' : shareCount)})` : '分享'}</i>
          </i>
        </div>
        {/* 评论 */}
        <Comment commentHot={commentHot} comment={comment} callback={getComment} />
      </div>
    </div>
  )
}

export default memo(Left)
