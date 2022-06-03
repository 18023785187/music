/**
 * 分辨率
 */
import React, { useState, useContext, useMemo, useCallback, memo } from 'react'
import Context from '../../context'
import transformCode from '../../transformCode'

function ResolutionRatio() {
  const [idx, setIdx] = useState<number>(0)
  const { setBr, brs } = useContext(Context)

  // 过滤出有序分辨率数组
  const brArrs = useMemo(() => brs?.map(br => br.br).sort((a, b) => b - a), [brs])

  // 改变分辨率
  const setBrClick = useCallback((index: number) => {
    setIdx(index);
    setBr && setBr(brArrs?.[index] ?? 1080)
  }, [setBr, brArrs])

  return (
    <div className='brs'>
      {/* 展示 */}
      <div className='current'>{transformCode(brArrs?.[idx] ?? 1080)}</div>
      {/* 分辨率可选列表 */}
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