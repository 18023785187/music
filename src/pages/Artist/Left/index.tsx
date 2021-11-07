/**
 * 左边
 */
import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { USER } from 'pages/path'
import { getArtistDetail, cancelArtist } from 'network/artist'
import LazyLoad from 'utils/LazyLoad'

interface IProps {
    id: string
}

function Left(props: IProps) {
    const { id } = props

    // 歌手详请集合
    const [artistDetail, setArtistDetail] = useState<{ [propName: string]: any }>({})
    // 歌手详情
    const { artist, user } = artistDetail
    const { name, cover } = artist ?? {}

    useEffect(() => {
        getArtistDetail(id).then(res => {
            if (res.data) {
                setArtistDetail(res.data)

                LazyLoad.update()
            }
        }).catch(rej => { })

        return () => {
            cancelArtist.cancelGetArtistDetail && cancelArtist.cancelGetArtistDetail()
        }
    }, [id])

    return (
        <div className='artist-left'>
            <div className='g-wrap6'>
                {/* 头像 */}
                <div className='n-artist'>
                    <h2 className='sname f-thide sname-max' title={name}>{name}</h2>
                    <img data-src={cover + '?param=640y300'} alt={name} width={640} height={300} />
                    <div className='mask'></div>
                    {user ? <Link className='btn-rz f-tid iconall pointer' to={USER.HOME + `?id=${user.userId}`}>Ta的个人主页</Link> : <></>}
                    <i className='btnfav f-tid iconall pointer'></i>
                </div>
            </div>
        </div>
    )
}

export default memo(Left)
