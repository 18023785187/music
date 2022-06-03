/**
 * 歌曲列表
 */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Item from './Item'
import Scroll from '../Scroll'

interface IProps {
  playlist: { [propName: string]: any }[],
  curPos: number
}

function List(props: IProps) {
  const { playlist, curPos } = props

  const [height, setHeight] = useState<number>(0)
  const [pos, setPos] = useState<number>(0)
  const listRef = useRef<HTMLUListElement>(null)

  // eslint-disable-next-line
  useEffect(() => {

    setHeight(listRef.current?.offsetHeight ?? 0)
  })

  const changePos = useCallback((pos: number) => {
    setPos(pos * 100)
  }, [])

  return (
    <>
      <div className='listbdc'>
        {/* 判断歌曲列表是否有内容分别展示不同页面 */}
        {
          playlist.length ? (
            <ul ref={listRef} style={{ transform: `translate3d(0,${-pos + '%'},0)` }}>
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
      {/* 滚动条 */}
      <div className='bline'>
        <Scroll contentHeight={height} changePos={changePos} />
      </div>
    </>
  )
}

export default List
