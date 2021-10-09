/**
 * 歌曲页
 */
import React, { useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SONG, MV, ARTIST, ALBUM } from 'pages/path'
import { useAddSong, usePlaySong } from 'components/Player/useFunc'
import { getSongDetail } from 'network/song'
import { formatDate } from 'utils'

interface IProps {
    data: { [propsName: string]: any }
}

function Songs(props: IProps) {
    const { data: songs } = props
    const addSong = useAddSong()
    const playSong = usePlaySong()

    const addSongClick = useCallback((id: number | string) => {
        getSongDetail(id).then((res: any) => {
            try {
                addSong(res.songs[0])
            } catch (e) {

            }
        })
    }, [addSong])

    const playSongClick = useCallback((id: number | string) => {
        getSongDetail(id).then((res: any) => {
            try {
                playSong(res.songs[0])
            } catch (e) {

            }
        })
    }, [playSong])

    return (
        <div className='songs'>
            {
                songs.songs && songs.songs.map((item: any, index: number) => {
                    const { id, name, mvid, artists, duration, album } = item
                    const { name: albumName, id: albumId } = album

                    return (
                        <div key={id} className={`item h-flag ${index % 2 === 1 ? 'even' : ''}`}>
                            <div className='td'>
                                <div className='hd'>
                                    <i className='ply table-img' title='播放' onClick={() => playSongClick(item.id)}></i>
                                </div>
                            </div>
                            <div className='td w0'>
                                <div className='sn'>
                                    <div className='text'>
                                        <Link className='hover' to={SONG + `?id=${id}`} title={name}>{name}</Link>
                                        {
                                            mvid !== 0 ? <Link className='mv table-img' title='MV' to={MV + `?id=${mvid}`}></Link> : ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='td'>
                                <div className='hshow'>
                                    <span onClick={() => { addSongClick(item.id) }} className='pointer icon1 u-btn u-icn81' title="添加到播放列表"></span>
                                    <span className='pointer icon1 u-btn icn icn-fav' title="收藏"></span>
                                    <span className='pointer icon1 u-btn icn icn-share' title="分享"></span>
                                    <span className='pointer table-img u-btn icn icn-dl' title="下载"></span>
                                </div>
                            </div>
                            <div className='td w1'>
                                <div className='text'>
                                    {
                                        artists.map((artist: any, index: number) => {
                                            const { name, id } = artist

                                            if (index !== artists.length - 1) {
                                                return (<Fragment key={id}>
                                                    <Link className='hover' to={ARTIST + `?id=${id}`}>{name}</Link>/
                                                </Fragment>)
                                            } else {
                                                return <Link key={id} className='hover' to={ARTIST + `?id=${id}`}>{name}</Link>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className='td w2'>
                                <div className='text'>
                                    <Link className='hover s-fc3' to={ALBUM + `?id=${albumId}`} title={albumName}>《{albumName}》</Link>
                                </div>
                            </div>
                            <div className='td'>{formatDate(new Date(duration), 'mm:ss')}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Songs
