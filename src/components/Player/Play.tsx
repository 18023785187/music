/**
 * 播放器
 */
import React, { useState, useRef, useEffect, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { SONG, MV, USER } from 'pages/path'
import { formatDate } from 'utils'

const WIDTH = 466

interface IProps {
    play: { [propName: string]: any }
}

function Play(props: IProps) {
    const { play } = props
    const { dt, name, id, mv, ar } = play
    const { id: userId, name: userName } = (ar || [{}])[0]
    const startPosRef = useRef<number>(0)
    const endPosRef = useRef<number>(0)
    const flagRef = useRef<boolean>(false)
    const [curPos, setCurPos] = useState<number>(0)

    const MouseDown = (e: MouseEvent) => {
        flagRef.current = true
        startPosRef.current = e.pageX
    }

    useEffect(() => {
        
        console.log(play)
    },[play])

    useEffect(() => {
        document.addEventListener('mousemove', MouseMove)

        function MouseMove(e: globalThis.MouseEvent) {
            e.preventDefault()

            if (flagRef.current === true) {
                const pos = (e.pageX - startPosRef.current) / WIDTH + endPosRef.current

                setCurPos(() => {
                    if (pos <= 0) return 0
                    if (pos >= 1) return 1
                    return pos
                })
            }
        }

        return () => {
            document.removeEventListener('mousemove', MouseMove)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mouseup', MouseUp)

        function MouseUp() {
            flagRef.current = false
            startPosRef.current = 0
            endPosRef.current = curPos
        }

        return () => {
            document.removeEventListener('mouseup', MouseUp)
        }
    }, [curPos])

    return (
        <div className='play'>
            <div className='words'>
                {id ? <Link className='f-thide name hover' to={SONG + `?id=${id}`}>{name}</Link> : ''}
                {mv ? <Link className='mv playbar-img' to={MV + `?id=${mv}`} title='MV'></Link> : ''}
                {userId ? <Link className='by f-thide hover' to={USER.HOME + `?id=${userId}`} title={userName}>{userName}</Link> : ''}
            </div>
            <div className='m-pbar'>
                <div className='barbg statbar'>
                    <div className="rdy statbar"></div>
                    <div className="cur statbar" style={{ width: curPos * 100 + '%' }}>
                        <span
                            className="iconall"
                            onMouseDown={MouseDown}
                        ><i></i></span>
                    </div>
                </div>
                <span className='time'>
                    <em>{formatDate(new Date(curPos * (dt ?? 0)), 'mm:ss')}</em>
                    &nbsp;/&nbsp;
                    {dt ? formatDate(new Date(dt), 'mm:ss') : '00:00'}
                </span>
            </div>
        </div>
    )
}

export default Play
