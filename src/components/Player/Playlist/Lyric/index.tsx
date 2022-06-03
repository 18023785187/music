/**
 * 歌词页
 */
import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react'
import Scroll from '../Scroll'
import { IScrollRef } from '../typing'
import wLocalStorage, { PLAY_LYRIC } from '@/utils/localStorage'
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
  const { lyric: b } = tlyric ?? { lyric: '' }
  // 歌词
  const { lyric: t } = lrc ?? { lyric: '' }

  setState.setLyricMap = setLyricMap

  const [height, setHeight] = useState<number>(0)
  // 歌词位置
  const [pos, setPos] = useState<number>(0)
  // 当前目标歌词索引
  const [curIdx, setCurIdx] = useState<number>(0)
  // css transition秒
  const [transition, setTransition] = useState<number>(1)
  // 歌词的外壳元素
  const lyricElRef = useRef<HTMLDivElement>(null)
  // 歌词高度数组
  const lyricRef = useRef<number[]>([])
  // 歌词的包裹元素
  const setPRef = useRef<HTMLDivElement>(null)

  const scrollRef = useRef<IScrollRef>(null)

  // 每次渲染都重新获取高度
  // eslint-disable-next-line
  useLayoutEffect(() => {

    setHeight(lyricElRef.current?.offsetHeight ?? 0)
  })

  // 每次id改变就初始化歌词索引
  useEffect(() => {
    setCurIdx(0)
  }, [id])

  // 监听audio的时长更新事件，进行歌词追踪
  useLayoutEffect(() => {
    let flag: boolean = true

    audio.addEventListener('timeupdate', timeupdate)

    function timeupdate() {
      if (flag) {
        flag = false

        const curTime: number = Math.round(audio.currentTime)
        const curPos: number = binSearch(lyricRef.current, curTime)

        if (curPos === 0) {
          // console.log(lyricRef.current[curIdx])
        } else {
          // console.log(lyricRef.current[curPos])
          if (curPos !== curIdx) {
            setCurIdx(curPos)
            let lyricPos: number = 0
            let targetPos: number = 0

            // 在 transition 为 1 秒时才执行
            if (transition) {
              for (let i = 0; i <= curPos; i++) {

                // 在歌词偏移量达到100时才开始内容的偏移
                if (targetPos < 130) {
                  targetPos += (setPRef.current!.children[i] as HTMLProgressElement).offsetHeight

                  if (targetPos > 130) {
                    lyricPos += targetPos - 130
                  }
                } else {
                  lyricPos += (setPRef.current!.children[i] as HTMLProgressElement).offsetHeight
                }

              }

              if (lyricPos) {
                const curPos: number = (lyricPos / lyricElRef.current!.offsetHeight) * 100
                setPos(curPos)
                scrollRef.current?.transform(curPos)
              } else {
                setPos(0)
                scrollRef.current?.transform(0)
              }
            }
          }
        }

        window.setTimeout(() => {
          flag = true
        }, 300)
      }

      // 二分查找目标歌词
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
  }, [curIdx, transition])

  // 监听audio的播放结束事件，进行重置操作
  useEffect(() => {
    audio.addEventListener('ended', ended)

    function ended() {
      setCurIdx(0)
      setPos(0)
      scrollRef.current?.transform(0)
    }

    return () => {
      audio.removeEventListener('ended', ended)
    }
  }, [])

  // 传给Scroll组件的两个事件
  const changePos = useCallback((pos: number) => {
    setPos(pos * 100)
  }, [])
  const flagCallback = useCallback((flag: boolean) => {
    flag ? setTransition(0) : setTransition(1)
  }, [])

  // 处理上下歌词
  const lyricEl = useMemo(() => {
    lyricRef.current = []

    const curB: Map<string, string> = new Map((b as string).split('\n').map(str => {

      let keyword: string = ''

      str = str.replace(/\[[0-9](.*)?[0-9]\]/, (word: string, exp: string) => {

        exp && (keyword = exp)

        return ''
      })

      return keyword ? [keyword, str] : ['', '']
    }))

    return <div ref={setPRef}>{
      (t as string).split('\n').map((str, index) => {

        let time: number = -1
        let keyword: string = ''

        str = str.replace(/\[[0-9](.*)?[0-9]\]/, (word: string, exp: string) => {

          time = dateFormTime(exp)
          keyword = exp

          return ''
        })

        time !== -1 && lyricRef.current.push(time)

        return time !== -1 ? curB.has(keyword) ?
          <p key={time + str} className={curIdx === index ? 'z-sel' : ''}>
            {str}
            <br />
            {curB.get(keyword)}
          </p>
          : <p key={time + str} className={curIdx === index ? 'z-sel' : ''}>{str}</p>
          : ''
      })
    }</div>
  }, [t, b, curIdx])

  return (
    <>
      <div className='listlyric'>
        <div ref={lyricElRef} style={{ transform: `translate3d(0,${-pos + '%'},0)`, transition: `transform ${transition}s` }}>
          {lyricEl}
        </div>
      </div>
      <div className='bline bline-1'>
        <Scroll ref={scrollRef} contentHeight={height} changePos={changePos} flagCallback={flagCallback} />
      </div>
    </>
  )
}

export default Lyric
