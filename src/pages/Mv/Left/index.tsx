/**
 * 左边
 */
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ARTIST } from 'pages/path'
import VideoPlayer from 'common/VideoPlayer'
import { IVideoPlayerProps } from 'common/VideoPlayer/typing'
import Comment from 'common/Comment'
import _getComment, { cancelGetComment } from 'network/comment'

interface IProps {
    data: { [propName: string]: any }
}

function Left(props: IProps) {
    const { data } = props
    const { name, artistName, artistId, id, subCount, shareCount } = data

    const [playerData, setPlayerData] = useState<IVideoPlayerProps>()

    const [commentHot, setCommentHot] = useState<{ [propName: string]: any } | null>(null)
    const [comment, setComment] = useState<{ [propName: string]: any }>({})

    useEffect(() => {

        if (id) {
            getCommentHot()
            getComment()
        }

        async function getCommentHot() {
            const res: any = await _getComment(id, 1)

            try {
                setCommentHot(res.data)
            } catch (e) {

            }
        }

        async function getComment() {
            const res: any = await _getComment(id, 1, 3, 1, 20)

            try {
                setComment(res.data)
            } catch (e) {

            }
        }

        return () => {
            cancelGetComment.cancelGetComment && cancelGetComment.cancelGetComment()
        }
    }, [id])

    useEffect(() => {
        const { nType, id, duration, name, artistName, brs } = data

        const playerData: IVideoPlayerProps = {
            isMv: !nType,
            id,
            duration,
            name,
            artistName,
            brs
        }
        setPlayerData(playerData)
    }, [data])

    // 发最新评论请求的方法，需要传给Comment组件
    const getComment = useCallback((page: string | number = 0) => {
        cancelGetComment.cancelGetComment && cancelGetComment.cancelGetComment()
        const { cursor } = comment

        _getComment(id, 1, 3, Number(page) + 1, 20, cursor).then(res => {
            try {
                setComment(res.data)
            } catch (e) {

            }
        })

    }, [comment, id])

    return (
        <div className='mv-left'>
            <div className='g-wrap6'>
                {/* 视频区 */}
                <div className='n-mv'>
                    <div className='title'>
                        <h2 className='f-ff2 f-thide'>
                            <i className='tag icon2 u-icn2-mvtag'></i>
                            {name}
                        </h2>
                        <span className='name'>
                            <Link className='s-fc7 hover' to={ARTIST + `?id=${artistId}`}>{artistName}</Link>
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
                        <i className='btn-img'>({subCount > 100000 ? (subCount / 10000).toFixed(1) + '万' : subCount})</i>
                    </i>
                    <i className='u-btni btn u-btni-share btn-img u-btn-3'>
                        <i className='btn-img'>({shareCount > 100000 ? (shareCount / 10000).toFixed(1) + '万' : shareCount})</i>
                    </i>
                </div>
                {/* 评论 */}
                <Comment commentHot={commentHot} comment={comment} callback={getComment} />
            </div>
        </div>
    )
}

export default Left
