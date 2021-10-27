/**
 * 分辨率
 */
import React, { useState, useContext, useMemo, useCallback, memo } from 'react'
import Context from '../context'
import transformCode from '../transformCode'

function ResolutionRatio() {
    const [idx, setIdx] = useState<number>(0)
    const { setBr, brs } = useContext(Context)

    const brArrs = useMemo(() => brs?.map(br => br.br).sort((a, b) => b - a), [brs])

    const setBrClick = useCallback((index: number) => {
        setIdx(index);
        setBr && setBr(brArrs?.[index] ?? 1080)
    }, [setBr, brArrs])

    return (
        <div className='brs'>
            <div className='current'>{transformCode(brArrs?.[idx] ?? 1080)}</div>
            <ul className='options'>
                {
                    brArrs?.map((br, index) => (
                        <li className={`itm pointer ${index === idx ? 'z-sel' : ''}`} key={br} onClick={() => setBrClick(index)}>
                            <span className='label'>{transformCode(br)}</span>
                            {index === idx ? <span className='hook'></span> : ''}
                        </li>
                    ))
                }
                <li className='arrow'></li>
            </ul>
        </div>
    )
}

export default memo(ResolutionRatio)