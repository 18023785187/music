/**
 * 歌词页
 */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Scroll from '../Scroll'
import wLocalStorage, { PLAY_LYRIC } from '@/localStorage'
import setState from '../../setState'
import audio from '../../audio'
import dateFormTime from './dateFormTime'

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

    const [curIdx, setCurIdx] = useState<number>(0)

    const lyricElRef = useRef<HTMLDivElement>(null)
    const lyricRef = useRef<number[]>([])

    // console.log(b.split('\n'), t.split('\n'))

    // eslint-disable-next-line
    useEffect(() => {

        setHeight(lyricElRef.current?.offsetHeight ?? 0)
    })

    useEffect(() => {
        setCurIdx(0)
    }, [id])

    useEffect(() => {
        let flag: boolean = true

        audio.addEventListener('timeupdate', timeupdate)

        function timeupdate() {
            if (flag) {
                flag = false

                const curTime: number = Math.round(audio.currentTime)
                const curPos: number = binSearch(lyricRef.current, curTime)

                if (curPos === 0) {
                    console.log(lyricRef.current[curIdx])
                } else {
                    console.log(lyricRef.current[curPos])
                    setCurIdx(curPos)
                }

                window.setTimeout(() => {
                    flag = true
                }, 500)
            }

            function binSearch(list: number[], target: number): number {
                let l: number = 0
                let r: number = list.length - 1

                while (l <= r) {
                    let m: number = Math.floor((l + r) / 2)
                    if (list[m] > target) r = m - 1
                    else if (list[m] < target) l = m + 1
                    else if (list[m] === target) return m
                }

                return 0
            }
        }

        return () => {
            audio.removeEventListener('timeupdate', timeupdate)
        }
    }, [curIdx])

    const changePos = useCallback((pos: number) => {
        setPos(pos * 100)
    }, [])

    const lyricEl = useMemo(() => {
        lyricRef.current = []

        return (t as string).split('\n').map((str, index) => {
            let time: number = -1

            str = str.replace(/\[[0-9](.*)?[0-9]\]/, (word: string, exp: string) => {

                time = dateFormTime(exp)

                return ''
            })

            time !== -1 && lyricRef.current.push(time)

            return time !== -1 ? (
                <p key={time + str} className={curIdx === index ? 'z-sel' : ''}>{str}</p>
            ) : ''
        })
    }, [t, curIdx])

    console.log(b)

    return (
        <>
            <div className='listlyric'>
                <div ref={lyricElRef} style={{ transform: `translate3d(0,${-pos + '%'},0)` }}>
                    {lyricEl}
                </div>
            </div>
            <div className='bline bline-1'>
                <Scroll contentHeight={height} changePos={changePos} />
            </div>
        </>
    )
}

export default Lyric
