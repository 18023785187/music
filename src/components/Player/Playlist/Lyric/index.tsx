/**
 * 歌词页
 */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import Scroll from '../Scroll'
import wLocalStorage, { PLAY_LYRIC } from '@/localStorage'
import setState from '../../setState'

interface IProps {
    id: number | string
}

function Lyric(props: IProps) {
    const { id } = props
    const [lyricMap, setLyricMap] = useState<{ [propName: string]: any }>(JSON.parse(wLocalStorage.getItem(PLAY_LYRIC) as string))
    const { tlyric, lrc } = lyricMap[id] ?? ({ tlyric: { lyric: '' }, lrc: { lyric: '' } })
    // 外语版的翻译，如果是国语则为空
    const { lyric: b } = tlyric
    // 歌词
    const { lyric: t } = lrc

    setState.setLyricMap = setLyricMap

    const [height, setHeight] = useState<number>(0)
    const [pos, setPos] = useState<number>(0)
    const lyricElRef = useRef<HTMLDivElement>(null)

    // console.log(b, t, lyricMap[id])

    // eslint-disable-next-line
    useEffect(() => {

        setHeight(lyricElRef.current?.offsetHeight ?? 0)
    })

    const changePos = useCallback((pos: number) => {
        setPos(pos * 100)
    }, [])

    return (
        <>
            <div className='listlyric'>
                <div ref={lyricElRef} style={{ transform: `translate3d(0,${-pos + '%'},0)` }}>
                    <p>
                        {t}
                    </p>
                    <p>
                        {b}
                    </p>
                </div>
            </div>
            <div className='bline bline-1'>
                <Scroll contentHeight={height} changePos={changePos} />
            </div>
        </>
    )
}

export default Lyric
