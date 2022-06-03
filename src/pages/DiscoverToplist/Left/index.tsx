/**
 * 排行榜左边
 */
import React, { useEffect, memo, useCallback, useMemo } from 'react'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import { ROOT_NAVPATH } from 'pages/path'
import LazyLoad from '@/utils/LazyLoad'

interface IProps extends RouteComponentProps {
  toplistData: { [propName: string]: any }[]
}

function Left(props: IProps) {
  const { toplistData, location } = props
  const { search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])

  useEffect(() => {
    LazyLoad.update()
  })

  /**
   * 按起始和结束索引依次布局
   */
  const layout = useCallback<(start: number, end: number) => JSX.Element[]>((start: number, end: number) => {
    if (toplistData.length) {
      const jsxElements: JSX.Element[] = []
      for (let i = start; i < end; i++) {
        const { id, name, coverImgUrl, updateFrequency } = toplistData[i]

        jsxElements.push(<li key={id} className={`mine pointer ${parse.id ? (Number(parse.id) === id ? 'high' : '') : (i === 0 ? 'high' : '')}`}>
          <Link to={`${ROOT_NAVPATH.TOPLIST}?id=${id}`} className='item'>
            <div className='left'>
              <img data-src={coverImgUrl + '?param=40y40'} alt={name} width={40} height={40} />
            </div>
            <div>
              <p className='name'>{name}</p>
              <p className='s-fc4'>{updateFrequency}</p>
            </div>
          </Link>
        </li>)
      }
      return jsxElements
    } else {
      return []
    }
  }, [toplistData, parse.id])

  return (
    <div className='toplist-left clearfix'>
      <div className='n-minelst-2'>
        <h2 className="f-ff1">云音乐特色榜</h2>
        <ul>
          {layout(0, 4)}
        </ul>
        <h2 className="scd f-ff1">全球媒体榜</h2>
        <ul>
          {layout(4, toplistData.length)}
        </ul>
      </div>
    </div>
  )
}

export default memo(withRouter(Left))
