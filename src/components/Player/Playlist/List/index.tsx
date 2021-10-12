/**
 * 歌曲列表
 */
import React from 'react'
import Item from './Item'

interface IProps {
    playlist: { [propName: string]: any }[],
    curPos: number
}

function List(props: IProps) {
    const { playlist, curPos } = props

    return (
        <div className='listbdc'>
            {/* 判断歌曲列表是否有内容分别展示不同页面 */}
            {
                playlist.length ? (
                    <ul>
                        {
                            playlist.map((item, index) => {
                                const { id } = item

                                return <Item key={id} item={item} curPlay={curPos === index} />
                            })
                        }
                    </ul>
                ) : (
                    <div>

                    </div>
                )
            }
        </div>
    )
}

export default List
