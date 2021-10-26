/**
 * 分辨率
 */
import React, { useContext, memo } from 'react'
import Context from '../context'
import transformCode from '../transformCode'

function ResolutionRatio() {
    const { brs } = useContext(Context)

    const brArrs = brs?.map(br => br.br).sort((a, b) => b - a)

    return (
        <div className='brs'>
            <div className='current'>{transformCode(brArrs?.[0] ?? 1080)}</div>
            <ul className='options'>
                {
                    brArrs?.map(br => (
                        <li className='itm pointer' key={br}>{transformCode(br)}</li>
                    ))
                }
                <li className='arrow'></li>
            </ul>
        </div>
    )
}

export default memo(ResolutionRatio)