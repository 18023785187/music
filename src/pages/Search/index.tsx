/**
 * 搜索页
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import qs from 'qs'
import { filter, search, cancelSearch } from 'network/search'
import Input from './Input'
import Navbar from './Navbar'
import route from './Pages/route'
import Page from 'common/Page'
import { SEATCH } from 'pages/path'
import styles from './styles/index.module.less'

interface IProps extends RouteComponentProps {

}

function Search(props: IProps) {
  const { location, history } = props
  const { search: s } = location
  const parse = useMemo(() => qs.parse(s.substring(1)), [s])
  const [data, setData] = useState<{ [propName: string]: any }>({})

  useEffect(() => {
    const { s, type, offset } = parse

    search(s as string, type as string, offset as string ?? 0).then((res: any) => {
      try {
        setData(res.result)
      } catch (e) {

      }
    })

    return () => {
      cancelSearch.cancelSearch && cancelSearch.cancelSearch()
    }
  }, [parse])

  const Count = useCallback(() => {
    const { s, type } = parse;
    let text: string = '';
    let count: number = 0;
    switch (type) {
      case '1':
        text = '首单曲'
        count = data.songCount ?? 0
        break;
      case '100':
        text = '个歌手'
        count = data.artistCount ?? 0
        break;
      case '10':
        text = '张专辑'
        count = data.albumCount ?? 0
        break;
      case '1014':
        text = '个视频'
        count = data.videoCount ?? 0
        break;
      case '1006':
        text = '个歌词'
        count = data.songCount ?? 0
        break;
      case '1000':
        text = '个歌单'
        count = data.playlistCount ?? 0
        break;
      case '1009':
        text = '个节目'
        count = data.djRadiosCount ?? 0
        break;
      case '1002':
        text = '个用户'
        count = data.userprofileCount ?? 0
        break;
      default:
        break;
    }

    return <div className='snote s-fc4'>
      搜索“{s}”，找到&nbsp; <em className='s-fc6'>{count}</em> &nbsp;{text}
    </div >
  }, [parse, data])

  const getCount = useCallback((type: string) => {
    switch (type) {
      case '1':
        return data.songCount
      case '100':
        return data.artistCount
      case '10':
        return data.albumCount
      case '1014':
        return data.videoCount
      case '1006':
        return data.songCount
      case '1000':
        return data.playlistCount
      case '1009':
        return data.djRadiosCount
      case '1002':
        return data.userprofileCount
      default:
        return 0
    }
  }, [data])

  const emitClick = useCallback((page: number | string) => {
    const { s, type } = parse
    history.push(SEATCH + `?s=${s}&type=${type}&offset=${page}`)
  }, [parse, history])

  return (
    <div className={styles['search']}>
      <div className='g-wrap g-bd'>
        {/* 头部搜索框 */}
        <Input />
        <div>
          {Count()}
          {/* 导航 */}
          <Navbar />
          {/* 展示区 */}
          <div className='n-srchrst'>
            {route(parse.type as string, data)}
          </div>
          <Page callback={emitClick} count={getCount(parse.type as string)} limit={filter(parse.type as string)} initPage={parse.offset != null ? Number(parse.offset) : 0} />
        </div>
      </div>
    </div>
  )
}

export default Search
