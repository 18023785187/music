/**
 * 歌曲列表
 */
import React, { memo, useMemo, useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SONG, MV, ARTIST } from 'pages/path'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import { formatDate, songFilter } from 'utils'

interface IProps {
    id: string,
    songs: { [propName: string]: any }[]
}

function Songs(props: IProps) {
    const { id, songs } = props

    const addSong = useAddSong()
    const playSong = usePlaySong()

    const addSongClick = useCallback((id: number | string) => {

        songFilter(id, addSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
    }, [addSong])

    const playSongClick = useCallback((id: number | string) => {

        songFilter(id, playSong, '😢操作失败，该音乐不可用（可能需要登录或vip才能进行操作）')
    }, [playSong])

    // 歌曲列表
    const SongList = useMemo(() => {
        return songs.map((song: any, index: number) => {
            const { id, name, dt, fee, mv, ar } = song

            return <tr className={index % 2 === 0 ? 'even ' : ''} key={id}>
                {/** */}
                <td className='left'>
                    <div className='hd'>
                        <span className='num'>{index + 1}</span>
                        <span className='ply' onClick={() => playSongClick(id)}></span>
                    </div>
                </td>
                {/** */}
                <td>
                    <div>
                        <div className='tt'>
                            <div className='ttc'>
                                <span className='txt'>
                                    {fee === 1 ? <i className='u-vip-icn'></i> : <></>}
                                    <Link className='hover' to={SONG + `?id=${id}`}>{name}</Link>
                                    {mv ? <Link to={MV + `?id=${mv}`} title="播放mv" className="mv">MV</Link> : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
                {/** */}
                <td className='s-fc3'>
                    <span className='u-dur'>{formatDate(new Date(dt), 'mm:ss')}</span>
                    <div className='hshow'>
                        <span className='pointer icon1 u-btn u-icn81' title="添加到播放列表" onClick={() => addSongClick(id)}></span>
                        <span className='pointer icon1 u-btn icn icn-fav' title="收藏"></span>
                        <span className='pointer icon1 u-btn icn icn-share' title="分享"></span>
                        <span className='pointer table-img u-btn icn icn-dl' title="下载"></span>
                    </div>
                </td>
                {/** */}
                <td>
                    <div className='text' title={ar && ar.map((a: any) => ar.name).join('/')}>
                        {
                            ar.map((item: any, index: number) => {
                                const { id, name } = item

                                return index !== (ar.length - 1) ? (
                                    <Fragment key={id + name}>
                                        <Link className='hover' to={`${ARTIST}?id=${id}`}>{name}</Link>
                                        /
                                    </Fragment>
                                ) : <Link className='hover' key={id + name} to={`${ARTIST}?id=${id}`}>{name}</Link>
                            })
                        }
                    </div>
                </td>
            </tr>
        })
    }, [songs, addSongClick, playSongClick])

    return (
        <div className='n-songtb'>
            {/* nav */}
            <div className='u-title u-title-1'>
                <div className='title-left'>
                    <h3>
                        <span className='f-ff2'>包含歌曲列表</span>
                    </h3>
                    <span className='sub s-fc3'>{songs.length}首歌</span>
                </div>
                <div className='out s-fc3'>
                    <i className='icon1 u-icn-95'></i>
                    <a className="des s-fc7" href={`https://music.163.com/outchain/1/${id}/`} target='_blank' rel="noreferrer">生成外链播放器</a>
                </div>
            </div>
            {/* 列表 */}
            <div>
                <table className='m-table'>
                    {/* 头 */}
                    <thead>
                        <tr>
                            <th className='first w1'>
                                <div className="wp">&nbsp;</div>
                            </th>
                            <th>
                                <div className="wp">歌曲标题</div>
                            </th>
                            <th className="w2-1">
                                <div className="wp">时长</div>
                            </th>
                            <th className="w4">
                                <div className="wp">歌手</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {SongList}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default memo(Songs)
