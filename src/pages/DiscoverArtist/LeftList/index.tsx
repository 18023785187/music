/**
 * 左侧每个列表
 */
import React, { useEffect, useCallback, useMemo, memo } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import { cancel } from 'network/artist/getArtistList'

interface IProps extends RouteComponentProps {
  title: string,
  list: { name: string; path: string; params: [number, number, number]; }[],
  getArtistListCallback: (limit: number, type: number, area: number, initial: string | number, title: string) => void
}

function LeftList(props: IProps) {
  const { title, list, getArtistListCallback, location } = props
  const { pathname, search } = location
  const parse = useMemo(() => qs.parse(search.substring(1)), [search])

  // 带id参数的url地址,用于匹配目标地址发请求
  const curLink = useMemo(() => list.filter(item => item.path === pathname + (parse.id ? `?id=${parse.id}` : '')), [list, pathname, parse])

  // 发挥上面语句的作用，发请求
  useEffect(() => {
    curLink[0] && getArtistListCallback(...curLink[0].params, parse.initial ? parse.initial as string : -1, curLink[0].name)

    return () => {
      cancel.cancelGetArtistList && cancel.cancelGetArtistList();
    }
  }, [curLink, getArtistListCallback, parse])

  // 点击取消上次请求并刷新页面
  const cancelClick = useCallback(() => {
    cancel.cancelGetArtistList && cancel.cancelGetArtistList();
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='blk'>
      <h2 className='tit'>{title}</h2>
      <ul>
        {
          list.map(item => <li key={item.name} onClick={cancelClick}>
            <Link className={`hover ${item.path === pathname + search ? 'active' : ''}`} to={item.path}>{item.name}</Link>
          </li>)
        }
      </ul>
    </div>
  )
}

export default memo(withRouter(LeftList))
