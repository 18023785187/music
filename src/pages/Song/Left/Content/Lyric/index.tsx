/**
 * 歌词展示
 */
import React, { useState, useEffect, useCallback, memo, useMemo, Fragment } from 'react'
import { getLyric, cancelGetSong } from 'network/song'
import wLocalStorage, { PLAY_LYRIC } from 'utils/localStorage'

interface IProps {
  id: string
}

function Lyric(props: IProps) {
  const { id } = props
  // 歌词
  const [lyricData, setLyricData] = useState<{ [propName: string]: any }>({})
  // 显示阀
  const [isShow, setIsShow] = useState<boolean>(false)

  const { lrc, tlyric } = lyricData
  const { lyric: t } = lrc ?? { lyric: '' }
  const { lyric: b } = tlyric ?? { lyric: '' }

  useEffect(() => {
    const lyric = JSON.parse(wLocalStorage.getItem(PLAY_LYRIC) ?? '{}')[id]

    if (lyric) {
      setLyricData(lyric)
      // 每次更新重置阀
      setIsShow(false)
    } else {
      getLyric(id).then(res => {
        if (res) {
          setLyricData(res)
          // 每次更新重置阀
          setIsShow(false)
        }
      }).catch(rej => {

      })
    }

    return () => {
      cancelGetSong.cancelGetLyric && cancelGetSong.cancelGetLyric()
    }
  }, [id])

  const showClick = useCallback(() => {
    setIsShow(!isShow)
  }, [isShow])

  // 歌词展示核心
  const lyric = useMemo(() => {
    const mapT = new Map<string, string>()
    const mapB = new Map<string, string>()
    let res: JSX.Element[] = []

    // 过滤t和b
    t.split('\n').map((str: string) => {
      let time: string = ''

      str = str.replace(/\[(.*?)\]/, (t: string, e: string) => {
        time = e

        return ''
      })

      if (time) mapT.set(time, str)
      return ''
    })
    b.split('\n').map((str: string) => {
      let time: string = ''

      str = str.replace(/\[(.*?)\]/, (t: string, e: string) => {
        time = e

        return ''
      })

      if (time) mapB.set(time, str)
      return ''
    })

    mapT.forEach((val, key) => {
      res.push(<Fragment key={key}>
        {val}
        <br />
        {
          mapB.has(key) ? <>
            {mapB.get(key)}
            <br />
          </> : <></>
        }
      </Fragment>)
    })

    return res
  }, [t, b])

  return (
    <>
      <div className={`lyric f-brk ${isShow ? '' : 'open'}`}>
        {lyric}
      </div>
      {/* 按钮 */}
      <div className='crl'>
        <i className='s-fc7 pointer hover' onClick={showClick}>
          {isShow ? '收起' : '展开'}
          <i className={'icon1 ' + (isShow ? 'u-icn-70' : 'u-icn-69')}></i>
        </i>
      </div>
    </>
  )
}

export default memo(Lyric)
