/**
 * 名次项
 */
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { SONG } from 'pages/path'

interface IProps {
    item: any,
    index: number
}

function Item(props: IProps) {
    const { item, index } = props
    const { id, name } = item

    return (
        <li>
            <span className={`no ${index <= 3 ? 'no-top' : ''}`}>{index}</span>
            <Link className='hover f-thide' to={`${SONG}/${id}`} title={name}>{name}</Link>

            <div className='oper'>
                <i className='v-hd2 pointer s-bg-11' title='播放'></i>
                <i className='icon1 pointer u-icn-81' title='添加到播放列表'></i>
                <i className='v-hd2 pointer s-bg-12' title='收藏'></i>
            </div>
        </li>
    )
}

export default memo(Item)
