/**
 * 左边
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { ARTIST } from 'pages/path'

interface IProps {
    data: { [propName: string]: any }
}

function Left(props: IProps) {
    const { data } = props
    const { name, artistName, artistId } = data
    console.log(data)

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
                </div>
                {/* 点赞区 */}
                <div className='btns'>
                    
                </div>
            </div>
        </div>
    )
}

export default Left
