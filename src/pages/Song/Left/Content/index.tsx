/**
 * 内容展示区
 */
import React, { useState, useEffect, useCallback, Fragment, memo } from 'react'
import { Link } from 'react-router-dom'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import { ALBUM, ARTIST, MV } from 'pages/path'
import { songFilter } from 'utils'
import { getSongDetail, cancelGetSong } from 'network/song'
import wLocalStorage, { PLAY_LIST } from 'utils/localStorage'
import Buttons from 'common/Buttons'
import Lyric from './Lyric'

interface IProps {
    id: string
}

function Content(props: IProps) {
    const { id } = props
    // 歌曲详情
    const [songDetail, setSongDetail] = useState<{ [propNme: string]: any }>({})

    const { al, ar, mv, name, fee } = songDetail
    const { picUrl, name: aname, id: aid } = al ?? {}

    const addSong = useAddSong()
    const playSong = usePlaySong()

    const addSongClick = useCallback((id: number | string) => {

        songFilter(id, addSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
    }, [addSong])

    const playSongClick = useCallback((id: number | string) => {

        songFilter(id, playSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
    }, [playSong])

    // 获取歌曲详情
    useEffect(() => {
        // 获取本地缓存中的歌曲列表，避免发送http请求
        const playlist = JSON.parse(wLocalStorage.getItem(PLAY_LIST) ?? '[]')
        const tarSongDetail = playlist.find((song: any) => song.id === parseInt(id))

        if (tarSongDetail) {
            setSongDetail(tarSongDetail)
        } else {
            getSongDetail(id).then((res: any) => {
                setSongDetail(res.songs[0])
            }).catch(rej => {

            })
        }

        return () => {
            cancelGetSong.cancelGetSongDetail && cancelGetSong.cancelGetSongDetail()
        }
    }, [id])

    return (
        <div className='m-lycifo'>
            <div className='content'>
                {/* 左 */}
                <div className='cvrwrap'>
                    <div className='u-cover-6'>
                        <img src={picUrl + '?param=130y130'} alt={name} />
                        <span className='msk coverall'></span>
                    </div>
                    <div className='out s-fc3'>
                        <i className='icon1 u-icn-95'></i>
                        <a className="des s-fc7" href={`https://music.163.com/outchain/2/${id}/`} target='_blank' rel="noreferrer">生成外链播放器</a>
                    </div>
                </div>
                {/* 右 */}
                <div className='cnt'>
                    <div className='hd'>
                        {
                            fee === 1 ? <i className='lab icon1 u-icn-98'>VIP单曲</i> : <i className='lab icon1 u-icn-37'></i>
                        }
                        <div className='tit'>
                            <em className="f-ff2">{name}</em>
                            {mv ? <Link to={MV + `?id=${mv}`} title='播放mv'>
                                <i className='icon1 u-icn-2'></i>
                            </Link> : ''}
                        </div>
                    </div>
                    <p className='des s-fc4'>
                        歌手：<span title={ar ? ar.map((a: any) => a.name).join('/') : ''}>
                            {
                                ar && ar.map((a: any, i: number) => {
                                    const { id, name } = a

                                    return i !== ar.length - 1 ? (
                                        <Fragment key={id}>
                                            <Link className='hover s-fc7' to={ARTIST + `?id=${id}`}>{name}</Link>
                                            /
                                        </Fragment>
                                    ) : (
                                        <Link key={id} className='hover s-fc7' to={ARTIST + `?id=${id}`}>{name}</Link>
                                    )
                                })
                            }
                        </span>
                    </p>
                    <p className='des s-fc4'>所属专辑：<Link className='s-fc7 hover' to={ALBUM + `?id=${aid}`}>{aname}</Link></p>
                    <Buttons dynamic={{}} playFunc={() => { playSongClick(id) }} addFunc={() => { addSongClick(id) }} />
                    <Lyric id={id} />
                </div>
            </div>
            {/* 底部 */}
            <div className='lrc-user'>
                <p>
                    <a className='f-tdu s-fc4' href={`https://music.163.com/lyric/report?id=${id}`} target='_blank' rel='noreferrer'>报错</a>
                </p>
            </div>
        </div>
    )
}

export default memo(Content)
