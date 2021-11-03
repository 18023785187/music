/**
 * 内容展示区
 */
import React, { useState, useEffect } from 'react'
import { getSongDetail, cancelGetSong } from 'network/song'
import wLocalStorage, { PLAY_LIST } from 'utils/localStorage'

interface IProps {
    id: string
}

function Content(props: IProps) {
    const { id } = props
    // 歌曲详情
    const [songDetail, setSongDetail] = useState<{ [propNme: string]: any }>({})

    const { al } = songDetail
    const { picUrl } = al ?? {}

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
            {/* 左 */}
            <div className='cvrwrap'>
                <div className='u-cover-6'>
                    <img src={picUrl + '?param=130y130'} alt="" />
                    <span className='msk coverall'></span>
                </div>
                <div className='out s-fc3'>
                    <i className='icon1 u-icn-95'></i>
                    <a className="des s-fc7" href={`https://music.163.com/outchain/2/${id}/`} target='_blank' rel="noreferrer">生成外链播放器</a>
                </div>
            </div>
            {/* 右 */}
            <div className='cnt'></div>
        </div>
    )
}

export default Content
