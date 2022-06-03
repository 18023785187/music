/**
 * 播放器
 */
import React, { useState, useRef, useEffect, useCallback, MouseEvent, useMemo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SONG, MV, ARTIST } from 'pages/path'
import setState from '../setState'
import { changeAudio } from '../audio'
import { formatDate } from 'utils'

const WIDTH = 466

interface IProps {
  play: { [propName: string]: any }
}

function Play(props: IProps) {
  const { play } = props
  const { dt, name, id, mv, ar } = play
  const posElRef = useRef<HTMLDivElement>(null)
  const flagRef = useRef<boolean>(false)
  // 暴露出去的curTime
  const [curTime, setCurTime] = useState<number>(0)
  // 暴露出去的缓冲时间
  const [bufferTime, setBufferTime] = useState<number>(0)

  setState.setCurTime = setCurTime
  setState.setBufferTime = setBufferTime

  const MouseDown = () => {
    flagRef.current = true
  }

  const MouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault()

    if (flagRef.current === true) {
      const pos = (e.pageX - posElRef.current!.getClientRects()[0].left) / WIDTH

      setCurTime(() => {
        if (pos <= 0) {
          changeAudio(0)
          return 0
        }
        if (pos >= 1) {
          changeAudio(dt / 1000 ?? 0)
          return 1
        }
        changeAudio(pos * (dt / 1000 ?? 0))
        return pos
      })
    }
  }, [dt])

  useEffect(() => {
    document.addEventListener('mouseup', MouseUp)

    function MouseUp() {
      flagRef.current = false
    }

    return () => {
      document.removeEventListener('mouseup', MouseUp)
    }
  }, [])

  // 歌手列表展示
  const Ar = useMemo(() => {
    return <span className='by' title={ar ? ar.map((a: any) => a.name).join('/') : ''}>
      {
        ar && ar.map((a: any, i: number) => {
          const { id, name } = a

          return i !== ar.length - 1 ? (
            <Fragment key={id}>
              <Link className='f-thide hover' to={ARTIST + `?id=${id}`}>{name}</Link>
              /
            </Fragment>
          ) : (
            <Link key={id} className='f-thide hover' to={ARTIST + `?id=${id}`}>{name}</Link>
          )
        })
      }
    </span>
  }, [ar])

  return (
    <div className='play' onMouseMove={MouseMove}>
      <div className='words'>
        {id ? <Link className='f-thide name hover' to={SONG + `?id=${id}`}>{name}</Link> : ''}
        {mv ? <Link className='mv playbar-img' to={MV + `?id=${mv}`} title='MV'></Link> : ''}
        {Ar}
      </div>
      <div className='m-pbar'>
        <div className='barbg statbar' ref={posElRef} onMouseDown={MouseDown}>
          <div className="rdy statbar" style={{ width: bufferTime * 100 + '%' }}></div>
          <div className="cur statbar" style={{ width: curTime * 100 + '%' }}>
            <span className="iconall"><i></i></span>
          </div>
        </div>
        <span className='time'>
          <em>{formatDate(new Date(curTime * (dt ?? 0)), 'mm:ss')}</em>
          &nbsp;/&nbsp;
          {dt ? formatDate(new Date(dt), 'mm:ss') : '00:00'}
        </span>
      </div>
    </div>
  )
}

export default Play
